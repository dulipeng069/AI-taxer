#!/bin/bash

# 全量重构与部署脚本 (Rebuild from Scratch)
# 解决页面未更新的顽固问题

SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"
LOCAL_DIR="."
REMOTE_DIR="/root/aitaxmaster"

echo "=========================================="
echo "   TaxMaster 全量重构与部署工具"
echo "=========================================="

if ! command -v expect &> /dev/null; then
    echo "错误: 未找到 'expect' 命令。"
    exit 1
fi

# 1. 本地清理与打包 (确保只打包源码)
echo ">>> [1/4] 本地清理并打包源码..."
rm -rf dist dist-server node_modules project_full.tar.gz
# 重新安装依赖以确保本地环境干净 (可选，为了速度跳过)
# npm install 

# 打包所有源码文件，排除构建产物和依赖
tar -czf project_full.tar.gz \
    --exclude=node_modules \
    --exclude=dist \
    --exclude=dist-server \
    --exclude=.git \
    --exclude=.env \
    .

# 2. 上传源码
cat > upload_full.exp <<EOF
#!/usr/bin/expect -f
set timeout -1
spawn scp -o StrictHostKeyChecking=no project_full.tar.gz root@$SERVER_IP:/root/
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect eof
EOF
chmod +x upload_full.exp

echo ">>> [2/4] 上传源码包..."
./upload_full.exp

# 3. 远程彻底重构
cat > remote_full_deploy.exp <<EOF
#!/usr/bin/expect -f
set timeout -1
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

# 停止服务
send "pm2 stop all\r"
send "pm2 delete all\r"
expect "#"

# 修复 MySQL 认证插件问题 (解决 sha256_password 报错)
send "echo '>>> 修复 MySQL 认证插件...'\r"
send "mysql -e \"ALTER USER 'taxmaster'@'localhost' IDENTIFIED WITH mysql_native_password BY 'TaxMaster2025!';\"\r"
send "mysql -e \"FLUSH PRIVILEGES;\"\r"
expect "#"

# 清空项目目录 (保留 .env)
send "echo '>>> 清空旧代码...'\r"
send "cd $REMOTE_DIR\r"
send "ls -A | grep -v .env | xargs rm -rf\r"
expect "#"

# 解压新代码
send "echo '>>> 解压新代码...'\r"
send "tar -xzf /root/project_full.tar.gz -C $REMOTE_DIR\r"
send "rm /root/project_full.tar.gz\r"
expect "#"

# 安装依赖
send "echo '>>> 安装依赖 (可能需要几分钟)...'\r"
send "npm install\r"
expect "#"

# 重新生成 Prisma Client
send "echo '>>> 生成 Prisma Client...'\r"
send "npx prisma generate\r"
expect "#"

# 构建前端 (Vite) - 这是页面更新的关键
send "echo '>>> 构建前端...'\r"
send "npm run build\r"
expect "#"

# 构建后端
send "echo '>>> 构建后端...'\r"
send "npm run build:server\r"
expect "#"

# 数据库迁移
send "echo '>>> 执行数据库迁移...'\r"
send "npx prisma migrate deploy\r"
expect "#"

# 启动服务
send "echo '>>> 启动服务...'\r"
send "pm2 start dist-server/index.cjs --name \"taxmaster-api\"\r"
send "pm2 save\r"
expect "#"

# 重启 Nginx 确保缓存清除
send "systemctl restart nginx\r"
expect "#"

send "exit\r"
expect eof
EOF
chmod +x remote_full_deploy.exp

echo ">>> [3/4] 远程执行全量重构..."
./remote_full_deploy.exp

# 4. 清理
rm project_full.tar.gz upload_full.exp remote_full_deploy.exp

echo "=========================================="
echo "   全量部署完成！"
echo "=========================================="
echo "请务必强制刷新浏览器 (Ctrl+F5) 访问: http://$SERVER_IP"
