import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Switch from "@material-ui/core/Switch";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
}));

export default function Settings() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(["wifi"]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      //   subheader={<ListSubheader>Settings</ListSubheader>}
      className={classes.root}
    >
      <ListItem className="elevation">
        <ListItemIcon>
          <NotificationsActiveIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary="Notifications" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle("wifi")}
            checked={checked.indexOf("wifi") !== -1}
            inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem className="elevation">
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-bluetooth" primary="Email" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handleToggle("bluetooth")}
            checked={checked.indexOf("bluetooth") !== -1}
            inputProps={{ "aria-labelledby": "switch-list-label-bluetooth" }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
