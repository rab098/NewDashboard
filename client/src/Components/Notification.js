import React, {useEffect, useState} from "react";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { fade } from "@material-ui/core";
import "animate.css";
import {title} from "../assets/jss/material-dashboard-react";
import {keys} from "@material-ui/core/styles/createBreakpoints";

function Notification(props) {

  useEffect(() => {

      store.addNotification({
        title: props.value.data.title,
        message:  props.value.data.message ,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "slideInRight"],
        animationOut: ["animated", "slideOutRight"],
        dismiss: {
          duration: 6000,
          showIcon: true,
        },
        // onClick:{
        //   goToComplaints
        // }
        // showIcon: true
      })

    console.log("new notif is here notif",props)


  }, [props]);

  // const goToComplaints = (event) => {
  //   event.preventDefault();
  //   window.location = "/dashboard/complaints";
  // };


  return (


      <ReactNotification/>

  )
}

export default React.memo(Notification);

