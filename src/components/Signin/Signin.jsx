import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Signin.css";
import { Toaster } from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../utils";
import { supabase } from "../../supabaseClient";
import { useToast, useAuth } from "../../contexts";

const Signin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { notifySuccess, notifyError } = useToast();
  const { currentUser, setCurrentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const loginFormData = async (values) => {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email: values.email,
        password: values.password,
      });
      if (user) {
        notifySuccess("You are successfully loged in.");

        if (session !== null) {
          setCurrentUser(session);
        }
        if (location.state) {
          navigate(location?.state?.from?.pathname, { replace: true });
        } else {
          navigate("/");
        }
      }
      if (error) throw error;
    } catch (error) {
      console.log(error);
      notifyError(error.message);
    }
  };

  const guestLogin = async () => {
    try {
      const { user, session, error } = await supabase.auth.signIn({
        email: "alex96@gmail.com",
        password: "alexSCOTT1!",
      });
      if (user) {
        notifySuccess("You are successfully loged in.");

        if (session !== null) {
          setCurrentUser(session);
        }
        if (location.state) {
          navigate(location?.state?.from?.pathname, { replace: true });
        } else {
          navigate("/");
        }
      }
      if (error) throw error;
    } catch (error) {
      notifyError(error.message);
    }
  };
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <main className="showcase">
        <div className="logo">
          <img
            src="https://images.weserv.nl/?url=https://res.cloudinary.com/dwhsfh3sc/image/upload/v1659777770/zeplin-movies/movie-assets-imgs/3f00209efe435739ad7948223251c7b0_rdnl8l.png"
            alt="Hulu"
          />
        </div>

        <div className="showcase-content">
          <div className="formm">
            <Formik
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={loginFormData}
            >
              <Form>
                <h1>Sign In</h1>
                <div className="info">
                  <div className="pb-2">
                    <Field
                      className="email"
                      type="email"
                      placeholder="Email address"
                      aria-describedby="email address"
                      name="email"
                    />
                    <ErrorMessage name="email">
                      {(errorMsg) => (
                        <div className="font-bold font-ex-sm label-text-danger">
                          {errorMsg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="pb-2">
                    <Field
                      className="email"
                      type="password"
                      placeholder="Password"
                      name="password"
                      aria-describedby="password"
                    />
                    <ErrorMessage name="password">
                      {(errorMsg) => (
                        <div className="font-bold font-ex-sm label-text-danger">
                          {errorMsg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="btn">
                  <button className="btn-signin btn-primary" type="submit">
                    Sign In
                  </button>
                </div>
              </Form>
            </Formik>
            <div className="btn">
              <button
                className="btn-signin btn-outline-primary"
                onClick={guestLogin}
              >
                Login as Guest
              </button>
            </div>
          </div>
          <div className="signup">
            <p>New to Hulu ?</p>
            <Link to="/signup" className="link">
              Sign up now
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export { Signin };
