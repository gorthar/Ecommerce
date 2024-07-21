import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  function navigateToHomeDelayed() {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }
  navigateToHomeDelayed();

  return (
    <div className=" w-full h-96 text-center  mt-96 dark:text-gray-200">
      <p className=" font-bold text-2xl ">Order created successfully!</p>
      <p className="text-lg mt-4">
        You can wait for page to redirect or you can go back to the home page.
      </p>
      <p className="text-lg mt-4">OR</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Go back to the home page
      </button>
    </div>
  );
}
export default OrderSuccess;
