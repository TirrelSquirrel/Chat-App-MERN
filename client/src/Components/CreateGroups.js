import React from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";

function CreateGroups() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  return (
    <div className={"createGroups-container" + changeTheme}>
      <input
        placeholder="Introduce el nombre del grupo"
        className={"search-box" + changeTheme}
      />
      <IconButton>
        <DoneOutlineRoundedIcon className={changeTheme} />
      </IconButton>
    </div>
  );
}

export default CreateGroups;
