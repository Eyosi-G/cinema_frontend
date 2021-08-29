import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import React from "react";

const Confirm = ({ confirmDialog, setConfirmDialog}) => {
  const handleClose = () => {
    setConfirmDialog({open:false});
  };
  const handleDelete = () => {  
    confirmDialog.onConfirm()  
    setConfirmDialog({open:false});
  };
  return (
    <div>
      <Dialog open={confirmDialog.open} onClose={handleClose}>
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined" size="small">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" variant="contained" size="small" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirm;
