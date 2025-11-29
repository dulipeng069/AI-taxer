# TaxMaster 阿里云部署指南 (Docker 版)

本指南将指导您如何在阿里云 ECS 服务器上安装 Docker 并部署 TaxMaster 系统。

## 1. 准备工作

- **购买 ECS 实例**：
    - 推荐操作系统：**Ubuntu 22.04/20.04 LTS** 或 **Alibaba Cloud Linux 3** (兼容 CentOS)。
    - 推荐配置：至少 2核 4G 内存（构建镜像时需要一定内存）。
    - **安全组配置**：确保入方向允许 **80** (HTTP) 或您自定义的端口 (如 **3000**)。

## 2. 安装 Docker 环境

### 方案 A：Ubuntu 系统 (推荐)

1.  **更新软件包索引**：
    ```bash
    sudo apt-get update
    ```

2.  **安装必要依赖**：
    ```bash
    sudo apt-get install ca-certificates curl gnupg
    ```

3.  **添加 Docker 官方 GPG 密钥**：
    ```bash
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    ```

4.  **设置仓库**：
    ```bash
    echo \
      "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

5.  **安装 Docker Engine**：
    ```bash
    sudo apt-get update
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
    ```

6.  **验证安装**：
    ```bash
    sudo docker --version
    sudo docker compose version
    ```

---

### 方案 B：Alibaba Cloud Linux 3 / CentOS 7+

1.  **安装必要的工具**：
    ```bash
    sudo yum install -y yum-utils
    ```

2.  **添加阿里云 Docker 镜像源** (国内服务器推荐，速度快)：
    ```bash
    sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    ```

3.  **安装 Docker**：
    ```bash
    sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```

4.  **启动 Docker 并设置开机自启**：
    ```bash
    sudo systemctl start docker
    sudo systemctl enable docker
    ```

5.  **验证安装**：
    ```bash
    sudo docker --version
    sudo docker compose version
    ```

---

## 3. 部署 TaxMaster 应用

### 步骤 1：上传代码

您可以通过 `git` 或 `scp` 上传代码到服务器。

**方式一：使用 Git (推荐)**
如果您的代码托管在 GitHub/GitLab：
```bash
git clone <您的仓库地址>
cd taxmaster-2025
```

**方式二：直接上传**
在本地项目目录下运行：
```bash
# 假设服务器 IP 为 1.2.3.4，用户为 root
scp -r . root@1.2.3.4:/root/taxmaster
```

### 步骤 2：配置环境变量

进入项目目录，创建 `.env` 文件：

```bash
cd /root/taxmaster # 或者是您的项目路径
cp .env.example .env # 如果没有 .env.example，直接创建
nano .env
```

在 `.env` 文件中填入以下内容（如果使用 Docker 内置数据库，可直接使用默认值）：

```env
# 数据库连接 URL
# 如果使用 Docker Compose 启动的内置 MySQL，保持如下：
DATABASE_URL="mysql://root:taxmaster_root_password@db:3306/taxmaster"

# 如果使用阿里云 RDS，请修改为：
# DATABASE_URL="mysql://用户名:密码@rm-xxx.mysql.rds.aliyuncs.com:3306/taxmaster"

# 服务端口
PORT=3000

# 前端 API 地址 (生产环境通常为空，使用相对路径)
VITE_API_BASE_URL=""
```

### 步骤 3：启动服务

使用 Docker Compose 一键启动：

```bash
# -d 表示后台运行，--build 表示重新构建镜像
sudo docker compose up -d --build
```

### 步骤 4：验证部署

1.  **查看容器状态**：
    ```bash
    sudo docker compose ps
    ```
    状态应为 `Up`。

2.  **查看日志**：
    ```bash
    sudo docker compose logs -f app
    ```
    如果看到 `Server is running on port 3000`，说明启动成功。

3.  **访问应用**：
    在浏览器输入：`http://<服务器公网IP>:3000`

    *注意：如果无法访问，请检查阿里云 ECS 控制台的**安全组**，确保已放行 3000 端口。*

## 4. 常见问题

**Q: 阿里云拉取 Docker 镜像慢怎么办？**
A: 可以配置阿里云镜像加速器。
1. 登录阿里云容器镜像服务控制台，获取加速器地址。
2. 编辑 `/etc/docker/daemon.json`：
   ```json
   {
     "registry-mirrors": ["https://<您的ID>.mirror.aliyuncs.com"]
   }
   ```
3. 重启 Docker：`sudo systemctl daemon-reload && sudo systemctl restart docker`

**Q: 数据库数据存在哪里？**
A: 默认配置下，数据存储在 Docker Volume `db_data` 中，即使删除容器，数据也会保留。
