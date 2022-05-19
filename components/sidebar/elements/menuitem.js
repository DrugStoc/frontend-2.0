import React from "react";
import PropTypes from "prop-types";
import { ListItemIcon, MenuItem } from "@mui/material";
import { Content } from "../../elements";
import { useRouter } from "next/router";
import Link from "next/link";

function Menu({ title, Icons, navigation }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(navigation, undefined, { shallow: true });
  };
  return (
    <Link href={navigation}>
      <MenuItem
        sx={{
          padding: "12px 12px 12px 0px",
          background: router.asPath === navigation ? "#556aaf12" : null,
          borderLeft: router.asPath === navigation ? "4px solid #5569af" : null,
          paddingLeft: 0.5,
        }}
      >
        {Icons ? (
          <ListItemIcon>
            <Icons fontSize="small" />
          </ListItemIcon>
        ) : null}
        <Content sx={{ fontSize: 12 }}>{title}</Content>
      </MenuItem>
    </Link>
  );
}

Menu.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.any,
  navigation: PropTypes.string,
};

Menu.defaultProps = {
  title: "Test Item",
  navigation: "/",
};

export default Menu;
