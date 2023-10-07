import React from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

function CreateGroups() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: "0.2",
        }}
        className={"createGroups-container" + changeTheme}
      >
        <input
          placeholder="Introduce el nombre del grupo"
          className={"search-box" + changeTheme}
        />
        <IconButton>
          <DoneOutlineRoundedIcon className={changeTheme} />
        </IconButton>
      </motion.div>
    </AnimatePresence>
  );
}

export default CreateGroups;
