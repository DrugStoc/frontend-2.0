import { balanceAction, transactionsAction } from "../../store/actions/transactions";
import Connect from "../../util/connect";
import { BASE_URL } from "../../util/resolveerror";

const connector = new Connect(BASE_URL)


export const accountBalance = () => connector.get({
    path: "/drugstocpay/wallet/account",
    action: balanceAction
})

export const accountTransactions = (wallet) => connector.get({
    path: `/drugstocpay/transaction/${wallet}`,
    action: transactionsAction
})