#!/bin/bash

# TaxMaster 本地 MySQL 安装脚本 (适用于 Ubuntu/Debian)
# 如果您没有购买阿里云 RDS，可以使用此脚本在 ECS 上直接安装 MySQL

set -e

echo ">>> 开始安装 MySQL Server..."
sudo apt-get update
sudo apt-get install -y mysql-server

# 启动 MySQL
sudo systemctl start mysql
sudo systemctl enable mysql

# 使用用户提供的密码
DB_PASSWORD="TaxMaster2025!"
DB_NAME="taxmaster_db"
DB_USER="taxmaster"

echo ">>> 配置数据库..."

# 创建数据库和用户
sudo mysql -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME};"
sudo mysql -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASSWORD}';"
sudo mysql -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

echo "========================================================"
echo "   MySQL 安装与配置完成！"
echo "========================================================"
echo ""
echo "您的数据库连接字符串 (DATABASE_URL) 如下："
echo ""
echo "mysql://${DB_USER}:${DB_PASSWORD}@localhost:3306/${DB_NAME}"
echo ""
echo "⚠️  请复制上面的连接字符串，并在配置 .env 文件时使用它。"
echo "========================================================"
