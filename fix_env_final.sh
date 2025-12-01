#!/bin/bash
SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"

cat > fix_env_final.exp <<EOF
#!/usr/bin/expect -f
set timeout 60
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

# 1. 修改 .env 使用 Docker MySQL 的正确凭据
send "echo '>>> Updating .env with Docker credentials...'\r"
# DATABASE_URL="mysql://root:taxmaster_root_password@127.0.0.1:3306/taxmaster"
send "cat > /root/aitaxmaster/.env <<EOT\r"
send "DATABASE_URL=\"mysql://root:taxmaster_root_password@127.0.0.1:3306/taxmaster\"\r"
send "JWT_SECRET=\"super_secret_jwt_key\"\r"
send "PORT=3000\r"
send "EOT\r"
expect "#"

# 2. 运行迁移
send "echo '>>> Running migration...'\r"
send "cd /root/aitaxmaster\r"
send "npx prisma migrate deploy\r"
expect "#"

# 3. 重启 PM2
send "echo '>>> Restarting PM2...'\r"
send "pm2 restart all\r"
expect "#"

# 4. 重启 Nginx
send "systemctl restart nginx\r"
expect "#"

send "exit\r"
expect eof
EOF

chmod +x fix_env_final.exp
./fix_env_final.exp
