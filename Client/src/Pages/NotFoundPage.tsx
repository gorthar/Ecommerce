import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className=" w-full h-96 text-center  mt-96 dark:text-gray-200">
      <p className=" font-bold text-2xl ">
        The page you are looking for does not exist!
      </p>
      <p className="text-lg mt-4">
        It might becouse of an old link, or something unrelated. Please check
        the URL in the address bar and try again.
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
export default NotFoundPage;
