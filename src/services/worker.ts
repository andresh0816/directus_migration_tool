import { IDirectusLoginRequest, IDirectusLoginResponse } from '@/type/authentication'
import { IPingResponse } from '@/type/ping-response'
import axios from 'axios'

export const validateServers = async (baseServerUrl: string, targetServerUrl: string): Promise<IPingResponse> => {
    try {
        const pingBaseServer = await axios.get(baseServerUrl + '/server/ping')
        const pingTargetServer = await axios.get(targetServerUrl + '/server/ping')
        
        if (pingBaseServer.status === 200 && pingTargetServer.status === 200) {
            return {
                done: true
            }
        }

        return {
            done: false,
            failedServer: pingBaseServer.status === 200 ? "Target server is not available" : "Base server is not available"
        }
    }
    catch (error: any) {
        sessionStorage.setItem('server-check-error', JSON.stringify(error))
        throw error
    }
}

export const authenticateServers = async (baseServerRequest: IDirectusLoginRequest, targetServerRequest: IDirectusLoginRequest): Promise<IDirectusLoginResponse> => {
    const baseServerResponse = await axios.post(baseServerRequest.server + '/auth/login', baseServerRequest.account)
    const targetServerResponse = await axios.post(targetServerRequest.server + '/auth/login', targetServerRequest.account)

    if (baseServerResponse.status === 200 && targetServerResponse.status === 200) {
        return {
            baseServerToken: baseServerResponse.data.data.access_token,
            targetServerToken: targetServerResponse.data.data.access_token,
        }
    }

    return {
        error: {
            message: baseServerResponse.status === 200 ? targetServerResponse.data.errors[0].message : baseServerResponse.data.errors[0].message,
            from: baseServerResponse.status === 200 ? "target" : "base"
        }
    }
}

export const getSnapshot = async (accessToken: string, baseServerUrl: string): Promise<any> => {
    const response = await axios.get(baseServerUrl + '/schema/snapshot', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (response.status === 200) {
        return response.data.data
    }

    return null
}

export const getDiff = async (accessToken: string, targetServerUrl: string, snapshot: any): Promise<any> => {
    const response = await axios.post(targetServerUrl + '/schema/diff?force=true', snapshot, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (response.status === 200) {
        return response.data.data
    }
    
    return null
}

export const applyDiff = async (accessToken: string, targetServerUrl: string, difference: any): Promise<boolean> => {
    const response = await axios.post(targetServerUrl + '/schema/apply?force=true', difference, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    if (response.status === 200) {
        return true
    }

    return false
}