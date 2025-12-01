#!/bin/bash

# 远程诊断脚本 (Remote Diagnose)
# 功能：获取服务器上的错误日志，帮助定位 502 问题

SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"

echo "=========================================="
echo "   TaxMaster 远程诊断工具"
echo "=========================================="

# 1. 检查 expect
if ! command -v expect &> /dev/null; then
    echo "错误: 未找到 'expect' 命令。"
    exit 1
fi

# 2. 创建诊断脚本
cat > diagnose_script.exp <<EOF
#!/usr/bin/expect -f
set timeout 30
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

# 1. 检查 PM2 进程状态
send "echo '--------------------------------'\r"
send "echo '[1] PM2 进程状态:'\r"
send "pm2 list\r"
expect "#"

# 2. 检查端口占用
send "echo '--------------------------------'\r"
send "echo '[2] 端口 3000 占用情况:'\r"
send "netstat -tuln | grep 3000 || echo 'Port 3000 NOT listening'\r"
expect "#"

# 3. 获取应用错误日志
send "echo '--------------------------------'\r"
send "echo '[3] 应用错误日志 (最后 50 行):'\r"
send "pm2 logs taxmaster-api --lines 50 --nostream\r"
expect "#"

# 4. 检查 Nginx 错误日志
send "echo '--------------------------------'\r"
send "echo '[4] Nginx 错误日志 (最后 20 行):'\r"
send "tail -n 20 /var/log/nginx/error.log\r"
expect "#"

send "exit\r"
expect eof
EOF

chmod +x diagnose_script.exp

echo ">>> 正在连接服务器获取日志，请稍候..."
./diagnose_script.exp

# 清理
rm diagnose_script.exp

echo "=========================================="
echo "   诊断结束"
echo "=========================================="
