import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import useState from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
export default function DeleteDialog(props) {
  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSent = () => {
    console.log("yeieiei" + props.superId);
    props.onDelete(props.superId);
    setOpen(false);
  };
  return (
    <div>
      <IconButton style={{ backgroundColor: "transparent" }}>
        <DeleteIcon
          onClick={handleClickOpen}
          style={{
            color: "#008080",
            fontSize: "20px",
            padding: 0,
            border: 0,
          }}
        />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this row?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSent} color="primary" autoFocus>
            Delete
          </Button>{" "}
        </DialogActions>
      </Dialog>
    </div>
  );
}
