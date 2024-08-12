import { applyDiff, authenticateServers, getDiff, getSnapshot } from "@/services/worker";
import { IDirectusLoginRequest } from "@/type/authentication";
import { IWorkerComponentProps } from "@/type/worker-component-props";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Flex, Heading, Spinner, Text, useToast } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";

const WorkerComponent: FC<IWorkerComponentProps> = (props: IWorkerComponentProps) => {
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState("Initializating migration")
    const [success, setSuccess] = useState(false)
    const [baseServerAccessToken, setBaseServerAccessToken] = useState("")
    const [targetServerAccessToken, setTargetServerAccessToken] = useState("")
    const toast = useToast()
    const linkRef = useRef<HTMLAnchorElement>(null);

    const downloadLogs = () => {
        const data = sessionStorage.getItem("process-errors")
        if (data) {
            const blob = new Blob([data], { type: "text/plain"})
            const url = window.URL.createObjectURL(blob)
            if (linkRef.current) {
                linkRef.current.href = url;
                linkRef.current.download = 'logs.txt';
                linkRef.current.click();
                window.URL.revokeObjectURL(url);
              }
        }
    }

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
            if (loginResponse.baseServerToken && loginResponse.targetServerToken && loginResponse.baseServerToken !== "" && loginResponse.targetServerToken !== "") {
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
            toast({
                status: "success",
                title: "Process finished successfully"
            })

        }).catch((error: any) => {
            toast({
                status: "error",
                title: "Process failed"
            })
            sessionStorage.setItem("process-errors", JSON.stringify(error))
            setLoading(false)
            throw error
        })
    }

    useEffect(() => {
        work(props)
    }, [])

    useEffect(() => {
        props.handleCanNextChange(success)
    }, [success])

    return (
        loading ?
        <Box sx={{ bg: "teal.100", my: 8, p: 8, rounded: "md" }}>
            <Center>
                <Flex gap={4} direction="column" alignItems="center" justifyContent="center">
                    <Spinner thickness="4px" color="teal.400" size="xl"></Spinner>
                    <Text fontSize='lg'>{status}</Text>
                </Flex>
            </Center>
        </Box> :
        <Alert
        status={success ? "success" : "error"}
        variant='subtle'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='250px'
        mt={10}
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                {success ? "Migration Completed" : "Migration Failed"}
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                {success ? (
                    "The migration process has finished successfully. 🎉"
                ) : (
                    <>
                        <Flex gap={4} direction="column" alignItems="center" justifyContent="center">
                            "The migration process has failed. Download the logs to see what happened."
                            <Flex gap={4} direction="row" alignItems="center">
                                <Button onClick={downloadLogs} size="md" colorScheme="teal">
                                    Download logs
                                </Button>
                                <Button onClick={props.prevHandler} size="md" colorScheme="gray">
                                    Check configuration
                                </Button>
                            </Flex>
                            <a ref={linkRef} style={{ display: 'none' }}>Download</a>
                        </Flex>
                    </>
                )}
            </AlertDescription>
        </Alert>
    )
}

export default WorkerComponent