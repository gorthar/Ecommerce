import apiConnector from "@/ApiConnector/connector";
import LoadingSpinner from "@/Components/Util/LoadingSpinner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface RegisterData {
  Email: string;
  Password: string;
  ConfirmPassword: string;
}

//create register page with its dark: proparities
function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors, isValid },
  } = useForm<RegisterData>();
  function onSubmit(data: RegisterData) {
    if (data.Password !== data.ConfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    apiConnector.Account.register(data).then(() => {
      toast.success("Account created successfully");
      navigate("/login");
    });
  }

  return (
    <div className="flex justify-center bg-gray-200 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg min-w-96 mt-72 max-w-96 ">
        <h2 className="text-2xl font-bold text-gray-900 text-center dark:text-gray-100">
          Register
        </h2>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 mt-6">
            <input
              {...register("Email", { required: true, pattern: /^\S+@\S+$/ })}
              type="email"
              id="email"
              placeholder="Email"
              className={
                "p-2 border dark:bg-gray-800 dark:text-gray-300 rounded-lg " +
                (errors.Email
                  ? " border-red-700 "
                  : " border-gray-200 dark:border-gray-700")
              }
            />
            {errors.Email?.type === "required" && (
              <p className=" text-red-800 dark:font-bold ">Email is required</p>
            )}
            {errors.Email?.type === "pattern" && (
              <p className=" text-red-800 dark:font-bold">Email is not valid</p>
            )}
          </div>

          <div className="flex flex-col mt-6 tracking-wider font-bold">
            <input
              {...register("Password", {
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
                (errors.Password
                  ? " border-red-700"
                  : " border-gray-200 dark:border-gray-700")
              }
            />
            {errors.Password?.type === "required" && (
              <p className=" text-red-800 ">Password is required</p>
            )}
            {errors.Password?.type === "minLength" && (
              <p className=" text-red-800  ">Password is too short</p>
            )}
            {errors.Password?.type === "maxLength" && (
              <p className=" text-red-800 ">Password is too long</p>
            )}
            {errors.Password?.type === "pattern" && (
              <p className="text-red-800 ">
                Password must contain at least 8 characters, one uppercase, one
                lowercase, one number and one special character
              </p>
            )}
          </div>
          <div className="flex flex-col mt-6 tracking-wider font-bold">
            <input
              {...register("ConfirmPassword", {
                required: "Password is required",
                minLength: 6,
                maxLength: 20,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              })}
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className={
                "p-2 border  dark:bg-gray-800 dark:text-gray-300 rounded-lg" +
                (errors.ConfirmPassword
                  ? " border-red-800"
                  : " border-gray-200 dark:border-gray-700")
              }
            />
            {errors.ConfirmPassword?.type === "required" && (
              <p className=" text-red-800 ">Password is required</p>
            )}
            {errors.ConfirmPassword?.type === "minLength" && (
              <p className=" text-red-800 ">Password is too short</p>
            )}
            {errors.ConfirmPassword?.type === "maxLength" && (
              <p className=" text-red-800 ">Password is too long</p>
            )}
            {errors.ConfirmPassword?.type === "pattern" && (
              <p className=" text-red-800 ">
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
            {isLoading ? <LoadingSpinner size={8} /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default Register;
