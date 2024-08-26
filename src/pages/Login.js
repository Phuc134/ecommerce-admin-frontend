import React, {useEffect} from 'react';
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import {Link, useNavigate} from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup"
import {Formik, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registerUser} from "../features/user/userSlice";
const loginSchema = yup.object({
    email: yup.string().email("Email should be valid").required("Email Address is required"),
    password: yup.string().required("Password is required")
})
const Login = () => {
    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (authState?.isSuccess) {
            navigate('/');
        }
    }, [authState?.isSuccess]);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            dispatch(loginUser(values));

        }
    })
  return (
      <>
          <Meta title={"Login"}/>
          <BreadCrumb title={"Login"}/>
          <Container class1="login-wrapper py-5 home-wrapper-2">
              <div className="row">
                  <div className="col-12">
                      <div className="auth-card">
                          <h3 className="text-center mb-3">Login</h3>
                          <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                              <CustomInput
                                  type="email"
                                  name="email"
                                  placeholder="email"
                                  onChange={formik.handleChange('email')}
                                  onBlur = {formik.handleBlur('email')}
                                    value={formik.values.email}/>
                              <div className="error">
                                  {
                                      formik.touched.email && formik.errors.email
                                  }
                              </div>
                              <CustomInput
                                  type="password"
                                  name="password"
                                  placeholder="password"
                                  onChange={formik.handleChange('password')}
                                  onBlur = {formik.handleBlur('password')}
                              value={formik.values.password}/>
                              <div className="error">
                                  {
                                      formik.touched.password && formik.errors.password
                                  }
                              </div>
                              <div>
                                  <Link to='/forgot-password'>Forgot Password?</Link>
                                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                      <button className="button border-0">Login</button>
                                      <Link to='/signup' className="button signup">Sign Up</Link>
                                  </div>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </Container>
      </>
  );
};

export default Login;