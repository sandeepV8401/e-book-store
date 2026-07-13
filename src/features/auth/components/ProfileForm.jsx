import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import profilePic from "../../../shared/assets/profile-pic.avif";
import "./ProfileForm.css";
import useAuth from "../hooks/useAuth";

const ProfileForm = () => {
  const { profile, updateProfile } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();
  const isProfileAdded = Boolean(profile.name);
  const onSubmit = (data) => {
    console.log(data);
    updateProfile(data);
    console.log(data);
  };

  useEffect(() => {
    if (isProfileAdded) {
      reset(profile);
    }
  }, [profile, reset]);

  return (
    <div className="profile-page">
      <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="profile-pic">
          <img src={profilePic} alt="profile-pic" />
        </div>

        <div className="input-box">
          {/* <label>Name:</label> */}
          <input
            placeholder="Enter Name"
            {...register("name", {
              required: { value: true, message: "*Name is mandatory" },
              minLength: {
                value: 3,
                message: "*Name must be atleast 3 chars",
              },
            })}
          />
          <p className="error-message">{errors.name?.message}</p>
        </div>

        <div className="input-box">
          {/* <label>Email:</label> */}
          <input
            type="email"
            placeholder="Enter Email"
            {...register("email", {
              required: { value: true, message: "*Email is mandatory" },
            })}
          />
          <p className="error-message">{errors.email?.message}</p>
        </div>

        <div className="input-box">
          {/* <label>Phone no:</label> */}
          <input
            placeholder="Enter Pnone no"
            {...register("phone", {
              required: { value: true, message: "*Phone no is mandatory" },
            })}
          />
          <p className="error-message">{errors.phone?.message}</p>
        </div>

        <div className="input-box">
          {/* <label>Address:</label> */}
          <textarea
            placeholder="Enter Address"
            {...register("address", {
              required: { value: true, message: "*Address is mandatory" },
            })}
          />
          <p className="error-message">{errors.address?.message}</p>
        </div>

        <button
          className="btn"
          type="submit"
          disabled={isProfileAdded && !isDirty}
        >
          {isProfileAdded ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
