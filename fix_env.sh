#!/bin/bash

# 修复环境变量与数据库连接 (Fix Env & DB)
# 解决 Prisma 报错 "the URL must start with the protocol mysql://"

SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"
REMOTE_DIR="/root/aitaxmaster"

echo "=========================================="
echo "   TaxMaster 配置修复工具"
echo "=========================================="

if ! command -v expect &> /dev/null; then
    echo "错误: 未找到 'expect' 命令。"
    exit 1
fi

cat > fix_env.exp <<EOF
#!/usr/bin/expect -f
set timeout -1
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

send "cd $REMOTE_DIR\r"
expect "#"

# 1. 强制重写 .env 文件
# Prisma 读取不到 DATABASE_URL 或者是读取到了空值/错误格式
send "echo '>>> 重新写入配置文件...'\r"
send "cat > .env <<EOT\r"
send "DATABASE_URL=\"mysql://taxmaster:TaxMaster2025!@localhost:3306/taxmaster_db\"\r"
send "PORT=3000\r"
send "JWT_SECRET=\"TaxMaster_Secret_Key_2025_Secure\"\r"
send "EOT\r"
expect "#"

# 2. 重新生成 Prisma Client (强制刷新缓存)
send "echo '>>> 重新生成数据库客户端...'\r"
send "rm -rf node_modules/.prisma\r"
send "npx prisma generate\r"
expect "#"

# 3. 运行迁移 (这次应该能读取到正确的 URL 了)
send "echo '>>> 执行数据库迁移...'\r"
send "npx prisma migrate deploy\r"
expect "#"

# 4. 确保 PM2 进程存在并更新环境变量
send "echo '>>> 重启服务...'\r"
send "pm2 delete taxmaster-api\r"
send "pm2 start dist-server/index.cjs --name \"taxmaster-api\" --update-env\r"
send "pm2 save\r"
expect "#"

send "exit\r"
expect eof
EOF

chmod +x fix_env.exp

echo ">>> 正在修复配置文件..."
./fix_env.exp

rm fix_env.exp

echo "=========================================="
echo "   配置修复完成！"
echo "=========================================="
echo "请再次访问: http://$SERVER_IP"
