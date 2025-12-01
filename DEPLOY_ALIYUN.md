# TaxMaster 阿里云部署指南

本指南将帮助您在阿里云 ECS 服务器上快速部署 TaxMaster 系统。

## 部署架构
- **前端**: React (Vite 构建为静态资源)
- **后端**: Node.js (Hono 框架)
- **数据库**: MySQL (推荐阿里云 RDS MySQL 版)
- **反向代理**: Nginx (可选，用于域名访问和 HTTPS)

---

## 方法一：一键脚本部署 (推荐)

适用于 Ubuntu 20.04/22.04 或 Alibaba Cloud Linux 3 / CentOS 7+。

### 步骤 1: 准备资源
1.  **购买 ECS 实例**: 
    *   建议配置: 2核 4G 内存 (最低 1核 2G)
    *   操作系统: Ubuntu 22.04 LTS (推荐) 或 Alibaba Cloud Linux 3
    *   **安全组**: 开放 TCP 端口 80 (HTTP), 443 (HTTPS), 22 (SSH)
2.  **准备数据库**:
    *   购买 **RDS MySQL** 实例 (推荐 MySQL 8.0)
    *   或者在 ECS 上自行安装 MySQL
    *   创建一个数据库，例如 `taxmaster_db`
    *   获取连接字符串: `mysql://用户名:密码@主机地址:3306/数据库名`

### 步骤 2: 上传代码
使用 Git 或 SFTP 将代码上传到服务器。
```bash
# 示例: 使用 git clone
git clone <你的仓库地址>
cd aitaxmaster
```

### 步骤 3: 配置环境变量
复制示例配置并编辑：
```bash
cp .env .env.production
nano .env.production
```
**必须修改**以下内容：
```env
DATABASE_URL="mysql://admin:YourPassword@rm-xxx.mysql.rds.aliyuncs.com:3306/taxmaster_db"
PORT=3000
JWT_SECRET="设置一个复杂的随机字符串"
```

### 步骤 4: 运行部署脚本
赋予脚本执行权限并运行：
```bash
chmod +x setup_aliyun.sh
./setup_aliyun.sh
```
脚本将自动执行以下操作：
- 安装 Node.js v20, PM2, Nginx
- 安装项目依赖
- 构建前端和后端
- (可选) 自动配置 Nginx 反向代理
- (可选) 执行数据库迁移
- 使用 PM2 启动服务

### 步骤 5: 访问验证
- 直接访问服务器 IP (如果安装了 Nginx): `http://<服务器公网IP>`
- 查看服务状态: `pm2 status`
- 查看日志: `pm2 logs`

---

## 方法二：Docker 容器部署

如果您熟悉 Docker，这是最干净的部署方式。

### 步骤 1: 安装 Docker
在服务器上安装 Docker 和 Docker Compose。

### 步骤 2: 配置环境
创建 `.env` 文件并填入数据库连接信息 (同上)。

### 步骤 3: 构建并运行
```bash
# 构建镜像
docker build -t taxmaster:latest .

# 运行容器
docker run -d \
  --name taxmaster \
  -p 80:3000 \
  --env-file .env \
  taxmaster:latest
```

---

## 常见问题排查

### 1. 数据库连接失败
- 检查 ECS 安全组是否允许出方向访问 RDS。
- 检查 RDS 白名单是否包含 ECS 的内网 IP。
- 确认 `DATABASE_URL` 格式正确。

### 2. 502 Bad Gateway (Nginx)
- 确认后端服务是否运行: `pm2 status`
- 检查端口监听: `netstat -tuln | grep 3000`
- 检查 Nginx 错误日志: `cat /var/log/nginx/error.log`

### 3. 页面显示 404
- 我们的应用是单页应用 (SPA)，Nginx 配置需要确保所有路由都指向 `index.html` (脚本已自动处理)。
- 确保 `npm run build` 成功生成了 `dist` 目录。

---

## 维护命令

- **更新代码**:
  ```bash
  git pull
  npm install
  npm run build
  npm run build:server
  pm2 restart taxmaster-api
  ```

- **查看日志**:
  ```bash
  pm2 logs
  ```
