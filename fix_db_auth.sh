#!/bin/bash
SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"

cat > fix_mysql_v3.exp <<EOF
#!/usr/bin/expect -f
set timeout 60
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

# 1. 修改 .env 使用 127.0.0.1 强制 TCP 连接
send "echo '>>> Updating .env to 127.0.0.1...'\r"
send "sed -i 's/localhost/127.0.0.1/g' /root/aitaxmaster/.env\r"
expect "#"

# 2. 修复 MySQL 用户认证 (强制 TCP 连接 -h 127.0.0.1)
# 尝试使用 root 登录修改 taxmaster 用户
send "echo '>>> Fixing MySQL auth via TCP...'\r"
send "mysql -h 127.0.0.1 -u root -p'$PASSWORD' -e 'ALTER USER \"taxmaster\"@\"%\" IDENTIFIED WITH mysql_native_password BY \"TaxMaster2025!\"; FLUSH PRIVILEGES;'\r"
# 如果 root 密码不对，可能这里会失败，但我们先试一下
expect "#"

# 尝试 localhost host
send "mysql -h 127.0.0.1 -u root -p'$PASSWORD' -e 'ALTER USER \"taxmaster\"@\"localhost\" IDENTIFIED WITH mysql_native_password BY \"TaxMaster2025!\"; FLUSH PRIVILEGES;'\r"
expect "#"

# 3. 验证
send "mysql -h 127.0.0.1 -u root -p'$PASSWORD' -e 'SELECT user, host, plugin FROM mysql.user WHERE user=\"taxmaster\";'\r"
expect "#"

# 4. 运行迁移
send "echo '>>> Running migration...'\r"
send "cd /root/aitaxmaster\r"
send "npx prisma migrate deploy\r"
expect "#"

# 5. 重启服务
send "pm2 restart all\r"
expect "#"

send "exit\r"
expect eof
EOF

chmod +x fix_mysql_v3.exp
./fix_mysql_v3.exp
