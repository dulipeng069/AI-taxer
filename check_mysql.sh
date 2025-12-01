#!/bin/bash
SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"

cat > check_mysql_v2.exp <<EOF
#!/usr/bin/expect -f
set timeout 20
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

send "echo '>>> Checking Process...'\r"
send "ps aux | grep mysqld\r"
expect "#"

send "echo '>>> Checking Port...'\r"
send "netstat -tuln | grep 3306\r"
expect "#"

send "echo '>>> Checking Socket...'\r"
send "find / -name mysqld.sock 2>/dev/null\r"
expect "#"

send "exit\r"
expect eof
EOF

chmod +x check_mysql_v2.exp
./check_mysql_v2.exp
