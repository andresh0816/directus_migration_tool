import { RepeatIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Heading, HStack, useColorModeValue } from '@chakra-ui/react'
import './App.css'
import { Steps, useSteps, Step } from 'chakra-ui-steps';

const steps = [{ label: "Servers config" }, { label: "Authentication config" }, { label: "Finish" }];

function App() {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const isLastStep = activeStep === steps.length - 1;
  const hasCompletedAllSteps = activeStep === steps.length;
  const bg = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex direction={'column'} justifyContent={'space-between'} alignItems={'center'}>
      <Flex direction={'column'} alignItems={'center'} justifyContent={'center'}>
        <HStack>
          <Center h={'150px'} w={'150px'} borderRadius={'full'} backgroundColor={'teal.300'} color={'white'}>
            <RepeatIcon h={'75px'} w={'75px'} />
          </Center>
        </HStack>
        <Heading color={'teal.300'} marginTop={'2rem'}>Directus Migration Tool</Heading>
      </Flex>
      <div className='stepper-container'>
      <Flex flexDir="column" width="100%">
      <Steps variant={'circles'} colorScheme="teal" activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step label={step.label} key={step.label}>
            <Box sx={{ p: 8, bg, my: 8, rounded: "md" }}>
              <Heading fontSize="xl" textAlign="center">
                Step {index + 1}
              </Heading>
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
          <Button size="sm" onClick={reset}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              isDisabled={activeStep === 0}
              onClick={prevStep}
              size="sm"
              variant="ghost"
              colorScheme='gray'
            >
              Back
            </Button>
            <Button colorScheme={isLastStep ? 'teal' : 'gray'} size="sm" onClick={nextStep}>
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