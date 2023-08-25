import React from "react";
import { Link } from "react-router-dom";
import SettingsItem from "../elements/SettingsItem";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useNavigate } from "react-router";
import { SIGN_OUT } from "../store/Auth/Auth.slice";
import TimeTravelPicker from "../elements/TimeTravelPicker";

const Settings = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const item = {
    title: "Categories",
    description: `You can create, edit, delete your categories`,
    iconUrl: `https://picsum.photos/51`,
  };
  return (
    <main>
      <Link to="/CategoryList">
        <SettingsItem item={item} />
      </Link>

      <TimeTravelPicker />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className="button"
          onClick={() => {
            dispatch(SIGN_OUT());
            navigate("/");
          }}
        >
          Sign Out
        </button>
      </div>
    </main>
  );
};

export default Settings;
