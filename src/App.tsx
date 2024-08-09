import { ArrowBackIcon, ArrowForwardIcon, CheckIcon, RepeatIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Heading, HStack, useColorModeValue } from '@chakra-ui/react'
import './App.css'
import { Steps, useSteps, Step } from 'chakra-ui-steps';
import { createElement, useState } from 'react';
import ServerStepComponent from './components/server-step/server-step';

function App() {
  const [steps, setSteps] = useState([
    { label: "Servers config", loading: false, component: ServerStepComponent },
    { label: "Authentication config", loading: false, component: null },
    { label: "Finish", loading: false, component: null }
  ]);
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [baseServerUrl, setBaseServerUrl] = useState("")
  const [targetServerUrl, setTargetServerUrl] = useState("")

  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;
  const bg = useColorModeValue("white", "white");

  return (
    <Flex direction={'column'} justifyContent={'space-between'} alignItems={'center'}>
      <Flex direction={'column'} alignItems={'center'} justifyContent={'center'}>
        <HStack>
          <Center h={'100px'} w={'100px'} borderRadius={'full'} backgroundColor={'teal.300'} color={'white'}>
            <RepeatIcon h={'75px'} w={'75px'} />
          </Center>
        </HStack>
        <Heading color={'teal.300'} marginTop={'1rem'}>Directus Migration Tool</Heading>
      </Flex>
      <div className='stepper-container'>
      <Flex flexDir="column" width="100%">
      <Steps variant={'circles'} colorScheme="teal" activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step label={step.label} key={step.label}>
            <Box sx={{ px: 8, bg, mb: 8, rounded: "md" }}>
              {
              step.component === ServerStepComponent && 
              <ServerStepComponent 
                loading={step.loading} 
                baseServerUrl={baseServerUrl}
                setBaseServerUrl={setBaseServerUrl}
                targetServerUrl={targetServerUrl}
                setTargetServerUrl={setTargetServerUrl} />
              }
            </Box>
          </Step>
        ))}
      </Steps>
      {hasCompletedAllSteps && (
        <Box sx={{ bg, my: 8, p: 8, rounded: "md" }}>
          <Heading fontSize="xl" textAlign={"center"}>
            Woohoo! All steps completed! 🎉
          </Heading>
        </Box>
      )}
      <Flex width="100%" justify="flex-end" gap={4}>
        {hasCompletedAllSteps ? (
          <Button size="md" onClick={reset}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              isDisabled={activeStep === 0}
              onClick={prevStep}
              size="md"
              variant="ghost"
              colorScheme='teal'
            >
              Back
            </Button>
            <Button rightIcon={isLastStep ? <CheckIcon /> : undefined} colorScheme={isLastStep ? 'teal' : 'gray'} size="md" onClick={nextStep}>
              {isLastStep ? "Complete" : "Next"}
            </Button>
          </>
        )}
      </Flex>
    </Flex>
      </div>
    </Flex>
  )
}

export default App