import {
  Alert,
  Box,
  Container,
  Grid,
  InputAdornment,
  Link,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import {
  Button,
  Center,
  Content,
  FormGroup,
  Label,
  TextField,
  TextFieldWrapper,
  Title,
} from "../components/elements";
import AuthSideBar from "../components/widgets/auth";
import { login } from "../connect/authentication";

function Login({ onSubmitData, state }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [show, showPassword] = useState(false);

  const onSubmit = (data) => onSubmitData(data);
  const displayPassword = () => showPassword(!show);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={6}
          sx={{
            display: { xs: "none", md: "flex" },
            background: "#f2f6fb !important",
            paddingTop: "56px !important",
          }}
        >
          <AuthSideBar />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            display: { md: "block" },
            paddingTop: "56px !important",
            background: "#ffffff !important",
            height: "100vh",
            position: "relative",
            width: "100%",
          }}
        >
          <Container
            fixed
            sx={{
              padding: {
                xs: "16px !important",
                md: "10px 70px 30px 30px !important",
              },
            }}
          >
            <Content
              display="block"
              gutterBottom
              sx={{ width: "fit-content", marginLeft: "auto" }}
            >
              Don't have an account?{" "}
              <Link
                underline="none"
                sx={{ cursor: "pointer" }}
                href="/register"
              >
                Sign up
              </Link>
            </Content>

            {/* LOGIN CONTENT */}
            <Center>
              <Title variant="h5">Welcome Back to DrugStoc</Title>
              <Content sx={{ width: "75%" }}>
                For the purpose of industry regulation, your details are
                required.
              </Content>

              <Box sx={{ marginTop: "20px", marginBottom: "-20px" }}>
                {state.error !== null
                  ? state.error.map((element, index) => (
                      <Alert severity="error">{element.message}</Alert>
                    ))
                  : null}
              </Box>

              <Controller
                name="email"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please your valid email is required",
                  },
                }}
                render={({ field }) => (
                  <FormGroup {...field} sx={{ marginTop: "40px" }}>
                    <Label error={errors.email && true}>Email address*</Label>
                    <TextField placeholder="Enter email address" />
                    {errors.email && (
                      <Content
                        sx={{
                          marginTop: "8px",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        {errors.email.message}
                      </Content>
                    )}
                  </FormGroup>
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please your valid password is required",
                  },
                }}
                render={({ field }) => (
                  <FormGroup {...field}>
                    <Label error={errors.password && true}>Password*</Label>
                    <TextField
                      error={errors.password && true}
                      endAdornment={
                        <InputAdornment position="end">
                          <Button variant="text" onClick={displayPassword}>
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                      type={show ? "text" : "password"}
                    />
                    {errors.password && (
                      <Content
                        sx={{
                          marginTop: "8px",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        {errors.password.message}
                      </Content>
                    )}
                  </FormGroup>
                )}
              />

              <FormGroup sx={{ marginTop: "10px" }}>
                <Button
                  loading={state.loading}
                  loadingIndicator="Please wait ...."
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                >
                  Login to account
                </Button>
              </FormGroup>

              <Content sx={{ textAlign: "center", fontSize: "13px" }}>
                <Link
                  underline="none"
                  sx={{ cursor: "pointer" }}
                  href="/forgot-password"
                  variant="text"
                >
                  I Forgot My Password
                </Link>
              </Content>
            </Center>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitData: (payload) => dispatch(login(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    state: state.authentication,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
