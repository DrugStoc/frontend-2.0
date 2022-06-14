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
  TableFooter,
  TablePagination,
  Button,
  Chip,
  Grid,Divider,
  Paper,
  boxDefault
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Content, Title } from "../../../components/elements";
import AccountLayout from "../../../components/Layouts/account";
import { orderList } from "../../../connect/order";
import { useRouter } from "next/router"
import { priceFormatDecimal } from "../../../util/priceFormatter";
import { jsPDF } from "jspdf";



function PurchaseHistory(props) {
  useEffect(() => {
    props.getOrders();
  }, []);
  const router = useRouter()
  const { num } = router.query
    const doc = new jsPDF();
    const subTotal = props.transactions.results.reduce((acc, product) => {

           return product.total_amount;

    }, 0);

    let accountLayout = <><AccountLayout>
        <Title variant="h4" sx={{paddingTop: 1, paddingBottom: 1}}>
            Purchase History Detail
        </Title>
        <Content>Let’s get you started with DrugStoc</Content>

        <Grid container justify="right" sx={{paddingTop: 0, paddingBottom: 0,paddingLeft: 80}}>
            <Button variant="contained" type="submit">Print Invoice</Button>
        </Grid>
        <Box sx={{marginTop: 5}}>
            <TableContainer >
            {props.transactions.results.map((rows, index) => (
                <Box><Content>{rows.shipping_address.first_name }
                      {rows.shipping_address.last_name},</Content>
                <Content >{rows.shipping_address.address_line1},</Content>
                <Content>{rows.shipping_address.address_line2},</Content>
                <Content>{rows.shipping_address.region},</Content>
                <Content>{rows.shipping_address.phone_number1}</Content>
                </Box>
            )) }

                <Table sx={{minWidth: 700}} aria-label="spanning table">
                    <TableHead>
                        <TableRow>

                            <TableCell>Product Name</TableCell>
                            <TableCell>Product Desc</TableCell>
                            <TableCell align="right">Qty.</TableCell>
                            <TableCell align="right">Cost</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {props.transactions.results.map((rows, index) => {
                            if(rows.id == num) {

                                return (

                                rows.items.map((row) => (

                                        <TableRow key={row.desc}>
                                            <TableCell>{row.product.name}</TableCell>
                                            <TableCell>{row.product.desc}</TableCell>
                                            <TableCell>{row.quantity}</TableCell>
                                            <TableCell>{priceFormatDecimal(row.unit_price * row.quantity)}</TableCell>
                                        </TableRow>


                                    )));

                            }
                            }
                        )}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{priceFormatDecimal(subTotal)}</TableCell>
                        </TableRow>,
                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>,
                        <TableRow>
                            <TableCell>Total</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">{priceFormatDecimal(subTotal)}</TableCell>
                        </TableRow>,

                    </TableBody>


                </Table>
            </TableContainer>
        </Box>
    </AccountLayout></>;
    return accountLayout;

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
