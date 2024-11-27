import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { Base_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || 18);
  const [about, setAbout] = useState(user.about || "");
  const [error1, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        Base_URL + "profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="flex justify-center my-5">
        <div className="flex justify-center">
          <div className="card bg-base-100 image-full w-96 h-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Firstname</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={firstName}
                    className="input input-bordered w-full max-w-xs mb-0.5"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <div className="label">
                    <span className="label-text">Lastname</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={lastName}
                    className="input input-bordered w-full max-w-xs mb-0.5"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={age}
                    className="input input-bordered w-full max-w-xs mb-0.5"
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={gender}
                    className="input input-bordered w-full max-w-xs mb-0.5"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <div className="label">
                    <span className="label-text">PhotoUrl</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs mb-0.5"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input
                    type="text"
                    placeholder=""
                    value={about}
                    className="input input-bordered w-full max-w-xs mb-0.5"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <p className="text-red-500">{error1}</p>
              </div>
              <div className="card-actions justify-center my-1">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-12">
          <UserCard
            user={{ firstName, lastName, gender, photoUrl, age, about }}
          />
        </div>
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
