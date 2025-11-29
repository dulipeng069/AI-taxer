# 使用阿里云 Terraform 部署 TaxMaster

您可以使用阿里云的 Terraform 功能（通过 Cloud Shell 或本地安装）来自动化部署 TaxMaster 的基础设施。

## 什么是 Terraform？

Terraform 是一种基础设施即代码（IaC）工具，允许您使用代码定义和预配云资源（如 ECS 实例、VPC 网络等）。

## 准备工作

在 `terraform/` 目录下，我们已经为您准备了以下文件：
- `main.tf`: 定义了 VPC、交换机、安全组和 ECS 实例。
- `variables.tf`: 定义了可配置的变量（如区域、密码）。
- `outputs.tf`: 定义了输出信息（如公网 IP）。

## 方法一：使用阿里云 Cloud Shell（推荐，无需安装）

阿里云 Cloud Shell 是一个免费的浏览器端命令行工具，预装了 Terraform。

1. **登录阿里云控制台**
   进入 [阿里云控制台](https://home.console.aliyun.com/)。

2. **打开 Cloud Shell**
   点击右上角的终端图标（>_）打开 Cloud Shell。

3. **上传 Terraform 文件**
   在 Cloud Shell 窗口中，点击工具栏的“上传文件”图标，将项目中的 `terraform` 文件夹内的 `main.tf`, `variables.tf`, `outputs.tf` 上传到一个新目录（例如 `taxmaster-tf`）。
   
   ```bash
   mkdir taxmaster-tf
   cd taxmaster-tf
   # (在此处上传文件)
   ```

4. **初始化 Terraform**
   运行以下命令初始化 Terraform：
   ```bash
   terraform init
   ```

5. **预览计划**
   查看即将创建的资源：
   ```bash
   terraform plan
   ```
   *注意：如果提示缺少凭证，Cloud Shell 通常会自动使用您当前登录账号的凭证。如果需要，您可以配置 `ALICLOUD_ACCESS_KEY` 和 `ALICLOUD_SECRET_KEY` 环境变量。*

6. **应用部署**
   开始创建资源：
   ```bash
   terraform apply
   ```
   输入 `yes` 确认。

7. **获取结果**
   部署完成后，终端会显示 ECS 的公网 IP：
   ```
   instance_public_ip = "x.x.x.x"
   ```

## 方法二：本地运行 Terraform

如果您已经在本地安装了 Terraform：

1. **配置凭证**
   设置环境变量：
   ```bash
   export ALICLOUD_ACCESS_KEY="您的AccessKey"
   export ALICLOUD_SECRET_KEY="您的SecretKey"
   export ALICLOUD_REGION="cn-hangzhou"
   ```

2. **运行命令**
   进入 `terraform` 目录并运行：
   ```bash
   cd terraform
   terraform init
   terraform apply
   ```

## 部署后的步骤

资源创建完成后，Terraform 会自动在 ECS 实例上安装 Docker。接下来您需要：

1. **连接到服务器**
   使用 SSH 连接（密码默认为 `TaxMaster2025!`，请在 `variables.tf` 中修改）：
   ```bash
   ssh root@<公网IP>
   ```

2. **部署应用**
   参考 `DEPLOY_ALIYUN.md` 中的步骤，将代码上传到服务器并启动：
   ```bash
   # 在本地项目根目录
   scp -r . root@<公网IP>:/root/taxmaster
   
   # 在服务器上
   cd /root/taxmaster
   docker compose up -d --build
   ```

## 清理资源

如果您不再需要这些资源，可以运行以下命令销毁它们（请谨慎操作，数据将丢失）：
```bash
terraform destroy
```
