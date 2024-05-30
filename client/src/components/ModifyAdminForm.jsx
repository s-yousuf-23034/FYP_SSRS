import React from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from "react-redux";

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  firstName: Yup.string(),
  lastName: Yup.string(),
  password: Yup.string().min(8, 'Password must be at least 8 characters'),
});

const StyledFormContainer = styled('div')({
  padding: theme => theme.spacing(3),
});

const ModifyUserForm = () => {

  const token = useSelector(state => state.auth.token); // Retrieve token from Redux store

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = {
        ...values,
      };

      // Set up headers with bearer token
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Assuming the content type is JSON
      };

      // Send POST request to the API endpoint
      await axios.patch('http://localhost:3001/admin/modifyUser', formData, { headers });

      // Handle success
      console.log('User modified successfully:', formData);
    } catch (error) {
      // Handle error
      console.error('Error modifying user:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h5" gutterBottom>
          Modify User
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <StyledFormContainer>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="email" as={TextField} label="Email" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="firstName" as={TextField} label="First Name" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="lastName" as={TextField} label="Last Name" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="password" type="password" as={TextField} label="Password" variant="outlined" fullWidth />
                  </Grid>
                </Grid>
              </StyledFormContainer>
              <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#009688' }} disabled={isSubmitting} fullWidth>
                {isSubmitting ? 'Modifying...' : 'Modify User'}
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default ModifyUserForm;
