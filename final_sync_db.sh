#!/bin/bash
SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"

cat > final_sync_db.exp <<EOF
#!/usr/bin/expect -f
set timeout 60
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

# 1. 同步数据库结构 (使用 db push 而不是 migrate deploy)
send "echo '>>> Pushing database schema...'\r"
send "cd /root/aitaxmaster\r"
# --accept-data-loss 允许在 schema 变更导致数据丢失时继续 (因为我们重构了)
send "npx prisma db push --accept-data-loss\r"
expect "#"

# 2. 重启 PM2
send "echo '>>> Restarting PM2...'\r"
send "pm2 restart all\r"
expect "#"

# 3. 验证 PM2 状态
send "sleep 5\r"
send "pm2 list\r"
expect "#"

send "echo '>>> Deployment Complete! Check http://$SERVER_IP'\r"

send "exit\r"
expect eof
EOF

chmod +x final_sync_db.exp
./final_sync_db.exp
