import { useEffect, useRef, useState } from "react";

const CheckoutStepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  stepsConfig = [
    {
      name: "Customer Info",
      Component: () => <div>Provide your contact details.</div>,
    },
    {
      name: "Shipping Info",
      Component: () => <div>Enter your shipping address.</div>,
    },
    {
      name: "Payment",
      Component: () => <div>Complete payment for your order.</div>,
    },
  ];
  useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [stepRef, stepsConfig.length]);

  if (!stepsConfig.length) {
    return <></>;
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <>
      <div className="relative flex justify-between items-center mb-5">
        {stepsConfig.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className={`flex flex-col items-center ${
                currentStep > index + 1 || isComplete
                  ? "text-green-500"
                  : "text-gray-500"
              } ${currentStep === index + 1 ? "text-blue-500" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex justify-center items-center mb-2 transition-colors ${
                  currentStep > index + 1 || isComplete
                    ? "bg-green-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-sm">{step.name}</div>
            </div>
          );
        })}

        <div
          className="absolute top-1/4 left-0 h-1 bg-gray-300 -z-10"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="h-full bg-green-500 transition-all ease-out duration-200"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      <ActiveComponent />

      {!isComplete && (
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={handleNext}
        >
          {currentStep === stepsConfig.length ? "Place Order" : "Next"}
        </button>
      )}
    </>
  );
};

export default CheckoutStepper;
