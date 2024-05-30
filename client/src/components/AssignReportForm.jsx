import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from "react-redux";

const initialValues = {
  reportURL: '',
  customerEmail: '',
};

const validationSchema = Yup.object().shape({
  reportURL: Yup.string().url('Invalid URL').required('Report URL is required'),
  customerEmail: Yup.string().email('Invalid email address').required('Customer email is required'),
});

const StyledFormContainer = styled('div')({
  padding: theme => theme.spacing(3),
});

const AssignReportForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = useSelector(state => state.auth.token); // Retrieve token from Redux store

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Assuming the content type is JSON
      };

      // Send POST request to the API endpoint
      await axios.post('http://localhost:3001/admin/assignReport', values, { headers });

      // Handle success
      setSuccessMessage('Report assigned successfully');
      setErrorMessage('');
      console.log('Report assigned successfully:', values);
    } catch (error) {
      // Handle error
      setErrorMessage('Error assigning report: ' + error.response.data);
      setSuccessMessage('');
      console.error('Error assigning report:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h5" gutterBottom>
          Assign Report to Customer
        </Typography>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <StyledFormContainer>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="reportURL" as={TextField} label="Report URL" variant="outlined" fullWidth />
                    <ErrorMessage name="reportURL" component="div" style={{ color: 'red' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="customerEmail" as={TextField} label="Customer Email" variant="outlined" fullWidth />
                    <ErrorMessage name="customerEmail" component="div" style={{ color: 'red' }} />
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

export default AssignReportForm;
