import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { Toaster } from "react-hot-toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { signupValidationSchema } from "../../utils";
import { supabase } from "../../supabaseClient";
import { useToast, useAuth } from "../../contexts";

const Signup = () => {
  const { notifySuccess, notifyError } = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, []);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const signupFormValidate = async (values) => {
    try {
      const { user, session, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      console.log(user);
      if (error) throw error;
      notifySuccess("Account created successfully");
      navigate("/", { replace: true });
      try {
        const timestamp = new Date().toLocaleString();
        const { data, error } = await supabase.from("users_credentials").insert(
          [
            {
              id: user?.id,
              email: values.email,
              username: values.username,
              last_sign_in: timestamp,
            },
          ],
          { returning: "minimal" }
        );
        if (error) throw error;

        // init user achievement table in DB
      } catch (error) {
        if (error.code === "23505") {
          notifyError("user already exists");
        }
        notifyError(error.message);
        console.error(error.message);
      }

      /* user insertion table  */
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
              validationSchema={signupValidationSchema}
              onSubmit={signupFormValidate}
            >
              <Form>
                <h1>Sign Up</h1>
                <div className="info">
                  <div className="pb-1">
                    <Field
                      type="text"
                      className="email"
                      placeholder="username"
                      id="username"
                      aria-describedby="email-address"
                      name="username"
                    />
                    <ErrorMessage name="username">
                      {(errorMsg) => (
                        <div className="font-bold font-ex-sm label-text-danger">
                          {errorMsg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className="pb-1">
                    <Field
                      type="email"
                      className="email"
                      placeholder="Email Address"
                      id="email-address"
                      aria-describedby="email-address"
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

                  <div className="pb-1">
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

                  <div className="pb-1">
                    <Field
                      className="email"
                      type="password"
                      placeholder="Re-enter Password"
                      name="confirmPassword"
                      aria-describedby="confirm password"
                    />
                    <ErrorMessage name="confirmPassword">
                      {(errorMsg) => (
                        <div className="font-bold font-ex-sm label-text-danger">
                          {errorMsg}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="btn">
                  <button className="btn-signup btn-primary" type="submit">
                    Create Hulu Account
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
          <div className="signup">
            <p>Already have an Hulu Account ?</p>
            <Link to="/login" className="link">
              Login here
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export { Signup };
