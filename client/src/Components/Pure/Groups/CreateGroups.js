import React, { useState } from "react";
import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded";
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateGroups() {
  const lighttheme = useSelector((state) => state.themeKey);
  const changeTheme = lighttheme ? "" : " dark";

  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    console.log("Usuario no autenticado");
    navigate("/");
  }

  const user = userData.data;
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("Userdata from createGroups", userData);

  const createGroup = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios.post(
      "http://localhost:5000/chat/createGroup",
      {
        name: groupName,
        users: `["647d94aea97e40a17278c7e5","647d999e4c3dd7ca9a2e6543"]`,
      },
      config
    );
    navigate("/app/groups");
  };
  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Quieres crear un grupo llamado " + groupName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esto creara un grupo donde serás el administrador y otras personas
              podrán unirse.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No estoy de acuerdo</Button>
            <Button
              onClick={() => {
                createGroup();
                handleClose();
              }}
              autoFocus
            >
              De acuerdo
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
            onChange={(e) => {
              setGroupName(e.target.value)
            }}
          />
          <IconButton
            onClick={() => {
              handleClickOpen();
            }}
          >
            <DoneOutlineRoundedIcon className={changeTheme} />
          </IconButton>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default CreateGroups;
