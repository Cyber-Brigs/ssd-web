import React from "react";
import { store } from "../../store/store";
import LogoutIcon from "@mui/icons-material/Logout";
const UserLogOut = () => {
  const USER_LOGOUT = "USER_LOGOUT";
  const logOut = () => {
    return {
      type: USER_LOGOUT,
    };
  };
  const handleLogOut = () => {
    store.dispatch(logOut());
  };

  return (
    <div className="relative inline-block">
      <div className=" border transition-transform transform hover:-translate-y-1 shadow-md p-1 border-custom-grey rounded-lg space-x-2 cursor-pointer">
        <div onClick={() => handleLogOut()} className="relative right-0">
          <LogoutIcon
            sx={{ color: "error.main", fontWeight: "bold" }}
            className="m-1 w-7 h-7  "
          />
          <span className="text-md text-white font-bold">LOG OUT</span>
        </div>
      </div>
    </div>
  );
};

export default UserLogOut;
