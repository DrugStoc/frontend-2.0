import { Box, Divider, Skeleton, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Content, Title } from "../../components/elements";
import { History, Personal, Wallet } from "../../components/icons";
import AccountLayout from "../../components/Layouts/account";
import Cards from "../../components/sidebar/elements/cards";

function Account({ email, phone_number }) {
  return (
    <AccountLayout>
      <Box sx={{ marginBottom: 5 }}>
        <Title variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
          Welcome to your Account
        </Title>
        <Content>Let’s get you started with DrugStoc</Content>
      </Box>
      <Cards
        title="Personal Information"
        subtitle="Addresses, contact information and password"
        Icon={Personal}
      >
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{ justifyContent: "space-between" }}
        >
          <Box sx={{ width: "50%", marginBottom: 1 }}>
            <Title>Email Address</Title>
            {email ? (
              <Content sx={{ fontSize: 12 }}>{email}</Content>
            ) : (
              <Skeleton />
            )}
          </Box>
          <Box sx={{ width: "50%", marginBottom: 1 }}>
            <Title>Phone Number</Title>
            {phone_number ? (
              <Content sx={{ fontSize: 12 }}>{phone_number}</Content>
            ) : (
              <Skeleton />
            )}
          </Box>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "space-between", marginTop: 2 }}
        >
          <Box>
            <Title>Add an Address</Title>
            <Content sx={{ fontSize: 12 }}>
              Adding an address allows for quicker checkout and approximation of
              delivery times
            </Content>
          </Box>
          <Button
            sx={{ width: 150, padding: "2px !important" }}
            variant="outlined"
            disableElevation
          >
            Add an Address
          </Button>
        </Stack>
      </Cards>
      <Box sx={{ marginTop: 4 }}>
        <Cards Icon={History} title="Purchase History" empty></Cards>
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Cards Icon={Wallet} title="DrugStoc Credit" empty></Cards>
      </Box>
    </AccountLayout>
  );
}

Account.propTypes = {
  email: PropTypes.string.isRequired,
  phone_number: PropTypes.any.isRequired,
};

Account.defaultProps = {
  email: "a.olagunju@drugstoc.com",
  phone_number: "08033619901",
};

const mapsStateToProps = (state) => {
  return {
    email: state.user.user?.email,
    phone_number: state.user.user?.phone,
  };
};

export default connect(mapsStateToProps)(Account);
