import { Box, Container, Grid } from "@mui/material";
import { Content, Title } from "../elements";

export default function AuthSideBar() {
  return (
    <Box>
      <Container fixed sx={{ padding: "0 90px 0px 90px !important" }}>
        <Box
          component="img"
          sx={{
            height: 80,
            width: 160,
            marginBottom: 8,
            display: { xs: "none", sm: "block" },
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="The house from the offer."
          src="/logo.svg"
        />
        <Box sx={{ marginTop: "30px", marginBottom: "30px" }}>
          <Title variant="h6">Strong coverage across Africa</Title>
          <Content sx={{ width: "60%", marginTop: "5px" }}>
            With over 30+ institutions, your business can build better
            experiences with data.
          </Content>
        </Box>
        <Box sx={{ marginTop: "30px", marginBottom: "30px" }}>
          <Title variant="h6">Free 2000 credit to get started</Title>
          <Content sx={{ width: "60%", marginTop: "5px" }}>
            Connect up to 10 live accounts for free when you’re ready to go
            live.
          </Content>
        </Box>
        <Box sx={{ marginTop: "30px", marginBottom: "30px" }}>
          <Title variant="h6">24/7 reliable customer support</Title>
          <Content sx={{ width: "60%", marginTop: "5px" }}>
            Our technical product specialists are always available to help via
            email, zoom, or call.
          </Content>
        </Box>
        <Box sx={{ marginTop: "30px", marginBottom: "30px" }}>
          <Title variant="h6"></Title>
          <Content sx={{ width: "60%", marginTop: "5px" }}>
            Thank you for choosing us. We look forward to being a reliable
            partner to your business.
          </Content>
        </Box>
        <Box sx={{ marginTop: "30px", marginBottom: "30px" }}>
          <Content sx={{ width: "60%", marginTop: "5px" }}>Dr. Chibuzo Opara</Content>
          <Content sx={{ width: "60%" }}>CEO, DrugStoc</Content>
        </Box>
      </Container>
    </Box>
  );
}
