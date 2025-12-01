#!/bin/bash

# 强制代码同步与重建脚本 (Force Sync & Rebuild)
# 解决代码已上传但页面未更新的问题

SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"
LOCAL_DIR="."
REMOTE_DIR="/root/aitaxmaster"

echo "=========================================="
echo "   TaxMaster 代码强制同步工具"
echo "=========================================="

if ! command -v expect &> /dev/null; then
    echo "错误: 未找到 'expect' 命令。"
    exit 1
fi

# 1. 强制打包最新代码 (再次确认包含 dist 和 src)
echo ">>> [1/3] 打包最新代码..."
# 删除旧的压缩包
rm -f project_latest.tar.gz

# 打包，确保包含最新的 frontend 构建产物和源代码
# 注意：我们排除 node_modules，但必须包含 dist (前端构建) 和 dist-server (后端构建)
# 或者，更稳妥的是上传源码在服务器上重新构建
tar -czf project_latest.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=.env \
    .

# 2. 上传覆盖
cat > upload_sync.exp <<EOF
#!/usr/bin/expect -f
set timeout -1
spawn scp -o StrictHostKeyChecking=no project_latest.tar.gz root@$SERVER_IP:/root/
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect eof
EOF
chmod +x upload_sync.exp

echo ">>> [2/3] 上传代码到服务器..."
./upload_sync.exp

# 3. 远程解压并强制重新构建
cat > remote_rebuild.exp <<EOF
#!/usr/bin/expect -f
set timeout -1
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

send "echo '>>> 停止服务...'\r"
send "pm2 stop taxmaster-api\r"
expect "#"

send "echo '>>> 清理旧代码...'\r"
# 保留 .env 文件，删除其他所有文件
send "cd $REMOTE_DIR\r"
send "find . -maxdepth 1 ! -name '.env' ! -name '.env.production' ! -name '.' ! -name '..' -exec rm -rf {} +\r"
expect "#"

send "echo '>>> 解压新代码...'\r"
send "tar -xzf /root/project_latest.tar.gz -C $REMOTE_DIR\r"
send "rm /root/project_latest.tar.gz\r"
expect "#"

send "echo '>>> 强制重新构建...'\r"
send "npm install\r"
send "npx prisma generate\r"
send "npm run build\r"
send "npm run build:server\r"
expect "#"

send "echo '>>> 更新数据库结构...'\r"
# 确保数据库结构也是最新的
send "npx prisma migrate deploy\r"
expect "#"

send "echo '>>> 重启服务...'\r"
send "pm2 restart taxmaster-api\r"
expect "#"

send "exit\r"
expect eof
EOF
chmod +x remote_rebuild.exp

echo ">>> [3/3] 在服务器上执行清理、重构和重启..."
./remote_rebuild.exp

# 清理本地临时文件
rm project_latest.tar.gz upload_sync.exp remote_rebuild.exp

echo "=========================================="
echo "   代码已强制同步并重新构建！"
echo "=========================================="
echo "请刷新浏览器 (Ctrl+F5) 查看更新。"
