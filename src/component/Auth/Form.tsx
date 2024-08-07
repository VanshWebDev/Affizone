import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AuthForm from "./login/LoginForm";
import React, { useState } from "react";
import { Button } from "antd";

export default function AlertDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button type="primary" shape="round" onClick={handleClickOpen} style={{marginBottom:'10px'}}>
        <i className="fa-solid fa-user"></i>
        Login or Signup
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <AuthForm />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
