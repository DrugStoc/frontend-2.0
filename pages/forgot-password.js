import React from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import AuthenticationsLayout from "../components/Layouts/auth";
import {
  Button,
  Center,
  Content,
  FormGroup,
  Label,
  TextField,
  Title,
} from "../components/elements";
import { Link } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

function ForgotPassword(props) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const notify = async () => {
    const data = axios.get(
      "http://staging.drugstoc.com/api/v2/account/profile", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token 071bbedc1bc3cc16dbce17baa91321b7597035a1"
          },
      }
    );
    try {
      let resp = await toast.promise(data, {
        pending: "Promise is pending",
        success: "Promise resolved 👌",
        error: "Promise rejected 🤯",
      });
      console.log(resp)
    } catch (error) {
      console.log(error.response);
    }

    // console.log(resp)
  };
  const onSubmit = (data) => notify();
  return (
    <AuthenticationsLayout>
      <Content
        display="block"
        gutterBottom
        sx={{ width: "fit-content", marginLeft: "auto" }}
      >


      </Content>
      <Center>
        <Title variant="h5">Welcome Back to DrugStoc</Title>
        <Content sx={{ width: "75%" }}>
          For the purpose of industry regulation, your details are required.
        </Content>

        <Controller
          name="email"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Email Address: Incorrect email or email doesnt exist ",
            },
          }}
          render={({ field }) => (
            <FormGroup {...field} sx={{ marginTop: "40px" }}>
              <Label error={errors.email && true}>Email address*</Label>
              <TextField
                error={errors.email && true}
                placeholder="Enter email address"
              />
              {errors.email && (
                <Content
                  sx={{ marginTop: "8px", fontSize: "10px", color: "red" }}
                >
                  {errors.email.message}
                </Content>
              )}
            </FormGroup>
          )}

        />

        <FormGroup sx={{ marginTop: "10px" }}>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Reset password
          </Button>
        </FormGroup>

          <Content sx={{ textAlign: "center", fontSize: "13px" }}>
              <Link underline="none" sx={{ cursor: "pointer" }} href="/login">
                  Login
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>|</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Link underline="none" sx={{ cursor: "pointer" }} href="/register">
                 Create Account
              </Link>
          </Content>
      </Center>
    </AuthenticationsLayout>
  );
}

ForgotPassword.propTypes = {};

export default ForgotPassword;
