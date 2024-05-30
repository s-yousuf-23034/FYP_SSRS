import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useSelector } from "react-redux";


const StyledFormContainer = styled('div')({
  padding: theme => theme.spacing(3),
});

const DeleteAdminForm = () => {
  const token = useSelector(state => state.auth.token); // Retrieve token from Redux store
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      setSuccessMessage('');

      // Set up headers with bearer token
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Assuming the content type is JSON
      };

      if (!email) {
        setError('Email is required');
        setIsSubmitting(false);
        return;
      }

      // Send DELETE request to the API endpoint
      await axios.post('http://localhost:3001/admin/removeUser/', { email },{headers});

      setSuccessMessage('User removed successfully');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || 'An error occurred');
      } else {
        setError('An error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h5" gutterBottom>
          Delete User
        </Typography>
        <StyledFormContainer>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#009688', marginTop: '1rem' }}
            onClick={handleDelete}
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? 'Deleting...' : 'Delete'}
          </Button>
          {successMessage && (
            <Typography variant="body1" style={{ color: 'green', marginTop: '1rem' }}>
              {successMessage}
            </Typography>
          )}
        </StyledFormContainer>
      </Grid>
    </Grid>
  );
};

export default DeleteAdminForm;
