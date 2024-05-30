import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const StyledFormContainer = styled('div')({
  padding: (theme) => theme.spacing(3),
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'black', // Set text color to black
  },
});

const MyProfile = () => {
  // Select user information from Redux store
  const user = useSelector((state) => state.auth.user);

  // Function to display user information
  const renderUserInfo = () => {
    if (!user) {
      return <p>Loading...</p>;
    }

    return (
      <StyledFormContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              My Profile
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={user.firstName}
              readOnly
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={user.lastName}
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              label="Email"
              variant="outlined"
              fullWidth
              value={user.email}
              readOnly
            />
          </Grid>
          <Grid item xs={12}>
            <StyledTextField
              label="Role"
              variant="outlined"
              fullWidth
              value={user.role}
              readOnly
            />
          </Grid>
        </Grid>
      </StyledFormContainer>
    );
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        {renderUserInfo()}
      </Grid>
    </Grid>
  );
};

export default MyProfile;
