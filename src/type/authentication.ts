export interface IDirectusAccount {
    email: string
    password: string
}

export interface IDirectusLoginRequest {
    server: string
    account: IDirectusAccount
}

export interface IDirectusLoginResponse {
    baseServerToken?: string
    targetServerToken?: string
    error?: any
}