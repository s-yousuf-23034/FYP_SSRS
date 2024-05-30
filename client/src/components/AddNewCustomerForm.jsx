// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Grid, Typography, MenuItem } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { useSelector } from "react-redux";

// const initialValues = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   password: '',
//   organization: '', // New field for organization selection
// };

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required('First Name is required'),
//   lastName: Yup.string().required('Last Name is required'),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
//   organization: Yup.string().required('Organization is required'), // Validation for organization selection
// });

// const StyledFormContainer = styled('div')({
//   padding: theme => theme.spacing(3),
// });

// const AddNewCustomerForm = () => {
//   const [organizations, setOrganizations] = useState([]);
//   const token = useSelector(state => state.auth.token);

//   useEffect(() => {
//     const fetchOrganizations = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/admin/getAllOrganizations', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOrganizations(response.data);
//       } catch (error) {
//         console.error('Error fetching organizations:', error);
//       }
//     };

//     fetchOrganizations();
//   }, [token]);

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const formData = {
//         ...values,
//         role: 'customer',
//         //organization: ,
//       };

//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };

//       await axios.post('http://localhost:3001/admin/createUser', formData, { headers });

//       console.log('Customer created successfully:', formData);
//     } catch (error) {
//       console.error('Error creating customer:', error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Grid container justifyContent="center">
//       <Grid item xs={12} sm={8} md={6}>
//         <Typography variant="h5" gutterBottom>
//           Add New Customer
//         </Typography>
//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
//           {({ isSubmitting }) => (
//             <Form>
//               <StyledFormContainer>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <Field name="firstName" as={TextField} label="First Name" variant="outlined" fullWidth />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name="lastName" as={TextField} label="Last Name" variant="outlined" fullWidth />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Field name="email" as={TextField} label="Email" variant="outlined" fullWidth />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Field name="password" type="password" as={TextField} label="Password" variant="outlined" fullWidth />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Field
//                       name="organization"
//                       as={TextField}
//                       select
//                       label="Select Organization"
//                       variant="outlined"
//                       fullWidth
//                     >
//                       {organizations.map(org => (
//                         <MenuItem key={org.id} value={org.name}>
//                           {org.name}
//                         </MenuItem>
//                       ))}
//                     </Field>
//                   </Grid>
//                 </Grid>
//               </StyledFormContainer>
//               <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: '#009688' }} disabled={isSubmitting} fullWidth>
//                 {isSubmitting ? 'Submitting...' : 'Submit'}
//               </Button>
//             </Form>
//           )}
//         </Formik>
//       </Grid>
//     </Grid>
//   );
// };

// export default AddNewCustomerForm;














import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, MenuItem } from '@mui/material';
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
  organization: '', // New field for organization selection
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  organization: Yup.string().required('Organization is required'), // Validation for organization selection
});

const StyledFormContainer = styled('div')({
  padding: theme => theme.spacing(3),
});

const AddNewCustomerForm = () => {
  const [organizations, setOrganizations] = useState([]);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/getAllOrganizations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, [token]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = {
        ...values,
        role: 'customer',
        organization: values.organization, // Set organization as selected in the form
      };

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      await axios.post('http://localhost:3001/admin/createUser', formData, { headers });

      console.log('Customer created successfully:', formData);
    } catch (error) {
      console.error('Error creating customer:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h5" gutterBottom>
          Add New Customer
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
                  <Grid item xs={12}>
                    <Field
                      name="organization"
                      as={TextField}
                      select
                      label="Select Organization"
                      variant="outlined"
                      fullWidth
                    >
                      {organizations.map(org => (
                        <MenuItem key={org._id} value={org._id}> {/* Assuming _id is the ObjectId field */}
                          {org.name}
                        </MenuItem>
                      ))}
                    </Field>
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

export default AddNewCustomerForm;
