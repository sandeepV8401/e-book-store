import React from "react";
import Loader from "../../../shared/components/loader/Loader";
import "./ProfilePage.css";
import ProfileForm from "../components/ProfileForm";

const ProfilePage = () => {
  return (
    <main className="profile-page">
    <ProfileForm />
    </main>
  );
};

export default ProfilePage;
