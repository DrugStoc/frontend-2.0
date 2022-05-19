import { Box, Grid, Paper, Stack } from "@mui/material";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
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
import { update_profile } from "../../connect/authentication";
import { useState } from "react";

function PersonalInfo({ user, updateUserProfile }) {

  const [loading, setLoading] = useState(false)

  const onSubmit = (data) => {
    setLoading(true)
    updateUserProfile(data).then(resp => setLoading(false));

  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
    },
  });

  return (
    <AccountLayout>
      <Box sx={{ marginBottom: 5 }}>
        <Title variant="h4" sx={{ paddingTop: 1, paddingBottom: 1 }}>
          Personal Info
        </Title>
        <Content>Let’s get you started with DrugStoc</Content>
      </Box>
      <Box>
        <Grid item xs={12} md={9}>
          <Cards title="Update personal details">
            <Stack direction="row" spacing={2} sx={{ marginTop: 4 }}>
              <Controller
                name="first_name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please your First Name is required",
                  },
                }}
                render={({ field }) => (
                  <FormGroup>
                    <Label>First Name*</Label>
                    <TextField {...field} placeholder="Enter your first name" />
                    {errors.first_name && (
                      <Content
                        sx={{
                          marginTop: "8px",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        {errors.first_name.message}
                      </Content>
                    )}
                  </FormGroup>
                )}
              />

              <Controller
                name="last_name"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please your Last Name is required",
                  },
                }}
                render={({ field }) => (
                  <FormGroup>
                    <Label>Last Name*</Label>
                    <TextField {...field} placeholder="Enter your last name" />
                    {errors.last_name && (
                      <Content
                        sx={{
                          marginTop: "8px",
                          fontSize: "10px",
                          color: "red",
                        }}
                      >
                        {errors.last_name.message}
                      </Content>
                    )}
                  </FormGroup>
                )}
              />
            </Stack>
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please your Email is required",
                },
              }}
              render={({ field }) => (
                <FormGroup>
                  <Label>Email*</Label>
                  <TextField {...field} placeholder="Enter email Address" disabled />
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
              name="phone"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please your Email is required",
                },
              }}
              render={({ field }) => (
                <FormGroup>
                  <Label>Phone number*</Label>
                  <TextField {...field} placeholder="Enter your phone number" />
                  {errors.phone && (
                    <Content
                      sx={{
                        marginTop: "8px",
                        fontSize: "10px",
                        color: "red",
                      }}
                    >
                      {errors.phone.message}
                    </Content>
                  )}
                </FormGroup>
              )}
            />

            <FormGroup>
              <Label>Referral Code</Label>
              <TextField
                placeholder="Enter your phone number"
                disabled
                value={user.referral_code}
              />
            </FormGroup>
            <FormGroup sx={{ marginTop: "10px" }}>
              <Button
                loading={loading}
                loadingIndicator="Please wait ...."
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                sx={{ width: { xs: "100%", md: "30%" } }}
              >
                Save
              </Button>
            </FormGroup>
          </Cards>
        </Grid>
      </Box>
    </AccountLayout>
  );
}

const mapsStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserProfile: (payload) => dispatch(update_profile(payload))
  }
}

export default connect(mapsStateToProps, mapDispatchToProps)(PersonalInfo);
