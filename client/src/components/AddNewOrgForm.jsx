import React from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from "react-redux";

const initialValues = {
  name: '',
  industry: '',
  address: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
  phoneNumber: '',
  email: '',
  website: '',
  contactPerson: '',
  contactPersonTitle: '',
  additionalNotes: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Organization Name is required'),
  industry: Yup.string().required('Industry is required'),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  postalCode: Yup.string().required('Postal Code is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  website: Yup.string().url('Invalid URL'),
  contactPerson: Yup.string().required('Contact Person is required'),
  contactPersonTitle: Yup.string(),
  additionalNotes: Yup.string(),
});

const StyledFormContainer = styled('div')({
  padding: theme => theme.spacing(3),
});

const AddNewOrganizationForm = () => {
  const token = useSelector(state => state.auth.token); // Retrieve token from Redux store

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Set up headers with bearer token
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Assuming the content type is JSON
      };

      // Send POST request to the API endpoint
      await axios.post('http://localhost:3001/admin/addOrganization', values, { headers });

      // Handle success
      console.log('Organization created successfully:', values);
    } catch (error) {
      // Handle error
      console.error('Error creating organization:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h5" gutterBottom>
          Add New Organization
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <StyledFormContainer>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="name" as={TextField} label="Organization Name" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="industry" as={TextField} label="Industry" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="address" as={TextField} label="Address" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="city" as={TextField} label="City" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="state" as={TextField} label="State" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="country" as={TextField} label="Country" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="postalCode" as={TextField} label="Postal Code" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="phoneNumber" as={TextField} label="Phone Number" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="email" as={TextField} label="Email" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="website" as={TextField} label="Website" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="contactPerson" as={TextField} label="Contact Person" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="contactPersonTitle" as={TextField} label="Contact Person Title" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="additionalNotes" as={TextField} label="Additional Notes" variant="outlined" fullWidth />
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

export default AddNewOrganizationForm;
