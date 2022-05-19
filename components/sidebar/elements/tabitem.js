import React from "react";
import PropTypes from "prop-types";
import { Box, Divider } from "@mui/material";
import { Content } from "../../elements";
import { useRouter } from "next/router";
import Link from "next/link";

function TabItem({ name, href }) {
  const router = useRouter();

  return (
    <Link href={href}>
      <Box sx={{ cursor: "pointer" }}>
        <Content sx={{ color: router.asPath === href ? "#5569af" : null }}>
          {name}
        </Content>
        {router.asPath === href ? (
          <Divider
            sx={{
              padding: "5px 5px 5px 0px",
              width: "60%",
              margin: "auto",
              borderBottom: router.asPath === href ? "4px solid #5569af" : null,
              paddingLeft: 0.5,
            }}
          />
        ) : null}
      </Box>
    </Link>
  );
}

TabItem.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

TabItem.defaultProps = {
  name: "Tab",
};

export default TabItem;
