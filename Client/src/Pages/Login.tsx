import apiConnector from "@/ApiConnector/connector";
import LoadingSpinner from "@/Components/Util/LoadingSpinner";
import { useStoreContext } from "@/Context/useStoreContext";

import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors, isValid },
  } = useForm({
    mode: "onBlur",
  });
  const { saveUser, setCart } = useStoreContext();
  async function submitForm(data: FieldValues) {
    const result = await apiConnector.Account.login(data);
    console.log(result);
    if (result) {
      saveUser(result);
      setCart(result.basket);
      navigate("/");
    }
  }
  return (
    //create tailwind css login page with its dark: proparities
    <div className="flex justify-center bg-gray-200 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg min-w-96 mt-72 max-w-96 ">
        <h2 className="text-2xl font-bold text-gray-900 text-center dark:text-gray-100">
          Login
        </h2>
        <form className="mt-4" onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col gap-4">
            <input
              {...register("email", { required: true, pattern: /^\S+@\S+$/ })}
              type="email"
              id="email"
              placeholder="Email"
              className={
                "p-2 border dark:bg-gray-800 dark:text-gray-300 rounded-lg " +
                (errors.email
                  ? " border-red-700"
                  : " border-gray-200 dark:border-gray-700")
              }
            />
            {errors.email?.type === "required" && (
              <p className=" text-red-700 ">Email is required</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className=" text-red-700 ">Email is not valid</p>
            )}
          </div>
          <div className="flex flex-col mt-6">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: 6,
                maxLength: 20,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              })}
              type="password"
              id="password"
              placeholder="Password"
              className={
                "p-2 border  dark:bg-gray-800 dark:text-gray-300 rounded-lg" +
                (errors.password
                  ? " border-red-700"
                  : " border-gray-200 dark:border-gray-700")
              }
            />
            {errors.password?.message && (
              <p className=" text-red-700 ">
                {errors.password.message as string}
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className=" text-red-700 ">Password is too short</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className=" text-red-700 ">Password is too long</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className=" text-red-700 ">
                Password must contain at least 8 characters, one uppercase, one
                lowercase, one number and one special character
              </p>
            )}
          </div>
          <button
            type="submit"
            className={
              "bg-blue-500 text-white px-3 py-1 mt-6 rounded-lg hover:bg-blue-600 transition-colors duration-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-gray-300 dark:hover:text-gray-100 font-bold w-full text-center" +
              (isValid || isLoading ? "" : " cursor-not-allowed opacity-50")
            }
          >
            {!isLoading ? "Login" : <LoadingSpinner size={8} />}
          </button>
        </form>
        <Link to="/register" className="text-blue-500 hover:underline mt-4">
          If you don't have an account, register here
        </Link>
      </div>
    </div>
  );
}
export default Login;
