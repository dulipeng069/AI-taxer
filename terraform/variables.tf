variable "region" {
  description = "阿里云区域 (Region ID)"
  type        = string
  default     = "cn-hangzhou"
}

variable "ecs_password" {
  description = "ECS 实例的 root 密码"
  type        = string
  default     = "TaxMaster2025!" # 建议用户修改
}
