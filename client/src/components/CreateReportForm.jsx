import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from "react-redux";

const initialValues = {
  title: '',
  description: '',
  URL: '',
  createdByEmail: '',
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  URL: Yup.string().url('Invalid URL').required('URL is required'),
  createdByEmail: Yup.string().email('Invalid email address').required('Creator email is required'),
});

const StyledFormContainer = styled('div')({
  padding: theme => theme.spacing(3),
});

const CreateReportForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const loggedInUserEmail = useSelector(state => state.auth.user.email); // Retrieve logged-in user email from Redux store
  const token = useSelector(state => state.auth.token); // Retrieve token from Redux store

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    if (values.createdByEmail !== loggedInUserEmail) {
      setFieldError('createdByEmail', 'Please enter your correct email address');
      setSubmitting(false);
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Assuming the content type is JSON
      };

      // Send POST request to the API endpoint
      await axios.post('http://localhost:3001/admin/createReport', values, { headers });

      // Handle success
      setSuccessMessage('Report created successfully');
      console.log('Report created successfully:', values);
    } catch (error) {
      // Handle error
      console.error('Error creating report:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h5" gutterBottom>
          Create New Report
        </Typography>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <StyledFormContainer>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="title" as={TextField} label="Title" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="description" as={TextField} label="Description" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="URL" as={TextField} label="URL" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="createdByEmail" as={TextField} label="Your Email" variant="outlined" fullWidth />
                    <ErrorMessage name="createdByEmail" component="div" style={{ color: 'red' }} />
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

export default CreateReportForm;
