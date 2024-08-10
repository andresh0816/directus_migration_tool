import { Dispatch, SetStateAction } from "react"

export interface IAuthenticationStepComponentProps {
    baseServerUrl: string
    targetServerUrl: string
    baseAdminEmailSetter: Dispatch<SetStateAction<string>>
    baseAdminPasswordSetter: Dispatch<SetStateAction<string>>
    targetAdminEmailSetter: Dispatch<SetStateAction<string>>
    targetAdminPasswordSetter: Dispatch<SetStateAction<string>>
    baseAdminEmailValue: string
    baseAdminPasswordValue: string
    targetAdminEmailValue: string
    targetAdminPasswordValue: string
    canNextSetter: (canNext: boolean) => void
}