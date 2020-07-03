import React from "react";
import { Box } from "@material-ui/core";

export default function Details(props) {
  return (
    <Box
      m={1}
      component="div"
      style={{ display: props.display ? props.display : "block" }}
    >
      <Box fontWeight="700" component="div" fontSize="0.9rem" color="black">
        {props.title}
      </Box>
      <Box component="div" fontSize="0.8rem" color="grey" m={1}>
        {props.name}
      </Box>
    </Box>
  );
}
