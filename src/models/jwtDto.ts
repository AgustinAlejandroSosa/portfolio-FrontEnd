export class JwtDto {
  username: string
  password: string
  token: string
  authorities: string[]
  constructor(username: string, password: string, token: string, authorities: string[]) {
    this.username = username
    this.password = password
    this.token = token
    this.authorities = authorities
  }
}