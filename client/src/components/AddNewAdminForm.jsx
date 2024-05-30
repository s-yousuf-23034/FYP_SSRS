import React from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from "react-redux";


const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});

const StyledFormContainer = styled('div')({
  padding: theme => theme.spacing(3),
});

const AddNewAdminForm = () => {

  const token = useSelector(state => state.auth.token); // Retrieve token from Redux store

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = {
        ...values,
        role: 'admin', // Set the role as 'admin'
        organization: '665324eaca894e9d47b96bb6'
      };

      // Set up headers with bearer token
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Assuming the content type is JSON
      };

      //console.log('API is yet to be called');
      
      // Send POST request to the API endpoint
      //await axios.post('http://localhost:3001/admin/createUser', formData);
      await axios.post('http://localhost:3001/admin/createUser', formData, { headers });

      // Handle success
      console.log('Admin created successfully:', formData);
    } catch (error) {
      // Handle error
      console.error('Error creating admin:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h5" gutterBottom>
          Add New Admin
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <StyledFormContainer>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field name="firstName" as={TextField} label="First Name" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="lastName" as={TextField} label="Last Name" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="email" as={TextField} label="Email" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="password" type="password" as={TextField} label="Password" variant="outlined" fullWidth />
                  </Grid>
                </Grid>
              </StyledFormContainer>
              <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#009688' }} disabled={isSubmitting} fullWidth>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AddNewAdminForm;
