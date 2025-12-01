#!/bin/bash

# Docker 清理与禁用工具
# 解决 Docker 容器占用端口导致的冲突问题

SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"

echo "=========================================="
echo "   TaxMaster Docker 清理工具"
echo "=========================================="

if ! command -v expect &> /dev/null; then
    echo "错误: 未找到 'expect' 命令。"
    exit 1
fi

cat > clean_docker.exp <<EOF
#!/usr/bin/expect -f
set timeout -1
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

# 1. 停止并删除所有 Docker 容器
send "echo '>>> [1/3] 停止并清理 Docker 容器...'\r"
send "docker stop \$(docker ps -aq) 2>/dev/null\r"
send "docker rm \$(docker ps -aq) 2>/dev/null\r"
expect "#"

# 2. 确保端口释放
send "echo '>>> [2/3] 检查端口释放情况...'\r"
send "netstat -tuln | grep 3000\r"
expect "#"

# 3. 重启 PM2 服务 (确保它是唯一占用 3000 端口的)
send "echo '>>> [3/3] 重启本地 Node.js 服务...'\r"
send "pm2 restart taxmaster-api\r"
expect "#"

# 4. 检查服务状态
send "pm2 status\r"
expect "#"

send "exit\r"
expect eof
EOF

chmod +x clean_docker.exp

echo ">>> 正在清理 Docker 环境..."
./clean_docker.exp

rm clean_docker.exp

echo "=========================================="
echo "   Docker 清理完成！"
echo "=========================================="
