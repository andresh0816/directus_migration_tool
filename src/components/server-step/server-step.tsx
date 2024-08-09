import { IServerStepComponentProps } from "@/type/server-step-props"
import { CheckIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Flex, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react"
import { ChangeEvent, FC } from "react"
import './server-step.css'
import { validateServers } from "@/services/worker"

const ServerStepComponent: FC<IServerStepComponentProps> = (props: IServerStepComponentProps) => {
    const handleBaseServerUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setBaseServerUrl(e.target.value)
    }
    const handleTargetServerUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTargetServerUrl(e.target.value)
    }
    var baseServerError = props.baseServerUrl === "" || props.baseServerUrl.endsWith("/")
    var targetServerError = props.targetServerUrl === "" || props.targetServerUrl.endsWith("/")
    const toast = useToast()

    const checkServers = () => {
        toast.promise(validateServers(props.baseServerUrl, props.targetServerUrl), {
            success: () => ({ title: 'Servers connected'}),
            loading: { title: 'Checking servers' },
            error: (error) => ({ title: 'Error trying to connect servers', description: error.message })
        })
    }

    return (
        <Box maxW="sm" mx="auto" mt={10}>
            <Flex gap={10} direction="column" justifyContent="space-between" alignItems="center">
                <div className="form">
                    <form>
                        <Flex gap={10} direction="column" justifyContent="space-between">
                            <div>
                                <FormControl isInvalid={baseServerError} isRequired>
                                    <FormLabel htmlFor="baseServerUrl">Base Server URL</FormLabel>
                                    <Input onChange={handleBaseServerUrlChange} id="baseServerUrl" type="text" value={props.baseServerUrl} />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl isInvalid={targetServerError} isRequired>
                                    <FormLabel htmlFor="targetServerUrl">Target Server URL</FormLabel>
                                    <Input onChange={handleTargetServerUrlChange} id="targetServerUrl" type="text" value={props.targetServerUrl} />
                                </FormControl>
                            </div>
                        </Flex>
                    </form>
                </div>
                <div>
                    <Center>
                        <Button 
                            isDisabled={baseServerError || targetServerError} 
                            onClick={checkServers}
                            colorScheme="teal" 
                            size="md" 
                            rightIcon={<CheckIcon />}>
                                Check servers
                        </Button>
                    </Center>
                </div>
            </Flex>
        </Box>
    )
}

export default ServerStepComponent