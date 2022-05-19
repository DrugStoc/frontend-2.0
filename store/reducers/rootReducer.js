import { combineReducers } from "redux"
import { businessReducer } from "./business";
import { categoryReducer } from "./category";
import { errorhandlerReducer } from "./errorhandlerReducer";
import { ordersReducer } from "./orders";
import { productsReducer } from "./products";
import { userReducer } from "./profile";
import { authenticationReducer } from "./register";
import { shippingAddressReducer } from "./shipping";
import { shoppingReducer } from "./shopping";
import { transactionReducer } from "./transactions";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  errorhandler: errorhandlerReducer,
  user: userReducer,
  business: businessReducer,
  products: productsReducer,
  category: categoryReducer,
  shopping: shoppingReducer,
  transaction: transactionReducer,
  shipping: shippingAddressReducer,
  orders: ordersReducer,
})

export default rootReducer;