export interface IWorkerComponentProps {
    baseServerUrl: string
    targetServerUrl: string
    baseAdminEmailValue: string
    baseAdminPasswordValue: string
    targetAdminEmailValue: string
    targetAdminPasswordValue: string
    handleCanNextChange: (value: boolean) => void
}