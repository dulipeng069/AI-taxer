output "instance_public_ip" {
  description = "ECS 实例的公网 IP"
  value       = alicloud_instance.instance.public_ip
}

output "instance_id" {
  description = "ECS 实例 ID"
  value       = alicloud_instance.instance.id
}
