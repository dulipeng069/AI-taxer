#!/bin/bash
SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"

cat > find_compose.exp <<EOF
#!/usr/bin/expect -f
set timeout 20
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

send "echo '>>> Finding docker-compose.yml...'\r"
send "find /root -name docker-compose.yml\r"
expect "#"

send "echo '>>> Checking content if found...'\r"
# 假设找到了，尝试读取
send "cat /root/docker-compose.yml 2>/dev/null\r"
send "cat /root/aitaxmaster/docker-compose.yml 2>/dev/null\r"
expect "#"

send "exit\r"
expect eof
EOF

chmod +x find_compose.exp
./find_compose.exp
