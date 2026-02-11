export interface AuthLoginQuery {
  email: string
  password: string
}

export interface AuthRefreshQuery {
  refresh_token: string
}

export interface AuthResponse {
  type: string
  access_token: string
  refresh_token: string
  expires_in: number
}
