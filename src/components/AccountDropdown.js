import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Firebase, firedb } from '../firebase'

export default function AccountDropdown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    props.handleLogout();
    handleClose();
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://picsum.photos/id/237/32"
          alt="Not available"
          style={{
            borderRadius: "50%",
            width: 35,
            heigth: 35,
            marginRight: 10,
          }}
        />
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Weclome, {props.name}
          <KeyboardArrowDownIcon />
        </Button>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem  onClick={() => Firebase.auth().signOut().then(console.log("signedout"), window.location.href = "/").catch(err => { console.log(err) })}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
