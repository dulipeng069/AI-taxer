#!/bin/bash
SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"

cat > check_docker.exp <<EOF
#!/usr/bin/expect -f
set timeout 20
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

send "echo '>>> Docker Containers...'\r"
send "docker ps\r"
expect "#"

send "exit\r"
expect eof
EOF

chmod +x check_docker.exp
./check_docker.exp
