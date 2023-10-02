import React from 'react';
import { Stepper, Step, Button, Card } from '@material-tailwind/react';
import StepperForm from './StepperForm';
import { FiUser, FiTruck, FiBatteryCharging } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const DefaultStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(true);
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    if (isValid) {
      !isLastStep && setActiveStep((cur) => cur + 1);
      setIsValid(false);
    }
  }, [isValid]);

  const handleNext = () => {
    if (isLastStep) {
      window.location.assign('/');
    } else {
      const elem = document.getElementsByClassName('test')[0] as HTMLElement;
      elem?.click();
    }
  };

  const handlePrev = () => {
    if (activeStep === 0) {
      window.location.href = '/';
    } else {
      setIsValid(false);
      setActiveStep((cur) => cur - 1);
      setIsFirstStep(false);
    }
  };

  return (
    <div className="items-center space-y-4 w-full sm:max-w-lg mt-2">
      <Card shadow={true} className="shadow-lg rounded-tl rounded-br p-4">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step style={{ backgroundColor: 'gray' }}>
            <FiUser />
          </Step>
          <Step style={{ backgroundColor: 'gray' }}>
            <FiTruck />
          </Step>
          <Step style={{ backgroundColor: 'gray' }}>
            <FiBatteryCharging />
          </Step>
        </Stepper>
      </Card>
      <StepperForm stepIndex={activeStep} checkValid={setIsValid} />

      <div className={`mt-16 flex ${activeStep !== 2 ? 'justify-between' : 'justify-center'}`}>
        {activeStep === 0 ? (
          <Link to="/">
            <Button variant="gradient" color="gray" className="rounded-full">
              Back to Home
            </Button>
          </Link>
        ) : (
          activeStep !== 2 && (
            <Button variant="gradient" color="gray" className="rounded-full" onClick={handlePrev}>
              Back
            </Button>
          )
        )}

        <Button
          type="submit"
          variant="gradient"
          color="gray"
          className="rounded-full"
          onClick={handleNext}
        >
          {isLastStep ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default DefaultStepper;
