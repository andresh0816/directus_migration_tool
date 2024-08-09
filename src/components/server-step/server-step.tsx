import { IServerStepComponentProps } from "@/type/server-step-props"
import { CheckIcon } from "@chakra-ui/icons"
import { Alert, Box, Button, Center, Flex, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react"
import { ChangeEvent, FC, useEffect, useState } from "react"
import './server-step.css'
import { validateServers } from "@/services/worker"
import { isValidUrl } from "@/helpers/validators"

const ServerStepComponent: FC<IServerStepComponentProps> = (props: IServerStepComponentProps) => {
    var invalidBaseServerUrl: boolean = true
    var invalidTargetServerUrl: boolean = true
    const [formIsValid, setFormIsValid] = useState(false)

    const handleBaseServerUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setBaseServerUrl(e.target.value)
    }
    const handleTargetServerUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTargetServerUrl(e.target.value)
    }

    invalidBaseServerUrl = props.baseServerUrl === "" || props.baseServerUrl.endsWith("/") || !isValidUrl(props.baseServerUrl)
    invalidTargetServerUrl = props.targetServerUrl === "" || props.targetServerUrl.endsWith("/") || !isValidUrl(props.targetServerUrl)

    const toast = useToast()

    props.onValidateForm(invalidBaseServerUrl || invalidTargetServerUrl || !formIsValid)

    const checkServers = () => {
        toast.promise(validateServers(props.baseServerUrl, props.targetServerUrl), {
            success: () => ({ title: 'Servers connected', duration: 2000, onCloseComplete: () => { setFormIsValid(true)} }),
            loading: { title: 'Checking servers...' },
            error: (error) => ({ title: 'Error trying to connect servers', duration: 2000, description: error.message, onCloseComplete: () => {
                setFormIsValid(false)
            }})
        })
    }

    return (
        <Box maxW="sm" mx="auto" mt={10}>
            <Flex gap={10} direction="column" justifyContent="space-between" alignItems="center">
                <div className="form">
                    <form>
                        <Flex gap={10} direction="column" justifyContent="space-between">
                            <div>
                                <FormControl isInvalid={invalidBaseServerUrl} isRequired>
                                    <FormLabel htmlFor="baseServerUrl">Base Server URL</FormLabel>
                                    <Input onChange={handleBaseServerUrlChange} id="baseServerUrl" type="text" value={props.baseServerUrl} />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl isInvalid={invalidTargetServerUrl} isRequired>
                                    <FormLabel htmlFor="targetServerUrl">Target Server URL</FormLabel>
                                    <Input onChange={handleTargetServerUrlChange} id="targetServerUrl" type="text" value={props.targetServerUrl} />
                                </FormControl>
                            </div>
                        </Flex>
                    </form>
                </div>
                <div>
                    <Center>
                        <Flex gap={2} direction="column">
                            <Button 
                                isDisabled={invalidBaseServerUrl || invalidTargetServerUrl} 
                                onClick={checkServers}
                                colorScheme="teal" 
                                size="md" 
                                rightIcon={<CheckIcon />}>
                                    Check servers
                            </Button>
                        </Flex>
                    </Center>
                </div>
            </Flex>
        </Box>
    )
}

export default ServerStepComponent