import React, { useState, useEffect } from "react";
import axios from "axios";
import image from "../assets/images/app_icon_without_bg.png";
import Button from "@material-ui/core/Button/index";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { ImpulseSpinner } from "react-spinners-kit";
import Backdrop from "@material-ui/core/Backdrop";

let store = require("store");

const styles = {
  myCard: {
    borderRadius: 20,
    background: "#f3f3f3",
    boxShadow:
      "6px 6px 10px 0px rgba(112,112,112,0.16), -6px -6px 10px 0px #FFFFFF",
    padding: "50px 10px",
    maxWidth: "300px",
    width: "100%",
  },

  myButton: {
    background: "linear-gradient(45deg, #008080 30%, #20B2AA 90%)",
    border: 0,
    color: "white",
    width: 100,
    justifyContent: "center",
    textDecoration: "none",
    boxShadow: "0px 8px 10px -5px rgba(124,133,133,1)",
  },
  backdrop: {
    zIndex: 1,
    color: "#fff",
  },
};
const useStyles = makeStyles(styles);

function Login() {
  const classes = useStyles();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  //USE EFFECT
  useEffect(() => {
    setUserData(store.get("userData"));
  }, []);

  const [form, setForm] = useState({
    username: "",
    password: "",
    errorUser: false,
    errorPassword: false,
    helperTextUserName: "",
    helperTextPassword: "",
    helperTextMain: "",
  });

  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  //POSTING USERNAME AND PASSWORD TO DB
  function handleClick(event) {
    event.preventDefault();

    setOpen(true);
    setLoading(true);
    const userObject = {
      username: form.username,
      password: form.password,
      //mac: _macAddress,
    };

    let letters = /^[A-Za-z0-9]+$/;

    if (form.username !== "" && !form.username.match(letters)) {
      setForm({
        ...form,
        helperTextUserName: "Please use alphanumerics.",
        errorUser: true,
      });
      setLoading(false);
      setOpen(false);
    } else if (form.username === "") {
      setForm({
        ...form,
        helperTextUserName: "Please enter your username.",
        errorUser: true,
      });

      setLoading(false);
      setOpen(false);
    } else if (form.password === "") {
      setForm({
        ...form,
        helperTextPassword: "Please enter your password.",
        errorPassword: true,
      });

      setLoading(false);
      setOpen(false);
    } else if (form.username === "" && form.password === "") {
      setForm({
        ...form,
        helperTextUserName: "Please fill the fields.",
        errorUser: true,
        errorPassword: true,
      });

      setLoading(false);
      setOpen(false);
    } else {
      axios
        .post("https://m2r31169.herokuapp.com/api/signin", userObject)
        .then(async (res) => {
          if (res.status === 200) {
            // localStorage.setItem('accessToken',res.data.accessToken)
            setLoading(false);
            setOpen(false);

            store.set("userData", res.data);
            console.log("logged in!!");
            window.location = "/dashboard/home";
          }
        })
        .catch((err) => {
          console.error(err);
          console.log("login error");
          setForm({
            ...form,
            helperTextMain: "Incorrect password or username",
            errorUser: true,
            errorPassword: true,
          });
          setLoading(false);
          setOpen(false);
        });
    }
  }

  return (
    <div className="login">
      <Card className={classes.myCard}>
        <div>
          <img alt="" src={image} width="90" height="100px" />
          <p className={"card-heading-main"}>COMPLAINT MANAGEMENT SYSTEM</p>

          <form>
            <TextField
              error={form.errorUser}
              helperText={form.helperTextUserName}
              autoFocus
              id="username_id"
              variant="outlined"
              type="username"
              label="Username"
              name={"username"}
              className={"login-input"}
              placeholder="john123"
              onChange={changeHandler}
            />
            <br />
            <br />

            <TextField
              error={form.errorPassword}
              helperText={form.helperTextPassword}
              id="password_id"
              variant="outlined"
              label="Password"
              name={"password"}
              className={"login-input"}
              type="password"
              onChange={changeHandler}
            />

            <p>{form.helperTextMain}</p>

            <Button
              type="submit"
              className={classes.myButton}
              onClick={handleClick}
            >
              Submit
            </Button>
            <Backdrop className={classes.backdrop} open={open}>
              <ImpulseSpinner size={90} color="#008081" loading={loading} />
            </Backdrop>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default Login;
