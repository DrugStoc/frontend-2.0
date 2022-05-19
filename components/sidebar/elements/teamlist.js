import { Chip, FormControlLabel, IconButton, Radio, RadioGroup, Stack, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react'
import PropTypes from "prop-types";
import { Controller, useForm } from 'react-hook-form';
import { Divider, Modal, Button as ActionButton } from 'semantic-ui-react';
import { Button, Content, FormGroup, TextField, Title } from '../../elements';
import { Done, Edit, Info } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';
import { connect } from 'react-redux';
import { deleteTeamRoleConnect, inviteTeamConnect, teamConnect, updateTeamRoleConnect } from '../../../connect/account';

const TeamList = ({ firstName, lastName, role, email, status, getTeamMembers, updateTeamMember, id, deleteTeamMember, date }) => {
    const [open, handleOpen] = useState(false);
    const [deleteOpen, handleDeleteOpen] = useState(false);
    const [loading, handleLoading] = useState(false);
    const {
      control: control2,
      formState: { errors: errors2 },
      handleSubmit: handleSubmit2,
    } = useForm({
      defaultValues: {
        email: email,
        role: role,
      },
    });
  
    const onInvite = (data) => {
        handleOpen(false)
        handleLoading(true)
        updateTeamMember(data, id).then(() => {
            getTeamMembers();
            handleLoading(false);
        });
    };

    const del_member = () => {
        handleDeleteOpen(false)
        handleLoading(true)
        deleteTeamMember(id).then(() => {
            getTeamMembers();
            handleLoading(false);
        })
    }


    return (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <Modal
          open={open}
          dimmer="blurring"
          style={{ width: "40%" }}
          onClose={() => handleOpen(false)}
        >
          <Modal.Header>Update Team Member</Modal.Header>
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
                  <TextField {...field} placeholder="Enter your Business email" disabled />
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
              <ActionButton
                onClick={() => handleOpen(false)}
              >
                Cancel
              </ActionButton>
              <ActionButton
                disabled={loading}
                primary
                onClick={handleSubmit2(onInvite)}
              >
                Update Role
              </ActionButton>
          </Modal.Actions>
        </Modal>
        <Modal
        style={{ width: "30%" }}
          open={deleteOpen}
          dimmer="blurring"
          onClose={() => handleDeleteOpen(false)}
        >
          <Modal.Header>Delete Team Member</Modal.Header>
          <Modal.Content>
            <Content>You are about to remove a member from your team, they will no longer have access to this dashboard. This action cannot be undone.</Content>
          </Modal.Content>
          <Modal.Actions>
              <ActionButton 
                variant="outlined"
                sx={{ width: { xs: "50%", md: "20%" } }}
                onClick={() => handleDeleteOpen(false)}
              >
                Cancel
              </ActionButton>
              <ActionButton 
                disabled={loading}
                negative
                onClick={del_member}
              >
                Remove Member
              </ActionButton>
          </Modal.Actions>
        </Modal>
        <TableCell component="th" scope="row">
          <Title sx={{ textTransform: "capitalize" }}>
            {firstName} {lastName}
          </Title>
          <Content sx={{ fontSize: 12, marginTop: 0, marginBottom: 1 }}>
            {email}
          </Content>
        </TableCell>
        <TableCell align="right">
          <Content
            sx={{
              fontSize: 12,
              marginTop: 0,
              marginBottom: 1,
              textTransform: "capitalize",
            }}
          >
            {role}
          </Content>
        </TableCell>
        <TableCell align="right">
          <Content sx={{ fontSize: 12, marginTop: 0, marginBottom: 1 }}>
            {date}
          </Content>
        </TableCell>
        <TableCell align="right">
          <Chip
            label={status}
            sx={{ textTransform: "capitalize" }}
            icon={status == "pending" ? <Info /> : <Done />}
            color={status == "pending" ? "warning" : "success"}
            //    variant="outlined"
            size="small"
          />
        </TableCell>
        <TableCell align="right">
          {role == "owner" ? null : (
            <Stack justifyContent="flex-end" direction="row" spacing={2}>
              <IconButton color="primary"  onClick={() => handleOpen(!open)} >
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeleteOpen(true)}>
                <Delete />
              </IconButton>
            </Stack>
          )}
        </TableCell>
      </TableRow>
    );
  };
  
  TeamList.propTypes = {
    id: PropTypes.number.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    status: PropTypes.string,
    date: PropTypes.any.isRequired,
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      getTeamMembers: () => dispatch(teamConnect()),
      updateTeamMember: (payload, id) => dispatch(updateTeamRoleConnect(payload, id)),
      deleteTeamMember: (id) => dispatch(deleteTeamRoleConnect(id))
    };
  };

export default connect(null, mapDispatchToProps)(TeamList);