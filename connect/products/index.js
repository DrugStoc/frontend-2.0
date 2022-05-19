import { categoryAction, manufacturerAction } from "../../store/actions/category";
import { categoryProductsAction, popularProductsAction, searchProductsAction } from "../../store/actions/products";
import Connect from "../../util/connect";
import { BASE_URL } from "../../util/resolveerror";

const connect = new Connect(BASE_URL)


export const products_popular = () => connect.getWithNoAuthorization({
    path: "/inventory/products",
    action: popularProductsAction
})

export const category_products = (slug) => connect.getWithNoAuthorization({
    path: `/inventory/products/category/${slug}`,
    action: categoryProductsAction
})

export const search_products = (query) => connect.getWithNoAuthorization({
    path: `/search/${query}`,
    action: searchProductsAction
})

export const products_category = () => connect.getWithNoAuthorization({
    path: "/inventory/category/list",
    action: categoryAction
})

export const products_manufacturer = () => connect.getWithNoAuthorization({
    path: "/inventory/manufacturer/all",
    action: manufacturerAction
})

// export const 