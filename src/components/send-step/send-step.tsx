import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { FC } from "react";

const SendStepComponent: FC = () => {
    return (
        <Alert
            status='warning'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
            mt={10}
            >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                Warning
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                This process will manipulate your target Directus database and will insert data to
                migrate Data Models from your base server. If something go wrong you can check the logs of this application.
            </AlertDescription>
        </Alert>
    )
}

export default SendStepComponent