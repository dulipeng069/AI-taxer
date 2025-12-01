#!/bin/bash

# 修复与重新部署脚本 (Repair & Redeploy)
# 功能：修复 MySQL 安装失败的问题，并重新部署应用

SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"

echo "=========================================="
echo "   TaxMaster 服务器修复工具"
echo "=========================================="

# 1. 检查 expect
if ! command -v expect &> /dev/null; then
    echo "错误: 未找到 'expect' 命令。"
    exit 1
fi

# 2. 创建修复脚本
cat > repair_script.exp <<EOF
#!/usr/bin/expect -f
set timeout -1
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

# 1. 修复 dpkg 中断问题 (关键步骤)
send "echo '>>> 正在修复系统包管理器...'\r"
send "dpkg --configure -a\r"
expect "#"

send "apt-get update\r"
expect "#"

send "apt-get install -f -y\r"
expect "#"

# 2. 确保 MySQL 已安装并启动
send "echo '>>> 重新配置 MySQL...'\r"
send "apt-get install -y mysql-server\r"
expect "#"

send "systemctl start mysql\r"
expect "#"
send "systemctl enable mysql\r"
expect "#"

# 3. 重新执行我们的部署脚本
send "echo '>>> 重新执行应用部署...'\r"
send "cd /root/aitaxmaster\r"
expect "#"

# 重新运行数据库配置 (确保密码正确)
send "./install_db_local.sh\r"
expect "#"

# 重新运行主部署
send "echo 'y' | ./setup_aliyun.sh\r"
expect "#"

send "exit\r"
expect eof
EOF

chmod +x repair_script.exp

echo ">>> 正在连接服务器进行修复，这可能需要几分钟..."
./repair_script.exp

# 清理
rm repair_script.exp

echo "=========================================="
echo "   修复与部署完成！"
echo "=========================================="
echo "请再次尝试访问: http://$SERVER_IP"
