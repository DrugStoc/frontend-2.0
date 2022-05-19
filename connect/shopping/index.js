import { cartItemAction } from "../../store/actions/shopping";
import Connect from "../../util/connect";
import { BASE_URL } from "../../util/resolveerror";


const connector = new Connect(BASE_URL)

export const addToCart = data => connector.post({
    path: "/shopping/cart/cart-item",
    payload: data,
})

export const getCartItems = () => connector.get({
    path: "/shopping/cart/cart-item",
    action: cartItemAction
})

export const updateCartItem = (data, id) => connector.patch({
    path:`/shopping/cart/cart-item/${id}`,
    payload: data
})

export const deleteCartItem = (id) => connector.delete({
    path:`/shopping/cart/cart-item/${id}`
})