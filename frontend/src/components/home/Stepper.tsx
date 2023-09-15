import React from "react";
import { Stepper, Step, Button, Card } from "@material-tailwind/react";
import StepperForm from "./StepperForm";
import { FiUser, FiTruck, FiBatteryCharging } from "react-icons/fi";
import { useNavigate  } from "react-router-dom";
const DefaultStepper = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    
    if (isValid) {
      !isLastStep && setActiveStep((cur) => cur + 1);
      
      setIsValid(false);
    } 
  }, [isValid]);

  const handleNext = () => {
    if (isLastStep) {
      navigate("/");
      window.location.reload();
    }
    const elem = document.getElementsByClassName("test")[0] as HTMLElement;
    elem?.click();
    
  }

  const handlePrev = () => {
    setIsValid(false);
    !isFirstStep && setActiveStep((cur) => cur - 1);
  }


  return (
    <div className="items-center space-y-4 w-full sm:max-w-lg mt-2">
      <Card shadow={true} className="shadow-lg rounded-tl rounded-br p-4">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step style={{ backgroundColor: 'gray' }} ><FiUser /></Step>
          <Step style={{ backgroundColor: 'gray' }} ><FiTruck /></Step>
          <Step style={{ backgroundColor: 'gray' }} ><FiBatteryCharging />

          </Step>
        </Stepper>
      </Card>
      <StepperForm stepIndex={activeStep} checkValid={setIsValid} />

      <div className={`mt-16 flex ${activeStep !== 2 ? 'justify-between' : 'justify-center'}`}>
        {activeStep !== 2 && <Button variant="gradient" color="gray" className="rounded-full" onClick={handlePrev} disabled={isFirstStep}>
          Volver
        </Button>}

        <Button type="submit" variant="gradient" color="gray" className="rounded-full" onClick={handleNext}>
          Siguiente
        </Button>
      </div>
    </div>
  );
}

export default DefaultStepper;
