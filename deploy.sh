#!/bin/bash
SERVER_IP="8.136.46.241"

echo "=== 步骤 1/2: 上传代码到服务器 ==="
echo "正在连接 $SERVER_IP ..."
echo "提示：如果询问 'Are you sure... fingerprint'，请在终端输入 yes 并回车。"
echo "提示：请输入您设置的服务器密码。"

# 使用 rsync 上传，排除不必要的大文件
rsync -av --progress --exclude='node_modules' --exclude='.git' --exclude='dist' . root@$SERVER_IP:/root/taxmaster

if [ $? -ne 0 ]; then
    echo "❌ 上传失败，请检查密码或网络连接。"
    exit 1
fi

echo "✅ 代码上传成功！"
echo ""
echo "=== 步骤 2/2: 远程安装环境并启动 ==="
echo "正在远程登录服务器执行部署脚本..."
echo "提示：请再次输入服务器密码。"

ssh root@$SERVER_IP "
    echo '1. 检查并安装 Docker...'
    if ! command -v docker &> /dev/null; then
        curl -fsSL https://get.docker.com | bash
    else
        echo 'Docker 已安装，跳过。'
    fi

    echo '2. 进入项目目录...'
    cd /root/taxmaster

    echo '3. 启动应用...'
    docker compose down
    docker compose up -d --build
"

if [ $? -ne 0 ]; then
    echo "❌ 部署执行出错。"
    exit 1
fi

echo ""
echo "🎉 部署全部完成！"
echo "请在浏览器访问：http://$SERVER_IP:3001"
