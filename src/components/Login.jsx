import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [passWord, setPassWord] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error1, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        Base_URL + "login",
        {
          emailId,
          passWord,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err.response.data || "Something went wrong");
      console.log(err);
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        Base_URL + "signUp",
        { firstName, lastName, emailId, passWord },
        { withCredentials: true }
      );
      console.log(res);
      console.log(res.data);
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err.response.data || "Something went wrong");
    }
  };
  return (
    <div>
      <div className="card bg-base-100 image-full w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "login" : "SignUp"}
          </h2>
          <label className="form-control w-full max-w-xs">
            {!isLogin && (
              <>
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  value={firstName}
                  className="input input-bordered w-full max-w-xs mb-2"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  placeholder=""
                  value={lastName}
                  className="input input-bordered w-full max-w-xs mb-2"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              placeholder=""
              value={emailId}
              className="input input-bordered w-full max-w-xs mb-2"
              onChange={(e) => setEmailId(e.target.value)}
            />
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder=""
              value={passWord}
              className="input input-bordered w-full max-w-xs mb-2"
              onChange={(e) => setPassWord(e.target.value)}
            />
          </label>
          <div>
            <p className="text-red-500">{error1}</p>
          </div>
          <div className="card-actions justify-center my-3">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "SignUp"}
            </button>
          </div>
          <p
            className="m-auto cursor-pointer"
            onClick={() => setIsLogin((value) => !value)}
          >
            {isLogin ? "New User? SignUp Here" : "Existing user? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
