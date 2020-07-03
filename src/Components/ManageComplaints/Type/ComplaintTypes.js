import React, { useState, useEffect } from "react";
import axios from "axios";
import Type from "./Type";
import AddType from "./AddType";
import Box from "@material-ui/core/Box";

export default function ComplaintTypes(props) {
  const { token } = props;
  const [types, setTypes] = useState([]);
  const [edit, setEdit] = useState(null);
  const getTypes = () => {
    var finalObj = [];
    axios
      .get(
        "https://m2r31169.herokuapp.com/api/dashboard/getComplaintTypeAndImage",
        {
          headers: {
            "x-access-token": token, //the token is a variable which holds the token
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        for (var i in res.data) {
          finalObj.push(res.data);
        }
        //rabia ko bolo sahi kro
        console.log("Typesssss" + JSON.stringify(finalObj[0]));
        setTypes(finalObj[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <Box display="flex" flexWrap="wrap" alignContent="flex-start">
      {types.map((type) => (
        // <p>{type.typeName}</p>
        <Type
          id={type.id}
          name={type.typeName}
          image={"https://m2r31169.herokuapp.com" + type.image}
          enable={type.isEnable}
          token={token}
          edit={(id) => {
            setEdit(id);
          }}
          allowEdit={edit == type.id ? true : false}
          doneEnable={() => {
            getTypes();
          }}
          done={() => {
            getTypes();
            setEdit(null);
          }}
        />
      ))}
      <AddType key={types} token={token} done={() => getTypes()} />
    </Box>
  );
}
