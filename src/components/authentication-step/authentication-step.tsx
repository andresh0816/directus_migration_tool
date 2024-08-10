import { IAuthenticationStepComponentProps } from "@/type/authentication-step-props";
import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import './authentication-step.css'
import { isValidEmail } from "@/helpers/validators";

const AuthenticationStepComponent: FC<IAuthenticationStepComponentProps> = (props: IAuthenticationStepComponentProps) => {
    
    const handleBaseAdminEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.baseAdminEmailSetter(event.target.value)
    }

    const handleBaseAdminPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.baseAdminPasswordSetter(event.target.value)
    }

    const handleTargetAdminEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.targetAdminEmailSetter(event.target.value)
    }

    const handleTargetAdminPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.targetAdminPasswordSetter(event.target.value)
    }

    const baseAdminEmailIsInvalid: boolean = props.baseAdminEmailValue === "" || !isValidEmail(props.baseAdminEmailValue)
    const targetAdminEmailIsInvalid: boolean = props.targetAdminEmailValue === "" || !isValidEmail(props.baseAdminEmailValue)
    const baseAdminPasswordIsInvalid: boolean = props.baseAdminPasswordValue === ""
    const targetAdminPasswordIsInvalid: boolean = props.targetAdminPasswordValue === ""

    const [showBasePassword, setShowBasePassword] = useState(false)
    const handleShowBase = () => setShowBasePassword(!showBasePassword)
    const [showTargetPassword, setShowTargetPassword] = useState(false)
    const handleShowTarget = () => setShowTargetPassword(!showTargetPassword)

    useEffect(() => {
        props.canNextSetter(baseAdminEmailIsInvalid || targetAdminEmailIsInvalid || baseAdminPasswordIsInvalid || targetAdminPasswordIsInvalid)
    })

    return (
        <Box maxW="sm" mx="auto" my={10}>
            <Flex gap={10} direction="column" justifyContent="space-between" alignItems="center">
                <div className="w-full">
                    <form>
                        <Flex gap={10} direction="column" justifyContent="space-between">
                            <Grid w="100%" gap={12}>
                                <GridItem w='100%' h='10'>
                                    <FormControl isInvalid={baseAdminEmailIsInvalid} className="w-full" isRequired>
                                        <FormLabel htmlFor="base-server-admin-email">Base Server Admin Email</FormLabel>
                                        <Input onChange={handleBaseAdminEmailChange} id="base-server-admin-email" type="email" value={props.baseAdminEmailValue} />
                                    </FormControl>
                                </GridItem>
                                <GridItem w="100%" h="10">
                                    <FormControl className="w-full" isRequired>
                                        <FormLabel htmlFor="base-server-admin-password">Base Server Admin Password</FormLabel>
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                type={showBasePassword ? 'text' : 'password'}
                                                id="base-server-admin-password"
                                                onChange={handleBaseAdminPasswordChange}
                                                value={props.baseAdminPasswordValue}
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleShowBase}>
                                                {showBasePassword ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </GridItem>
                                <GridItem w='100%' h='10'>
                                    <FormControl isInvalid={targetAdminEmailIsInvalid} className="w-full" isRequired>
                                        <FormLabel htmlFor="target-server-admin-email">Target Server Admin Email</FormLabel>
                                        <Input onChange={handleTargetAdminEmailChange} id="target-server-admin-email" type="email" value={props.targetAdminEmailValue} />
                                    </FormControl>
                                </GridItem>
                                <GridItem w="100%" h="10">
                                    <FormControl className="w-full" isRequired>
                                        <FormLabel htmlFor="target-server-admin-password">Target Server Admin Password</FormLabel>
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                type={showTargetPassword ? 'text' : 'password'}
                                                id="target-server-admin-password"
                                                onChange={handleTargetAdminPasswordChange}
                                                value={props.targetAdminPasswordValue}
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleShowTarget}>
                                                {showTargetPassword ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </GridItem>
                            </Grid>
                        </Flex>
                    </form>
                </div>
            </Flex>
        </Box>
    )
}

export default AuthenticationStepComponent