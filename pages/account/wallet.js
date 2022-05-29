import { Box, Button, Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Content,
  FormGroup,
  TextField,
  Title,
} from "../../components/elements";
import AccountLayout from "../../components/Layouts/account";
import Transaction from "../../components/transaction";
import { accountBalance } from "../../connect/transactions";
import { priceFormatDecimal } from "../../util/priceFormatter";
import { usePaystackPayment } from "react-paystack";
import { Modal } from "semantic-ui-react";
import { Controller } from "react-hook-form";

function Wallet(props) {
  const [amount, setAmount] = useState(null);
  const [open, handleOpen] = useState(false);
  const config = {
    reference: new Date().getTime(),
    email: props.user.email,
    amount: amount * 100,
    publicKey: "pk_test_8a2e5d201a6f531fe5bfd027dfcfa1e37385114d",
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = (e) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  useEffect(() => {
    props.getWalletBalance();
  }, []);

  const initializePayment = usePaystackPayment(config);

  return (
    <AccountLayout>
      <Title variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
        DrugStocPay
      </Title>
      <Content>Let’s get you started with DrugStoc</Content>
      <Modal
        open={open}
        dimmer="blurring"
        style={{ width: "40%" }}
        onClose={() => handleOpen(false)}
      >
        <Modal.Header>Fund My Wallet</Modal.Header>
        <Modal.Content>
          <FormGroup>
            <TextField
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
          </FormGroup>
          <Divider />
        </Modal.Content>
        <Modal.Actions>
          <Stack
            spacing={2}
            height={35}
            direction="row"
            justifyContent="flex-end"
          >
            <Button
              variant="outlined"
              sx={{ width: { xs: "50%", md: "20%" } }}
              onClick={() => handleOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disableElevation
              disabled={amount == null}
              variant="contained"
              sx={{ width: { xs: "50%", md: "30%" } }}
              onClick={() => {
                initializePayment(onSuccess, onClose);
                setAmount(null);
                handleOpen(false);
              }}
            >
              Fund Account
            </Button>
          </Stack>
        </Modal.Actions>
      </Modal>
      <Box sx={{ marginTop: 5 }}>
        <Stack direction="row" spacing={3} justifyContent="space-between">
          <div>
            <Title variant="h5">Wallet Balance</Title>
            {props.userWallet.results.length > 0  ? <Title variant="h4">
              {priceFormatDecimal(props.userWallet.results[0].balance)}
            </Title>: null}
            { props.userWallet.results.length > 0 ? <Stack direction="row" spacing={3} sx={{ marginTop: 1 }}>
              <Content variant="h6">
                Available Balance:{" "}
                {priceFormatDecimal(props.userWallet.results[0].balance)}
              </Content>
              <Content variant="h6">
                Legal Balance: {priceFormatDecimal(0)}
              </Content>
            </Stack> : null}
          </div>
          <Stack direction="row" spacing={3} height={35}>
            <Button
              disableElevation
              variant="contained"
              onClick={() => handleOpen(true)}
            >
              Fund Wallet
            </Button>
            <Button disableElevation color="secondary" variant="contained">
              Request for Loan
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ marginTop: 2, marginBottom: 4 }} />
        {props.userWallet.results.length > 0  ? (
          <Transaction wallet={props.userWallet.results[0].id} />
        ) : (
          <Content>Loading.....</Content>
        )}
      </Box>
    </AccountLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    userWallet: state.transaction.wallet,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWalletBalance: () => dispatch(accountBalance()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
