import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("anil@gmail.com");
  const [passWord, setPassWord] = useState("Anil@123");
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
  return (
    <div>
      <div className="card bg-base-100 image-full w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">login</h2>
          <label className="form-control w-full max-w-xs">
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
              type="text"
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
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
