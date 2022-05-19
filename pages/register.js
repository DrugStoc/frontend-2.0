import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  Button as DefaultButton,
  Select,
  MenuItem,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Center,
  Content,
  FormGroup,
  Label,
  SelectField,
  TextField,
  TextFieldWrapper,
  Title,
} from "../components/elements";
import AuthSideBar from "../components/widgets/auth";
import { Icon } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import {
  business_category,
  business_location,
  discovery,
} from "../data/categories";
import { register } from "../connect/authentication";
import { connect } from "react-redux";

function Register({ onSubmitData, state }) {
  const [step, setStep] = useState(0);
  const [show, showPassword] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      ref_code: "",
    },
  });

  function goBack() {
    let nav = step - 1;
    setStep(nav);
  }

  const displayPassword = () => showPassword(!show);
  const nextStep = () => setStep(1);
  const onSubmit = (data) => onSubmitData(data);

  const errorDetector = (type, formState) => {
    let hasError = false;
    let message = "";
    if (formState) {
      hasError = true;
      message = formState.message;
    }
    let errData = state.error.filter((e) => type === e.type);
    if (errData.length > 0) {
      hasError = true;
      message = errData[0].message;
    }
    return {
      hasError,
      message,
    };
  };

  //____________header for steppers_________//
  const Stepper = () => {
    switch (step) {
      case 0:
        return (
          <Content
            display="block"
            gutterBottom
            sx={{ width: "fit-content", marginLeft: "auto" }}
          >
            Already have an account?{" "}
            <Link underline="none" sx={{ cursor: "pointer" }} href="/login">
              Sign in
            </Link>
          </Content>
        );
      case 1:
        return (
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between" }}
            spacing={2}
          >
            <DefaultButton
              variant="text"
              onClick={goBack}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </DefaultButton>
            <Box>
              <Content
                sx={{ fontSize: 12, fontWeight: "300", textAlign: "right" }}
              >
                STEP 02/02
              </Content>
              <Content>Business Info.</Content>
            </Box>
          </Stack>
        );
      default:
        return (
          <Content
            display="block"
            gutterBottom
            sx={{ width: "fit-content", marginLeft: "auto" }}
          >
            Already have an account?{" "}
            <Link underline="none" sx={{ cursor: "pointer" }} href="/login">
              Sign in
            </Link>
          </Content>
        );
    }
  };

  //__________forms to fille on each steps__________//
  const StepperForm = () => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ marginTop: "40px" }}>
            <Stack direction="row" spacing={2}>
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
                    <Label error={errors.first_name && true}>First Name*</Label>
                    <TextField
                      {...field}
                      error={errors.first_name && true}
                      placeholder="Enter your first name"
                    />
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
                    <Label error={errors.last_name && true}>Last Name*</Label>
                    <TextField
                      {...field}
                      error={errors.last_name && true}
                      placeholder="Enter your last name"
                    />
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
                  <Label
                    error={
                      errorDetector("email", errors.email).hasError && true
                    }
                  >
                    Email*
                  </Label>
                  <TextField
                    {...field}
                    error={
                      errorDetector("email", errors.email).hasError && true
                    }
                    placeholder="Enter email Address"
                  />
                  {errorDetector("email", errors.email).hasError && (
                    <Content
                      sx={{
                        marginTop: "8px",
                        fontSize: "10px",
                        color: "red",
                      }}
                    >
                      {errorDetector("email", errors.email).message}
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
                  <Label error={errors.phone && true}>Phone number*</Label>
                  <TextField
                    {...field}
                    error={errors.phone && true}
                    placeholder="Enter your phone number"
                  />
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
              <Button variant="contained" onClick={handleSubmit(nextStep)}>
                Continue
              </Button>
            </FormGroup>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ marginTop: "40px" }}>
            <Controller
              name="business_name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please your Business name is required",
                },
              }}
              render={({ field }) => (
                <FormGroup>
                  <Label
                    error={
                      errorDetector("business_name", errors.business_name)
                        .hasError && true
                    }
                  >
                    Business Name*
                  </Label>
                  <TextField
                    {...field}
                    error={
                      errorDetector("business_name", errors.business_name)
                        .hasError && true
                    }
                    value={field.value || ""}
                    placeholder="Enter your business name"
                  />
                  {errorDetector("business_name", errors.business_name)
                    .hasError && (
                    <Content
                      sx={{
                        marginTop: "8px",
                        fontSize: "10px",
                        color: "red",
                      }}
                    >
                      {
                        errorDetector("business_name", errors.business_name)
                          .message
                      }
                    </Content>
                  )}
                </FormGroup>
              )}
            />

            <Controller
              name="category"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please your Business Category is required",
                },
              }}
              render={({ field }) => (
                <FormGroup>
                  <Label error={errors.category && true}>
                    Business Category*
                  </Label>
                  <SelectField
                    {...field}
                    error={errors.category && true}
                    value={field.value || "Select your Business category" || ""}
                    defaultValue="Select your Business category"
                    input={<TextField />}
                    variant="standard"
                    inputProps={{
                      id: "uncontrolled-native",
                    }}
                  >
                    <MenuItem disabled value="Select your Business category">
                      <div style={{ color: "grey" }}>
                        Select your Business category
                      </div>
                    </MenuItem>
                    {business_category.map((name) => (
                      <MenuItem
                        key={name.key}
                        value={name.value}
                        // style={getStyles(name, personName, theme)}
                      >
                        {name.text}
                      </MenuItem>
                    ))}
                  </SelectField>
                  {errors.category && (
                    <Content
                      sx={{
                        marginTop: "8px",
                        fontSize: "10px",
                        color: "red",
                      }}
                    >
                      {errors.category.message}
                    </Content>
                  )}
                </FormGroup>
              )}
            />

            <Controller
              name="location"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please your Business Location is required",
                },
              }}
              render={({ field }) => (
                <FormGroup>
                  <Label error={errors.location && true}>
                    Business Location*
                  </Label>
                  <SelectField
                    {...field}
                    error={errors.location && true}
                    value={field.value || "Select your Business location" || ""}
                    defaultValue="Select your Business location"
                    input={<TextField />}
                    variant="standard"
                    inputProps={{
                      id: "uncontrolled-native",
                    }}
                  >
                    <MenuItem disabled value="Select your Business location">
                      <div style={{ color: "grey" }}>
                        Select your Business location
                      </div>
                    </MenuItem>
                    {business_location.map((name) => (
                      <MenuItem
                        key={name.key}
                        value={name.value}
                        // style={getStyles(name, personName, theme)}
                      >
                        {name.text}
                      </MenuItem>
                    ))}
                  </SelectField>
                  {errors.location && (
                    <Content
                      sx={{
                        marginTop: "8px",
                        fontSize: "10px",
                        color: "red",
                      }}
                    >
                      {errors.location.message}
                    </Content>
                  )}
                </FormGroup>
              )}
            />

            <Controller
              name="discovery"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please how did you hear about us",
                },
              }}
              render={({ field }) => (
                <FormGroup>
                  <Label error={errors.discovery && true}>
                    How did you hear about us*
                  </Label>
                  <SelectField
                    {...field}
                    error={errors.discovery && true}
                    value={
                      field.value || "Select how did you hear about us" || ""
                    }
                    defaultValue="Select how did you hear about us"
                    input={<TextField />}
                    variant="standard"
                    inputProps={{
                      id: "uncontrolled-native",
                    }}
                  >
                    <MenuItem disabled value="Select how did you hear about us">
                      <div style={{ color: "grey" }}>
                        Select how did you hear about us
                      </div>
                    </MenuItem>
                    {discovery.map((name) => (
                      <MenuItem key={name.key} value={name.value}>
                        {name.text}
                      </MenuItem>
                    ))}
                  </SelectField>
                  {errors.discovery && (
                    <Content
                      sx={{
                        marginTop: "8px",
                        fontSize: "10px",
                        color: "red",
                      }}
                    >
                      {errors.discovery.message}
                    </Content>
                  )}
                </FormGroup>
              )}
            />
            <Controller
              name="ref_code"
              control={control}
              rules={{
                required: false,
              }}
              render={({ field }) => (
                <FormGroup>
                  <Label>Referral Code(Optional)</Label>
                  <TextField
                    {...field}
                    placeholder="Enter referral code of who referred you"
                  />
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
                Continue
              </Button>
            </FormGroup>
          </Box>
        );
      default:
        return null;
    }
  };

  //____________steppers heading___________//
  const StepperTitle = () => {
    switch (step) {
      case 0:
        return <Title variant="h5">Join Us!</Title>;
      case 1:
        return <Title variant="h5">Complete Your Business Information!</Title>;
      default:
        return null;
    }
  };

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
            <Stepper />
            <Center>
              <StepperTitle />
              <Content sx={{ width: "75%" }}>
                For the purpose of industry regulation, your details are
                required.
              </Content>
              <Box sx={{ marginTop: "20px", marginBottom: "-20px" }}>
                <ul>
                  {state.error !== null
                    ? state.error.map((element, index) => (
                        <li>
                          <Content
                            key={index}
                            sx={{ color: "red", fontSize: 12 }}
                          >
                            {element.message}
                          </Content>
                        </li>
                      ))
                    : null}
                </ul>
              </Box>
              <StepperForm />
            </Center>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitData: (payload) => dispatch(register(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    state: state.authentication,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
