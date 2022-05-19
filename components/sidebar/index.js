import { Link, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { connect } from "react-redux";
import { Content, Title } from "../elements";
import { Business, Document, Favorite, Help, History, LogOut, OrderHistory, Personal, ReOrder, Shipping, Terms, User, Wallet } from "../icons";
import Menu from "./elements/menuitem";

function SideBar({user}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ borderBottom: "1px solid #d7d7d7",  }}>
        <Link
          href="/account"
          underline="none"
          sx={{ fontWeight: 600, color: "#000" }}
          variant="h4"
        >
          Hi, {user?.first_name ? user.first_name: ""}
        </Link>
        <Content sx={{ marginBottom: "10px !important", fontSize: 10 }}>
          Thanks for being a DrugStoc customer
        </Content>
      </Box>
      <Box
        sx={{
          paddingTop: 1,
          paddingBottom: 1,
          borderBottom: "1px solid #d7d7d7",
        }}
      >
        <Menu
          Icons={History}
          title="Purchase History"
          navigation="/account/purchase_history"
        />
        <Menu Icons={Wallet} title="DrugStoc Pay" navigation="/account/wallet" />
        <Menu Icons={Document} title="Telemedicine (Bulk Order)" navigation="/account/bulk-order" />
      </Box>
      <Box
        sx={{
          paddingTop: 1,
          paddingBottom: 1,
          borderBottom: "1px solid #d7d7d7",
        }}
      >
        <Title variant="h6" sx={{ paddingTop: 1, paddingBottom: 1 }}>
          Manage Account
        </Title>
        <Menu
          Icons={Personal}
          title="Personal information"
          navigation="/account/personal_info"
        />
        <Menu
          Icons={Business}
          title="Business information"
          navigation="/account/business"
        />
        <Menu
          Icons={Shipping}
          title="Shipping Addresses"
          navigation="/account/shipping_address"
        />
      </Box>
      <Box
        sx={{
          paddingTop: 1,
          paddingBottom: 1,
          borderBottom: "1px solid #d7d7d7",
        }}
      >
        <Title variant="h6" sx={{ paddingTop: 1, paddingBottom: 1 }}>
          My DrugStoc
        </Title>
        <Menu Icons={ReOrder} title="Reorder" />
        <Menu Icons={Favorite} title="My Favorite" />
        <Menu Icons={OrderHistory} title="My Orders" />
      </Box>
      <Box
        sx={{
          paddingTop: 1,
          paddingBottom: 1,
          borderBottom: "1px solid #d7d7d7",
        }}
      >
        <Title variant="h6" sx={{ paddingTop: 1, paddingBottom: 1 }}>
          Customer Service
        </Title>
        <Menu Icons={Help} title="Change Password" navigation="/account/change-password" />
        <Menu Icons={Help} title="Help" />
        <Menu Icons={Terms} title="Term of use" />
      </Box>
      <Box
        sx={{
          paddingTop: 1,
          paddingBottom: 1,
        }}
      >
        <Menu Icons={LogOut} title="Sign Out" />
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(SideBar);
