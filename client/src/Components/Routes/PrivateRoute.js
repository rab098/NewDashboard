import React, {useEffect, useState} from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Login from "../../Pages/Login";

let store = require("store");
const PrivateRoute = ({component: Component, ...options}) => {
    //   const finalComponent = user != null && user.auth == true ? component : Login;

    const [userData, setUserData] = useState({});

    useEffect(() => {
        setUserData(store.get("userData"));
    }, []);
    return (
        <Route
            {...options}
            render={(props) =>
                store.get("userData") ?
                    <Component {...props} />
                    // <Redirect to="/dashboard/home" component={() => } />
                    :
                    <Redirect to="/"/>
            }
        />
    );
};

export default PrivateRoute;
