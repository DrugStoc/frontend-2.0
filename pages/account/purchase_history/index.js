import {TabContext, TabList, TabPanel} from "@mui/lab";
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
import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Content, Title} from "../../../components/elements";
import AccountLayout from "../../../components/Layouts/account";
import {orderList} from "../../../connect/order";
import {priceFormatDecimal} from "../../../util/priceFormatter";
import Link from 'next/link';
import {useRouter} from 'next/router'

function PurchaseHistory(props) {
    useEffect(() => {
        props.getOrders();
    }, []);

    return (
        <AccountLayout>
            <Title variant="h4" sx={{paddingTop: 1, paddingBottom: 1}}>
                Purchase History
            </Title>
            <Content>Let’s get you started with DrugStoc</Content>
            <Box sx={{marginTop: 5}}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Content sx={{fontSize: 12, fontWeight: "800"}}>
                                        ORDER ID
                                    </Content>
                                </TableCell>
                                <TableCell align="right">
                                    <Content sx={{fontSize: 12, fontWeight: "800"}}>
                                        NUMBER OF ITEMS
                                    </Content>
                                </TableCell>
                                <TableCell align="right">
                                    <Content sx={{fontSize: 12, fontWeight: "800"}}>
                                        STATUS
                                    </Content>
                                </TableCell>
                                <TableCell align="right">
                                    <Content sx={{fontSize: 12, fontWeight: "800"}}>
                                        TOTAL AMOUNT
                                    </Content>
                                </TableCell>
                                <TableCell align="right">
                                    <Content sx={{fontSize: 12, fontWeight: "800"}}>
                                        DATE
                                    </Content>
                                </TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        {props.transactions ? (
                            <TableBody>
                                {props.transactions.results.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            <Content
                                                sx={{
                                                    fontSize: 12,
                                                    marginTop: 0,
                                                    marginBottom: 1,
                                                    fontWeight: "800",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                <Link
                                                    href={{
                                                        pathname: 'purchase_history/' + row.id,
                                                        query: {
                                                            num: row.id,
                                                        },
                                                    }}
                                                >
                                                    {row.order_no}
                                                </Link>
                                            </Content>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Content>{row.items.length}</Content>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Chip
                                                label={row.status}
                                                sx={{textTransform: "capitalize"}}
                                                color={row.status == "pending" ? "warning" : "success"}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Title sx={{fontSize: 14}}>
                                                {priceFormatDecimal(row.total_amount)}

                                            </Title>
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
                                                {moment(row.created_at).fromNow()}
                                            </Content>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button disableElevation variant="contained">
                                                Reorder
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        ) : null}
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
