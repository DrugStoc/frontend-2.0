import { shippingAddressAction } from "../../store/actions/shipping";
import Connect from "../../util/connect";
import { BASE_URL } from "../../util/resolveerror";

const connect = new Connect(BASE_URL)


export const shipping_address = () => connect.get({
    path: "/shipping/shipping-address",
    action: shippingAddressAction
})