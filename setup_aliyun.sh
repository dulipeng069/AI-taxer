#!/bin/bash

# TaxMaster Aliyun Deployment Script
# 适用于 Ubuntu 20.04/22.04 或 Alibaba Cloud Linux 3/CentOS 7+

set -e

echo "=========================================="
echo "   TaxMaster 阿里云一键部署助手"
echo "=========================================="

# 1. 检测系统
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID
else
    echo "不支持的操作系统"
    exit 1
fi

echo "检测到系统: $OS $VER"

# 2. 检查并安装 Node.js (v20)
echo ">>> 检查 Node.js 环境..."
if ! command -v node &> /dev/null; then
    echo "正在安装 Node.js v20..."
    if [[ "$OS" == *"Ubuntu"* ]]; then
        curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Alibaba"* ]]; then
        curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
        sudo yum install -y nodejs
    else
        echo "请手动安装 Node.js v20+"
        exit 1
    fi
else
    echo "Node.js 已安装: $(node -v)"
fi

# 3. 安装 PM2
echo ">>> 检查 PM2..."
if ! command -v pm2 &> /dev/null; then
    echo "正在安装 PM2..."
    sudo npm install -g pm2
else
    echo "PM2 已安装"
fi

# 4. 安装 Nginx (可选)
read -p "是否安装并配置 Nginx 反向代理? (y/n) " INSTALL_NGINX
if [[ "$INSTALL_NGINX" == "y" ]]; then
    if ! command -v nginx &> /dev/null; then
        echo "正在安装 Nginx..."
        if [[ "$OS" == *"Ubuntu"* ]]; then
            sudo apt-get install -y nginx
        elif [[ "$OS" == *"CentOS"* ]] || [[ "$OS" == *"Alibaba"* ]]; then
            sudo yum install -y nginx
        fi
    fi
    
    # 配置 Nginx
    echo "配置 Nginx..."
    CAT_CMD="cat"
    sudo bash -c "cat > /etc/nginx/conf.d/taxmaster.conf" <<EOF
server {
    listen 80;
    server_name _;  # 如果有域名，请修改此处，例如: tax.example.com

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
    
    # 重启 Nginx
    echo "重启 Nginx..."
    sudo nginx -t && sudo systemctl restart nginx
    echo "Nginx 配置完成，监听端口 80"
fi

# 5. 项目配置与构建
echo ">>> 开始构建项目..."

# 检查 .env 文件
if [ ! -f .env ]; then
    if [ -f .env.production ]; then
        cp .env.production .env
        echo "已使用 .env.production 作为配置文件"
    else
        echo "警告: 未找到 .env 文件。请稍后手动创建并配置 DATABASE_URL"
        cp .env.example .env 2>/dev/null || touch .env
    fi
fi

# 安装依赖
echo "安装项目依赖..."
npm install

# 生成 Prisma Client
echo "生成数据库客户端..."
npx prisma generate

# 构建前端和后端
echo "构建前端..."
npm run build
echo "构建后端..."
npm run build:server

# 6. 数据库迁移
echo ">>> 数据库设置..."
read -p "是否立即运行数据库迁移 (需要配置好 DATABASE_URL)? (y/n) " RUN_MIGRATE
if [[ "$RUN_MIGRATE" == "y" ]]; then
    npx prisma migrate deploy
fi

# 7. 启动服务
echo ">>> 启动服务..."
pm2 stop taxmaster-api 2>/dev/null || true
pm2 start dist-server/index.cjs --name "taxmaster-api"
pm2 save

echo "=========================================="
echo "   部署完成!"
echo "=========================================="
echo "服务运行在: http://localhost:3000"
if [[ "$INSTALL_NGINX" == "y" ]]; then
    echo "Nginx 代理已配置: http://<服务器IP>"
fi
echo "使用 'pm2 logs' 查看日志"
echo "使用 'pm2 monit' 监控状态"
