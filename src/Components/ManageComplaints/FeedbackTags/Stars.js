import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox, FormControlLabel } from "@material-ui/core";

export default function FeedbackTags(props) {
  const { token, item, save } = props;

  const handleChange = (event) => {
    if (event.target.checked)
      addStarToTag(event.target.name, event.target.checked);
    else {
      deleteStarToTag(event.target.name, event.target.checked);
    }
  };

  const addStarToTag = (id, yes) => {
    console.log("iteemmmmmmmmmmmmm" + id, yes);
    axios
      .post(
        "http://m2r31169.herokuapp.com/api/addTagToStar",
        { tagId: item.id, starId: id },
        {
          headers: {
            "x-access-token": token, //the token is a variable which holds the token
          },
        }
      )
      .then((res) => {
        console.log("post hogayi" + res.data);
        save();
      })
      .catch((error) => {
        console.log("error agaya" + error);
      });
  };

  const deleteStarToTag = (id, yes) => {
    console.log("iteemmmmmmmmmmmmm" + id, yes);
    axios
      .post(
        "http://m2r31169.herokuapp.com/api/deleteTagOfStar",
        { tagId: item.id, starId: id },
        {
          headers: {
            "x-access-token": token, //the token is a variable which holds the token
          },
        }
      )
      .then((res) => {
        console.log("post hogayi" + res.data);
        save();
      })
      .catch((error) => {
        console.log("error agaya" + error);
      });
  };
  return (
    <div>
      {["1", "2", "3", "4", "5"].map((x) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={item.Stars.includes(x)}
                onChange={handleChange}
                name={x}
              />
            }
            label={x}
          />
          // <Chip
          //   //icon={icon}
          //   label={x}
          //   // onDelete={item.number == edit ? "some" : undefined}
          //   className={classes.chip}
          // />
        );
      })}
    </div>
  );
}
