import CheckoutStepper from "../components/CheckoutStepper";

function Checkout() {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold py-4">Checkout</h1>
      </div>
      <div className="mx-4">
        <CheckoutStepper />
      </div>
    </>
  );
}

export default Checkout;
