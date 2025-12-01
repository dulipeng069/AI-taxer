#!/bin/bash

# 彻底卸载并重装 MySQL (Nuclear Option)
# 当常规修复失败时的最终手段

SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"

echo "=========================================="
echo "   TaxMaster 深度重置工具"
echo "=========================================="

if ! command -v expect &> /dev/null; then
    echo "错误: 未找到 'expect' 命令。"
    exit 1
fi

cat > reset_mysql.exp <<EOF
#!/usr/bin/expect -f
set timeout -1
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"

# 1. 彻底清理 MySQL (连根拔起)
send "echo '>>> Step 1: 正在彻底清理旧的 MySQL...'\r"
send "systemctl stop mysql\r"
send "apt-get remove --purge -y mysql-server mysql-client mysql-common mysql-server-core-* mysql-client-core-*\r"
send "apt-get autoremove -y\r"
send "apt-get autoclean\r"
send "rm -rf /etc/mysql /var/lib/mysql /var/log/mysql\r"
expect "#"

# 2. 清理残留配置并更新系统
send "echo '>>> Step 2: 清理残留并更新系统...'\r"
send "dpkg --configure -a\r"
send "apt-get update\r"
expect "#"

# 3. 重新安装 MySQL (干净安装)
send "echo '>>> Step 3: 重新安装 MySQL (干净环境)...'\r"
send "apt-get install -y mysql-server\r"
expect "#"

# 4. 初始化 MySQL (无密码模式)
send "echo '>>> Step 4: 初始化数据库...'\r"
send "systemctl start mysql\r"
# 创建用户和数据库
send "mysql -e \"CREATE DATABASE IF NOT EXISTS taxmaster_db;\"\r"
send "mysql -e \"CREATE USER IF NOT EXISTS 'taxmaster'@'localhost' IDENTIFIED BY 'TaxMaster2025!';\"\r"
send "mysql -e \"GRANT ALL PRIVILEGES ON taxmaster_db.* TO 'taxmaster'@'localhost';\"\r"
send "mysql -e \"FLUSH PRIVILEGES;\"\r"
expect "#"

# 5. 重新运行应用部署
send "echo '>>> Step 5: 重新启动应用...'\r"
send "cd /root/aitaxmaster\r"
send "echo 'y' | ./setup_aliyun.sh\r"
expect "#"

send "exit\r"
expect eof
EOF

chmod +x reset_mysql.exp

echo ">>> 正在执行深度重置，请勿中断..."
./reset_mysql.exp

rm reset_mysql.exp

echo "=========================================="
echo "   重置完成！"
echo "=========================================="
echo "请访问: http://$SERVER_IP"
