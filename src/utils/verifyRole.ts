

export function verifyRole(roles: string[], role: string | string[]) {
  if (typeof (role) === 'string') {
    return roles.includes(role);
  }

  return role.some(rl => roles.find(rol => rol === rl))
}