import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { accountTransactions } from "../../connect/transactions";
import { connect } from "react-redux";
import {
  Avatar,
  Chip,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { priceFormatDecimal } from "../../util/priceFormatter";
import { Content, Title } from "../elements";
import moment from "moment";
import { Done, Info } from "@mui/icons-material";

function Transaction(props) {
  useEffect(() => {
    props.fetchTransaction(props.wallet);
  }, []);

  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Content sx={{ fontSize: 10, fontWeight: "800" }}>
                PAYMENT
              </Content>
            </TableCell>
            <TableCell align="right">
              <Content sx={{ fontSize: 10, fontWeight: "800" }}>
                TRANSACTION ID
              </Content>
            </TableCell>
            <TableCell align="right">
              <Content sx={{ fontSize: 10, fontWeight: "800" }}>AMOUNT</Content>
            </TableCell>
            <TableCell align="right">
              <Content sx={{ fontSize: 10, fontWeight: "800" }}>STATUS</Content>
            </TableCell>
            <TableCell align="right">
              <Content sx={{ fontSize: 10, fontWeight: "800" }}>DATE</Content>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.transactionList.results.map((element, index) => (
            <TableRow
            key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Content sx={{ textTransform: "capitalize" }}>
                  {element.remark}
                </Content>
              </TableCell>
              <TableCell align="right">
                <Content
                  sx={{
                    fontSize: 12,
                    marginTop: 0,
                    marginBottom: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {element.transaction_id}
                </Content>
              </TableCell>
              <TableCell align="right">
                <Title
                  color={
                    element.transaction_type == "debit" ? "error" : "green"
                  }
                  sx={{ fontSize: 12 }}
                >
                  {priceFormatDecimal(element.amount)}
                </Title>
              </TableCell>
              <TableCell align="right">
                <Chip
                  label={element.status}
                  sx={{ textTransform: "capitalize" }}
                  color={element.status == "pending" ? "warning" : "success"}
                  //  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Content
                  sx={{
                    fontSize: 12,
                    marginTop: 0,
                    marginBottom: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {moment(element.created_at).fromNow()}
                </Content>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

Transaction.propTypes = {
  wallet: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    transactionList: state.transaction.transaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTransaction: (wallet) => dispatch(accountTransactions(wallet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
