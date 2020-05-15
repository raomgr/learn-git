import { JSEncrypt } from 'jsencrypt'

export function rsaEncryptWithString (acceptString) {
  // 从后台获取公钥，这里省略，直接赋值
  let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDkhumXWdSgmnlVTVOnzN5IVFlyFL4bEU0SLx9X5Srva0neo7FVom9Q6IqMKVeZQOfI4SVir+kI4erpgTTyr6BgPBJ7seJ4cnkij9jtJpCnRwHg1iD2ZCn5Btr0gtiPZP3klO0xG6xSRSi/hwnjUInIqadl9PLv6QmyiVCoDVbFBwIDAQAB'
  let encryptor = new JSEncrypt() // 新建JSEncrypt对象
  encryptor.setPublicKey(publicKey) // 设置公钥
  // let rsaString = encryptor.encrypt(acceptString) // 对小于118位的密码进行加密

  // 分段加密方法
  // 修改node_module中node_modules\jsencrypt\bin以及node_modules\jsencrypt\_site\bin添加一个encryptLong方法
  let rsaString = encryptor.encryptLong(acceptString) // 对大于118位的密码进行加密
  return rsaString
}
