export function getCurrentAuthority() {
  return ["user"];
}

//校验用户权限
export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item=> authority.includes(item))
}

//如果current存在且不为guest，则成功登录
export function isLogin() {
  const current = getCurrentAuthority()
  return current && current[0] !== "guest";
}