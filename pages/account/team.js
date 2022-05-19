import React, { useEffect, useState } from "react";
import { Divider, Modal } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import BusinessLayout from "../../components/Layouts/team";
import {
  Chip,
  Grid,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  Button,
  Content,
  FormGroup,
  TextField,
} from "../../components/elements";
import Cards from "../../components/sidebar/elements/cards";
import { Add } from "@mui/icons-material";
import { inviteTeamConnect, teamConnect } from "../../connect/account";
import { connect } from "react-redux";
import TeamList from "../../components/sidebar/elements/teamlist";
import * as moment from "moment"

function TeamMembers({ teamMembers, getTeamMembers, addTeamMember, handler }) {
  const [open, handleOpen] = useState(false);
  const [loading, handleLoading] = useState(false);
  const {
    control: control2,
    reset,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    defaultValues: {
      email: "",
      role: "viewer",
    },
  });

  const onInvite = (data) => {
    handleOpen(false);
    handleLoading(true);
    addTeamMember(data).then(() => {
      reset({
        email: "",
        role: "viewer",
      });
      getTeamMembers();
      handleLoading(false);
    });
  };

  useEffect(() => {
    getTeamMembers();
  }, []);

  return (
    <BusinessLayout>
      <Modal
        open={open}
        dimmer="blurring"
        style={{ width: "40%" }}
        onClose={() => handleOpen(false)}
      >
        <Modal.Header>Invite Team Member</Modal.Header>
        <Modal.Content>
          <Controller
            name="email"
            control={control2}
            rules={{
              required: {
                value: true,
                message: "Please your Email is required",
              },
            }}
            render={({ field }) => (
              <FormGroup>
                <TextField {...field} placeholder="Enter your Business email" />
                {errors2.email && (
                  <Content
                    sx={{
                      marginTop: "8px",
                      fontSize: "10px",
                      color: "red",
                    }}
                  >
                    {errors2.email.message}
                  </Content>
                )}
              </FormGroup>
            )}
          />
          <Divider />
          <Controller
            name="role"
            control={control2}
            rules={{
              required: {
                value: true,
                message: "Please a Role is required",
              },
            }}
            render={({ field }) => (
              <FormGroup>
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Administrator"
                  />
                  <Content sx={{ width: "50%" }}>
                    Best for business owners and company administrator
                  </Content>
                  <Divider />
                  <FormControlLabel
                    value="editor"
                    control={<Radio />}
                    label="Editor"
                  />
                  <Content sx={{ width: "50%" }}>
                    Best for people making orders in your business
                  </Content>
                  <Divider />
                  <FormControlLabel
                    value="viewer"
                    control={<Radio />}
                    label="Viewer"
                  />
                </RadioGroup>
                <Content sx={{ width: "50%" }}>
                  Best for people who needs to view dashboard but don't need to
                  make any updates
                </Content>
                <Divider />
                {errors2.role && (
                  <Content
                    sx={{
                      marginTop: "8px",
                      fontSize: "10px",
                      color: "red",
                    }}
                  >
                    {errors2.role.message}
                  </Content>
                )}
              </FormGroup>
            )}
          />
        </Modal.Content>
        <Modal.Actions>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Button
              variant="outlined"
              sx={{ width: { xs: "50%", md: "20%" } }}
              onClick={() => handleOpen(false)}
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              loadingIndicator={"Please wait ...."}
              variant="contained"
              sx={{ width: { xs: "50%", md: "20%" } }}
              onClick={handleSubmit2(onInvite)}
            >
              Send Invitation
            </Button>
          </Stack>
        </Modal.Actions>
      </Modal>
      <Stack direction="row" justifyContent="center">
        <Grid item xs={12} md={12}>
          <Cards
            title="Team members"
            action={
              <Chip
                icon={<Add />}
                onClick={() => handleOpen(!open)}
                label="Invite Member"
                color="primary"
              />
            }
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Content sx={{ fontSize: 10, fontWeight: "800" }}>
                      MEMBER
                    </Content>
                  </TableCell>
                  <TableCell align="right">
                    <Content sx={{ fontSize: 10, fontWeight: "800" }}>
                      ROLE
                    </Content>
                  </TableCell>
                  <TableCell align="right">
                    <Content sx={{ fontSize: 10, fontWeight: "800" }}>
                      DATE ADDED
                    </Content>
                  </TableCell>
                  <TableCell align="right">
                    <Content sx={{ fontSize: 10, fontWeight: "800" }}>
                      STATUS
                    </Content>
                  </TableCell>
                  <TableCell align="right">
                    <Content sx={{ fontSize: 10, fontWeight: "800" }}>
                      ACTIONS
                    </Content>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamMembers?.results.map((elements, index) => (
                  <TeamList
                    key={index}
                    id={elements.id}
                    firstName={elements.user.first_name}
                    lastName={elements.user.last_name}
                    email={elements.user.email}
                    role={elements.role}
                    date={moment(elements.created_at).fromNow()}
                    status={elements.status}
                  />
                ))}
              </TableBody>
            </Table>
          </Cards>
        </Grid>
      </Stack>
    </BusinessLayout>
  );
}

const mapStateToProps = (state) => {
  return {
    teamMembers: state.business.team,
    handler: state.errorhandler,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTeamMembers: () => dispatch(teamConnect()),
    addTeamMember: (payload) => dispatch(inviteTeamConnect(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembers);
