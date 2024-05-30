import React from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Define initial values for the form fields
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

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string(),
  industry: Yup.string(),
  address: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  country: Yup.string(),
  postalCode: Yup.string(),
  phoneNumber: Yup.string(),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  website: Yup.string(),
  contactPerson: Yup.string(),
  contactPersonTitle: Yup.string(),
  additionalNotes: Yup.string(),
  // Add more validation rules as needed
});

// Styled container for the form
const StyledFormContainer = styled('div')({
  padding: theme => theme.spacing(3),
});

const ModifyOrganizationForm = () => {
  // Retrieve token from Redux store
  const token = useSelector(state => state.auth.token);

  // Function to handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Set up headers with bearer token
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Assuming the content type is JSON
      };

      // Send PATCH request to the API endpoint
      await axios.patch('http://localhost:3001/admin/modifyOrganization', values, { headers });

      // Handle success
      console.log('Organization modified successfully:', values);
    } catch (error) {
      // Handle error
      console.error('Error modifying organization:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h5" gutterBottom>
          Modify Organization
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <StyledFormContainer>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="name" as={TextField} label="Organization Name" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="industry" as={TextField} label="Industry" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                {isSubmitting ? 'Modifying...' : 'Modify Organization'}
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default ModifyOrganizationForm;
