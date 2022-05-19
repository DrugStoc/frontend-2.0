import { Box } from "@mui/material";
import { Content, Title } from "../../components/elements";
import AccountLayout from "../../components/Layouts/account";

function PurchaseHistory() {
  return (
    <AccountLayout>
      <Title variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
        Bulk Order
      </Title>
      <Content>Let’s get you started with DrugStoc</Content>
      <Box sx={{ marginTop: 5 }}></Box>
    </AccountLayout>
  );
}

export default PurchaseHistory;
