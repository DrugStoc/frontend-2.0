import { Box, Grid } from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import {
  Button,
  Content,
  FormGroup,
  Label,
  TextField,
  Title,
} from "../../components/elements";
import AccountLayout from "../../components/Layouts/account";
import Cards from "../../components/sidebar/elements/cards";
import { change_password } from "../../connect/authentication";

function ChangePassword({ updatePassword }) {
  const [loading, setLoading] = useState(false);
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      old_password: "",
      new_password: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    updatePassword(data).then(() => {
      reset({
        old_password: "",
        new_password: "",
        c_password: "",
      }),
        setLoading(false);
    });
  };

  return (
    <AccountLayout>
      <Box sx={{ marginBottom: 5 }}>
        <Title variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
          Change Password
        </Title>
        <Content>Let’s get you started with DrugStoc</Content>
      </Box>
      <Box>
        <Grid item xs={12} md={9}>
          <Cards title="Update your password">
            <Box sx={{ marginTop: 4 }}>
              <Controller
                name="old_password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please your Old password is required",
                  },
                }}
                render={({ field }) => (
                  <FormGroup>
                    <Label>Current Password*</Label>
                    <TextField
                      {...field}
                      type="password"
                      placeholder="Enter your current password"
                    />
                    {errors.old_password && (
                      <Content
                        sx={{
                          marginTop: "8px",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        {errors.old_password.message}
                      </Content>
                    )}
                  </FormGroup>
                )}
              />
              <Controller
                name="new_password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please your New password is required",
                  },
                }}
                render={({ field }) => (
                  <FormGroup>
                    <Label>New Password*</Label>
                    <TextField
                      {...field}
                      type="password"
                      placeholder="Enter your new password"
                    />
                    {errors.new_password && (
                      <Content
                        sx={{
                          marginTop: "8px",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        {errors.new_password.message}
                      </Content>
                    )}
                  </FormGroup>
                )}
              />
              <Controller
                name="c_password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please confirm your new password",
                  },
                }}
                render={({ field }) => (
                  <FormGroup>
                    <Label>Confirm Password*</Label>
                    <TextField
                      {...field}
                      type="password"
                      placeholder="Enter your confirm new password"
                    />
                    {errors.c_password && (
                      <Content
                        sx={{
                          marginTop: "8px",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        {errors.c_password.message}
                      </Content>
                    )}
                  </FormGroup>
                )}
              />
              <FormGroup sx={{ marginTop: "10px" }}>
                <Button
                  loading={loading}
                  loadingIndicator="Please wait ...."
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                  sx={{ width: { xs: "100%", md: "30%" } }}
                >
                  Update
                </Button>
              </FormGroup>
            </Box>
          </Cards>
        </Grid>
      </Box>
    </AccountLayout>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (payload) => dispatch(change_password(payload)),
  };
};

export default connect(null, mapDispatchToProps)(ChangePassword);
