import { ordersAction } from "../../store/actions/orders";
import Connect from "../../util/connect";
import { BASE_URL } from "../../util/resolveerror";

const connect = new Connect(BASE_URL)

export const orderList = () => connect.get({
    path: "/shopping/order/sales-order",
    action: ordersAction
})