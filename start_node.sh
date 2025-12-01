#!/bin/bash

# TaxMaster Node.js 启动脚本
# 适用于阿里云 ECS 或本地 Node.js 环境

echo ">>> 正在检查环境..."
if ! command -v node &> /dev/null; then
    echo "错误: 未找到 Node.js，请先安装 Node.js v20+"
    exit 1
fi

echo ">>> 安装依赖..."
npm install

echo ">>> 生成 Prisma Client..."
npx prisma generate

echo ">>> 构建前端资源..."
npm run build

echo ">>> 构建后端服务..."
npm run build:server

echo ">>> 运行数据库迁移 (MySQL)..."
# 注意：这里假设 .env 中配置了正确的 DATABASE_URL
npx prisma migrate deploy

echo ">>> 启动服务..."
# 检查是否安装了 PM2
if command -v pm2 &> /dev/null; then
    echo "检测到 PM2，使用 PM2 启动/重载..."
    pm2 reload taxmaster-api || pm2 start dist-server/index.cjs --name "taxmaster-api"
else
    echo "未检测到 PM2，使用 node 直接启动..."
    npm run start
fi
