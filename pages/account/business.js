import { Add, Done, Info } from "@mui/icons-material";
import {
  Box,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Divider, Modal, Button as ActionButton } from "semantic-ui-react";
import {
  Button,
  Content,
  FormGroup,
  Label,
  SelectField,
  TextField,
  Title,
} from "../../components/elements";
import { More, User } from "../../components/icons";
import BusinessLayout from "../../components/Layouts/team";
import BusinessLoader from "../../components/loaders/businessLoader";
import Cards from "../../components/sidebar/elements/cards";
import { businessConnect, updateBusinessConnect } from "../../connect/account";
import {
  business_category,
  business_location,
  discovery,
} from "../../data/categories";
import { destroy_business_memory_leaks } from "../../connect/account/business";


function BusinessPage({
  businessData,
  getBusiness,
  handler,
  updateBusiness,
  manage_memory_leaks,
}) {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      phone: "",
      about: "",
      address: "",
      category: "",
      location: "",
    },
  });

  useEffect(() => {
      getBusiness();
    // return () => manage_memory_leaks();
  }, [getBusiness]);

  useEffect(() => {
    if (businessData) {
      reset({
        name: businessData.name,
        email: businessData.email,
        phone: businessData.phone,
        about: businessData.about,
        address: businessData.address,
        category: businessData.category,
        location: businessData.location,
      });
    }
  }, [businessData]);

  const [loading, setLoading] = useState(false);
  

  const onSubmit = (data) => {
    setLoading(true);
    updateBusiness(data).then(() => setLoading(false));
  };

  
  return (
    <BusinessLayout>
      {!handler.loading ? (
        <Box>
          <Stack direction="row" justifyContent="center">
            <Grid item xs={12} md={12}>
              <Box sx={{marginBottom: 10}}>
              <Cards title="Business Information">
                <Stack direction="row" spacing={3}>
                <FormGroup>
                  <Label>Business Name*</Label>
                  <TextField
                    placeholder="Enter your Business name"
                    value={businessData ? businessData.name : ""}
                    disabled
                  />
                </FormGroup>

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
                      <Label>Support Email*</Label>
                      <TextField
                        {...field}
                        placeholder="Enter your Business email"
                      />
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
                      message: "Please your Support Phone number is required",
                    },
                  }}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>Support Phone Number*</Label>
                      <TextField
                        {...field}
                        placeholder="Enter your Business email"
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
                </Stack>


                <Controller
                  name="about"
                  control={control}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>About Business*</Label>
                      <TextField
                        {...field}
                        multiline
                        minRows={8}
                        maxRows={12}
                        placeholder="Write about your business"
                      />
                      {errors.about && (
                        <Content
                          sx={{
                            marginTop: "8px",
                            fontSize: "10px",
                            color: "red",
                          }}
                        >
                          {errors.about.message}
                        </Content>
                      )}
                    </FormGroup>
                  )}
                />

                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>Address*</Label>
                      <TextField
                        {...field}
                        placeholder="Enter your Business Address"
                      />
                      {errors.address && (
                        <Content
                          sx={{
                            marginTop: "8px",
                            fontSize: "10px",
                            color: "red",
                          }}
                        >
                          {errors.address.message}
                        </Content>
                      )}
                    </FormGroup>
                  )}
                />
              
                <Stack direction="row" spacing={3}>

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
                        value={
                          field.value || "Select your Business category" || ""
                        }
                        defaultValue="Select your Business category"
                        input={<TextField />}
                        variant="standard"
                        inputProps={{
                          id: "uncontrolled-native",
                        }}
                      >
                        <MenuItem
                          disabled
                          value="Select your Business category"
                        >
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
                        value={
                          field.value || "Select your Business location" || ""
                        }
                        defaultValue="Select your Business location"
                        input={<TextField />}
                        variant="standard"
                        inputProps={{
                          id: "uncontrolled-native",
                        }}
                      >
                        <MenuItem
                          disabled
                          value="Select your Business location"
                        >
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

                </Stack>


                <FormGroup sx={{ marginTop: "10px" }}>
                  <Button
                    loading={loading}
                    loadingIndicator="Please wait ...."
                    variant="contained"
                    sx={{ width: { xs: "100%", md: "30%" } }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Update
                  </Button>
                </FormGroup>
              </Cards>
              </Box>
            </Grid>
          </Stack>
        </Box>
      ) : (
        <BusinessLoader />
      )}
    </BusinessLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    businessData: state.business.business,
    updatedFields: state.business.data,
    handler: state.errorhandler,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBusiness: () => dispatch(businessConnect()),
    updateBusiness: (payload) => dispatch(updateBusinessConnect(payload)),
    manage_memory_leaks: () => dispatch(destroy_business_memory_leaks()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BusinessPage);
