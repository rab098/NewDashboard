import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  Button,
  TextField,
  Box,
  TableBody,
  ListItemText,
  ListItemSecondaryAction,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Tab,
  ListItem,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Stars from "./Stars";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function FeedbackTags(props) {
  const { token } = props;

  const classes = useStyles();

  const [allTags, setAllTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const deleteTag = (it) => {
    console.log("iteemmmmmmmmmmmmm" + it);
    axios
      .post(
        "http://m2r31169.herokuapp.com/api/deleteFeedbackTag",
        { tagId: it },
        {
          headers: {
            "x-access-token": token, //the token is a variable which holds the token
          },
        }
      )
      .then((res) => {
        console.log("post hogayi" + res.data);
        getTags();
      })
      .catch((error) => {
        console.log("error agaya" + error);
      });
  };
  const AddTag = () => {
    // console.log("iteemmmmmmmmmmmmm" + item);
    axios
      .post(
        "http://m2r31169.herokuapp.com/api/addFeedbackTag",
        { tag: newTag },
        {
          headers: {
            "x-access-token": token, //the token is a variable which holds the token
          },
        }
      )
      .then((res) => {
        console.log("post hogayi" + res.data);
        getTags();
        setNewTag("");
      })
      .catch((error) => {
        console.log("error agaya" + error);
      });
  };
  const getTags = () => {
    var finalObj = [];
    axios
      .get("https://m2r31169.herokuapp.com/api/feedbackAssociatedStars", {
        headers: {
          "x-access-token": token, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        console.log("agyaa" + JSON.stringify(res.data));
        for (var i in res.data) {
          finalObj.push(res.data[i]);
        }
        console.log("Reasonssssss" + finalObj.toString());
        setAllTags(finalObj);
      });

    //   .catch((err) => setErrors(err));
  };
  // const handleDelete = (chipToDelete) => () => {
  //   setChipData((chips) =>
  //     chips.filter((chip) => chip.key !== chipToDelete.key)
  //   );
  // };
  useEffect(() => {
    getTags();
  }, []);

  return (
    <div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className="tableRow">
            <TableCell align="center">Tag</TableCell>
            <TableCell align="center">Ratings</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tableBody">
          {allTags.map((item) => {
            console.log("ag", item);
            return (
              <TableRow className="tableRow">
                <TableCell align="center">
                  {item.tags}

                  {/* <Box component="fieldset" borderColor="transparent">
                    <Rating name="read-only" value={item.number} readOnly />
                  </Box> */}
                </TableCell>
                <TableCell align="center">
                  <Stars token={token} item={item} save={() => getTags()} />
                </TableCell>
                <TableCell align="right">
                  <Button
                    color="primary"
                    onClick={() => {
                      deleteTag(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <List>
        <ListItem>
          {/* <TableCell align="center"> */}
          <TextField
            variant="outlined"
            placeholder="Enter new tag"
            id="standard-required"
            // value={newReason}
            style={{ width: "80%" }}
            onChange={(event) => {
              setNewTag(event.target.value);
            }}
          />
          {/* </TableCell> */}
          <ListItemSecondaryAction>
            {/* <TableCell></TableCell> */}
            {/* <TableCell align="center"> */}
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
                AddTag();
              }}
            >
              Add Tags
            </Button>
          </ListItemSecondaryAction>
          {/* </TableCell> */}
        </ListItem>
      </List>
    </div>
  );
}
