#!/bin/bash

# 自动化部署脚本 (Auto Deploy)
# 功能：自动打包、上传、并在阿里云服务器上执行部署
# 解决了手动输入密码不可见的问题

SERVER_IP="8.136.46.241"
PASSWORD="TaxMaster2025!"
REMOTE_DIR="/root/aitaxmaster"

echo "=========================================="
echo "   TaxMaster 自动化部署工具"
echo "=========================================="

# 1. 检查 expect 是否安装 (MacOS 自带)
if ! command -v expect &> /dev/null; then
    echo "错误: 未找到 'expect' 命令。请确保您使用的是 MacOS 或 Linux。"
    exit 1
fi

# 2. 打包项目 (排除 node_modules 和 git，加快传输速度)
echo ">>> [1/4] 正在打包项目..."
tar -czf project.tar.gz \
    --exclude=node_modules \
    --exclude=.git \
    --exclude=dist \
    --exclude=dist-server \
    .

echo ">>> 打包完成: project.tar.gz"

# 3. 创建临时的 Expect 脚本用于上传
cat > upload_script.exp <<EOF
#!/usr/bin/expect -f
set timeout -1
spawn scp -o StrictHostKeyChecking=no project.tar.gz root@$SERVER_IP:/root/
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect eof
EOF
chmod +x upload_script.exp

echo ">>> [2/4] 正在上传文件到阿里云 (自动输入密码)..."
./upload_script.exp

# 4. 创建临时的 Expect 脚本用于远程执行
cat > run_remote.exp <<EOF
#!/usr/bin/expect -f
set timeout -1
spawn ssh -o StrictHostKeyChecking=no root@$SERVER_IP
expect {
    "password:" { send "$PASSWORD\r" }
    "yes/no" { send "yes\r"; exp_continue }
}
expect "#"
# 在服务器上执行的命令
send "mkdir -p $REMOTE_DIR\r"
send "tar -xzf /root/project.tar.gz -C $REMOTE_DIR\r"
send "rm /root/project.tar.gz\r"
send "cd $REMOTE_DIR\r"
send "chmod +x install_db_local.sh setup_aliyun.sh\r"
# 执行数据库安装 (如果已存在不会报错)
send "./install_db_local.sh\r"
# 执行主部署脚本 (自动回答 'y')
send "echo 'y' | ./setup_aliyun.sh\r"
expect "#"
send "exit\r"
expect eof
EOF
chmod +x run_remote.exp

echo ">>> [3/4] 正在服务器上解压并执行部署..."
./run_remote.exp

# 5. 清理临时文件
rm project.tar.gz upload_script.exp run_remote.exp

echo "=========================================="
echo "   部署全流程结束！"
echo "=========================================="
echo "请访问: http://$SERVER_IP"
