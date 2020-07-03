import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { List, Button, TextField } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  list: {},
  listItem: {
    background: "white",
    margin: 10,
  },
}));

export default function Rejection(props) {
  const { token } = props;

  const classes = useStyles();

  const [reason, setReason] = useState([]);
  const [newReason, setNewReason] = useState("");

  const AddReason = () => {
    console.log("iteemmmmmmmmmmmmm" + newReason);
    axios
      .post(
        "http://m2r31169.herokuapp.com/api/addReasonForRejection",
        { reason: newReason },
        {
          headers: {
            "x-access-token": token, //the token is a variable which holds the token
          },
        }
      )
      .then((res) => {
        console.log("post hogayi" + res.data);
        setNewReason("");
        getReason();
      })
      .catch((error) => {
        console.log("error agaya" + error);
      });
  };
  const deleteReason = (item) => {
    console.log("iteemmmmmmmmmmmmm" + item);
    axios
      .post(
        "http://m2r31169.herokuapp.com/api/deleteReasonForRejection",
        { reason: item },
        {
          headers: {
            "x-access-token": token, //the token is a variable which holds the token
          },
        }
      )
      .then((res) => {
        console.log("post hogayi" + res.data);
        getReason();
      })
      .catch((error) => {
        console.log("error agaya" + error);
      });
  };
  const getReason = () => {
    var finalObj = [];
    axios
      .get("https://m2r31169.herokuapp.com/api/getRejectTags")
      .then((res) => {
        console.log("agyaa" + res.data);
        for (var i in res.data.Reasons) {
          finalObj.push(res.data.Reasons[i]);
        }
        console.log("Reasonssssss" + finalObj.toString());
        setReason(finalObj);
      });
    //   .catch((err) => setErrors(err));
  };

  useEffect(() => {
    getReason();
  }, []);

  return (
    <div>
      <List className={classes.list}>
        {reason.map((item) => {
          return (
            <ListItem className={classes.listItem}>
              <ListItemText primary={item} />
              <ListItemSecondaryAction>
                <Button color="primary" onClick={() => deleteReason(item)}>
                  Delete
                </Button>
                {/* <IconButton edge="end" aria-label="delete">
                    <EditIcon />
                  </IconButton> */}
                {/* <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton> */}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <ListItem>
          <TextField
            variant="outlined"
            placeholder="Enter new reason"
            id="standard-required"
            value={newReason}
            style={{ width: "80%" }}
            onChange={(event) => {
              setNewReason(event.target.value);
            }}
          />
          <ListItemSecondaryAction>
            <Button
              variant="contained"
              style={{
                Width: "15%",
                background: "teal",
                border: 0,
                color: "white",
                padding: 10,
                textDecoration: "none",
              }}
              onClick={() => {
                AddReason();
              }}
            >
              Add Reason
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
