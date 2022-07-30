import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import providus from "../../assets/image2.png";
import eyeOn from "../../assets/eyeOn.svg";
import eyeOff from "../../assets/eyeOff.svg";
import loaderIcon from "../../assets/loaderIcon.svg";
import warning from "../../assets/warning.svg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { apiHeaders, apiUrl } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    setPasswordShown(!passwordShown);
  };
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (data) => {
    const options = {
    //   headers: apiHeaders(""),
    };
    try {
      setLoading(true);
    //   const response = await axios.post(apiUrl.login, data, options);
      setLoading(false);
      if (response.data.Code !== 200) {
        toast.error(`ERROR, ${response.data.Message}`);
        return;
      }

      // if (!response.data.Body.user.is_enabled) {
      //   toast.error(`ERROR, Please Verify You Email`);
      //   return;
      // }

      localStorage.setItem("authToken", response.data.Body.token_string);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(response.data.Body.user)
      );
      toast.success("Login Successfull");

      const role = response.data.Body.roles.name;
      console.log("userROLE", role);
      switch (role) {
        case "SUPERADMIN":
          history.push("/adminsettings");
          break;
        case "BANK_MANAGER":
          history.push("/dashboard");
          break;
        case "BRANCH_MANAGER":
          history.push("/globaladmin");
          break;
        case "ADMIN":
          history.push("/bankuser");
          break;
        default:
          history.push("/");
      }
    } catch (err) {
      setLoading(false);
      toast.error(`ERROR, ${err.message}`);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required("Email can not be empty")
      .email("This can’t be right. Email Invalid"),
    password: Yup.string()
      .required("Password can not be empty")
      .max(20, "Password must not exceed 20 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must contain at least 8 characters with Uppercase, Lowercase, Number and Special Character"
      ),
  });

  return (
    <>
      <main className="bg-login-image xl:w-screen xl:h-screen xl:bg-clip-border xl:flex xl:justify-center xl:items-center">
        <section className="xl:w-login-width h-auto bg-white rounded-md">
          <div className="mt-10 flex items-center flex-col">
            <img src={providus} alt="logo" />
            <h3 className="font-bold text-xl text-center text-lblack mt-4 flex flex-wrap w-48">
              Log In to Providus Card Management
            </h3>
            <h6 className="text-lgray text-sm mt-5">
              Enter your email and password below
            </h6>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="flex flex-col">
                <label className="text-lgray text-xs font-bold mt-4 ml-8 uppercase">
                  email
                </label>
                <Field
                  name="email"
                  type="text"
                  placeholder="Email address"
                  className={`${
                    errors.password && touched.password ? "border-red-600 " : ""
                  } bg-ibgray w-10/12 ml-8 mt-2 rounded-md borderfocus:outline-none focus:border-buyellow focus:ring-1 focus:ring-buyellow  border-bgray placeholder:opacity-50
              } `}
                />
                {errors.email && touched.email && (
                  <div className="flex items-center text-error ml-8 text-sm pt-2">
                    <img src={warning} alt="" className="w-5" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="ml-2"
                    />
                  </div>
                )}

                <label className="text-lgray text-xs font-bold mt-4 ml-8 uppercase">
                  password
                </label>
                <div className=" relative ">
                  <Field
                    name="password"
                    type={passwordShown === false ? "password" : "text"}
                    placeholder="Password"
                    className={`${
                      errors.password && touched.password
                        ? "border-red-600"
                        : ""
                    } bg-ibgray w-10/12 ml-8 mt-2 rounded-md borderfocus:outline-none focus:border-buyellow focus:ring-1 focus:ring-buyellow  border-bgray placeholder:opacity-50`}
                  />
                  <span className="text-2xl absolute top-4 right-12">
                    {passwordShown === false ? (
                      <img
                        src={eyeOn}
                        alt=""
                        className="h-6 w-6"
                        onClick={toggle}
                      />
                    ) : (
                      <img
                        src={eyeOff}
                        alt=""
                        className="h-6 w-6"
                        onClick={toggle}
                      />
                    )}
                  </span>{" "}
                </div>
                {errors.password && touched.password && (
                  <div className="flex items-center text-error ml-8 text-sm pt-2">
                    <img src={warning} alt="" className="w-5" />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="ml-2"
                    />
                  </div>
                )}

                <div className="ml-8  mt-5 ">
                  <small className="text-lgray text-sm">
                    <span className="text-gold text-sm">
                      <Link to="/forgot-password">Forgot Password?</Link>
                    </span>
                  </small>
                </div>

                <button
                  type="submit"
                  className="flex justify-center shadow-lg shadow-blue-200 mt-5 pt-2 text-lg font-semibold bg-buyellow ml-8 h-10 rounded-md text-white w-10/12"
                  disabled={isSubmitting}
                >
                  {loading ? (
                    <img
                      src={loaderIcon}
                      alt=""
                      className="h-6 w-6 text-center"
                    />
                  ) : (
                    "Log In"
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="mt-5 flex items-center flex-col mb-6">
            <small className="text-lgray text-sm">
              Don't Have an account Yet?
              <span className="text-gold pl-2">
                <Link to="/signup">Click Here</Link>
              </span>
            </small>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
