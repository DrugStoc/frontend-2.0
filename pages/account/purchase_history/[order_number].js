import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Tab,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TableBody,
  Button,
  Chip,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Content, Title } from "../../../components/elements";
import AccountLayout from "../../../components/Layouts/account";
import { orderList } from "../../../connect/order";
import { priceFormatDecimal } from "../../../util/priceFormatter";

function PurchaseHistory(props) {
  useEffect(() => {
    props.getOrders();
  }, []);

  return (
    <AccountLayout>
      <Title variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
        Purchase History Detail
      </Title>
      <Content>Let’s get you started with DrugStoc</Content>
      <Box sx={{ marginTop: 5 }}>
      <TableContainer>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody> */}
      </Table>
    </TableContainer>
      </Box>
    </AccountLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    transactions: state.orders.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: () => dispatch(orderList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseHistory);
