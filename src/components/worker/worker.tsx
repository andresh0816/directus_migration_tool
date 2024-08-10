import { applyDiff, authenticateServers, getDiff, getSnapshot } from "@/services/worker";
import { IDirectusLoginRequest } from "@/type/authentication";
import { IWorkerComponentProps } from "@/type/worker-component-props";
import { Box, Center, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

const WorkerComponent: FC<IWorkerComponentProps> = (props: IWorkerComponentProps) => {
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState("Initializating migration")
    const [failed, setFailed] = useState(false)
    const [success, setSuccess] = useState(false)
    const [baseServerAccessToken, setBaseServerAccessToken] = useState("")
    const [targetServerAccessToken, setTargetServerAccessToken] = useState("")

    const work = (data: IWorkerComponentProps) => {
        const baseLoginRequest: IDirectusLoginRequest = {
            server: data.baseServerUrl,
            account: {
                email: data.baseAdminEmailValue,
                password: data.baseAdminPasswordValue
            }
        }

        const targetLoginRequest: IDirectusLoginRequest = {
            server: data.targetServerUrl,
            account: {
                email: data.targetAdminEmailValue,
                password: data.targetAdminPasswordValue
            }
        }

        setStatus("Authenticating servers")
        authenticateServers(baseLoginRequest, targetLoginRequest).then((loginResponse) => {
            if (loginResponse.baseServerToken && loginResponse.targetServerToken) {
                setBaseServerAccessToken(loginResponse.baseServerToken)
                setTargetServerAccessToken(loginResponse.targetServerToken)
                setStatus("Getting base server current schema and snapshot")
                return getSnapshot(loginResponse.baseServerToken, data.baseServerUrl)
            }
            
            throw new Error(`Error when tried to authenticate servers: ${loginResponse}`)

        }).then((response) => {
            if (response === null) {
                throw new Error(`Error when tried to get Snapshot`)
            }

            setStatus("Getting differences to apply")
            return getDiff(targetServerAccessToken, data.targetServerUrl, response)

        }).then((response) => {
            if (response === null) {
                throw new Error(`Error when tried to get difference`)
            }

            setStatus("Applying schema and differences")
            return applyDiff(targetServerAccessToken, data.targetServerUrl, response)
        }).then(() => {
            setStatus("Updating database")
            setLoading(false)
            setSuccess(true)
            setStatus("")

        }).catch((error: any) => {
            setFailed(true)
            throw error
        })
    }

    useEffect(() => {
        props.handleCanNextChange(success)
    }, [success])

    return (
        <Box sx={{ bg: "teal.100", my: 8, p: 8, rounded: "md" }}>
            <Center>
                <Flex gap={4} direction="column" alignItems="center" justifyContent="center">
                    <Spinner thickness="4px" color="teal.400" size="xl"></Spinner>
                    <Text fontSize='lg'>{status}</Text>
                </Flex>
            </Center>
        </Box>
    )
}

export default WorkerComponent