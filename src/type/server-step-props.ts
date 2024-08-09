import { Dispatch, SetStateAction } from "react";

export interface IServerStepComponentProps {
    loading: boolean, 
    baseServerUrl: string, 
    setBaseServerUrl: Dispatch<SetStateAction<string>>,
    targetServerUrl: string,
    setTargetServerUrl: Dispatch<SetStateAction<string>>
    onValidateForm: (value: boolean) => void
}