// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Grid, Typography, Snackbar } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import MuiAlert from '@mui/material/Alert';

// const initialValues = {
//   name: '',
//   query: '',
//   organizationId: '',
// };

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required('Report Name is required'),
//   query: Yup.string().required('SQL Query is required'),
//   organizationId: Yup.string().required('Organization is required'),
// });

// const StyledFormContainer = styled('div')(({ theme }) => ({
//   padding: theme.spacing(3),
// }));

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const CreateAndAssignReport = () => {
//   const [organizations, setOrganizations] = useState([]);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   useEffect(() => {
//     const fetchOrganizations = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/admin/getAllOrganizations');
//         setOrganizations(response.data);
//       } catch (error) {
//         console.error('Error fetching organizations:', error);
//       }
//     };

//     fetchOrganizations();
//   }, []);

//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     try {
//       const newReport = {
//         name: values.name,
//         query: values.query,
//         organizationId: values.organizationId,
//       };

//       await axios.post('http://localhost:3001/api/add-report', newReport);

//       setSnackbarMessage('Report added successfully!');
//       setSnackbarSeverity('success');
//       resetForm();
//     } catch (error) {
//       console.error('Error adding report:', error);
//       setSnackbarMessage('Error adding report. Please try again.');
//       setSnackbarSeverity('error');
//     } finally {
//       setOpenSnackbar(true);
//       setSubmitting(false);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <Grid container justifyContent="center">
//       <Grid item xs={12} sm={8} md={6}>
//         <Typography variant="h5" gutterBottom>
//           Add Report to Organization
//         </Typography>
//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
//           {({ isSubmitting }) => (
//             <Form>
//               <StyledFormContainer>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <Field name="name" as={TextField} label="Report Name" variant="outlined" fullWidth />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Field
//                       name="query"
//                       as={TextField}
//                       label="SQL Query"
//                       variant="outlined"
//                       fullWidth
//                       multiline
//                       rows={4}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Field name="organizationId" as="select" variant="outlined" fullWidth>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           select
//                           label="Organization"
//                           variant="outlined"
//                           fullWidth
//                           SelectProps={{ native: true }}
//                         >
//                           <option value="" disabled>
//                             Select Organization
//                           </option>
//                           {organizations.map(org => (
//                             <option key={org._id} value={org._id}>
//                               {org.name}
//                             </option>
//                           ))}
//                         </TextField>
//                       )}
//                     </Field>
//                   </Grid>
//                 </Grid>
//               </StyledFormContainer>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 style={{ backgroundColor: '#009688', marginTop: '16px' }}
//                 disabled={isSubmitting}
//                 fullWidth
//               >
//                 {isSubmitting ? 'Submitting...' : 'Submit'}
//               </Button>
//             </Form>
//           )}
//         </Formik>
//         <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
//           <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </Grid>
//     </Grid>
//   );
// };

// export default CreateAndAssignReport;

















import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';

const initialValues = {
  name: '',
  query: '',
  organizationId: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Report Name is required'),
  query: Yup.string().required('SQL Query is required'),
  organizationId: Yup.string().required('Organization is required'),
});

const StyledFormContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
}));

const StyledButtonContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'center',
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateAndAssignReport = () => {
  const [organizations, setOrganizations] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/getAllOrganizations');
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const newReport = {
        name: values.name,
        query: values.query,
        organizationId: values.organizationId,
      };

      await axios.post('http://localhost:3001/api/add-report', newReport);

      setSnackbarMessage('Report added successfully!');
      setSnackbarSeverity('success');
      resetForm();
    } catch (error) {
      console.error('Error adding report:', error);
      setSnackbarMessage('Error adding report. Please try again.');
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h5" gutterBottom align="justify">
            Add Report to Organization
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <StyledFormContainer>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="name" as={TextField} label="Report Name" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="query"
                      as={TextField}
                      label="SQL Query"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="organizationId" as="select" variant="outlined" fullWidth>
                      {({ field }) => (
                        <TextField
                          {...field}
                          select
                          label="Organization"
                          variant="outlined"
                          fullWidth
                          SelectProps={{ native: true }}
                        >
                          <option value="" disabled>
                            Select Organization
                          </option>
                          {organizations.map(org => (
                            <option key={org._id} value={org._id}>
                              {org.name}
                            </option>
                          ))}
                        </TextField>
                      )}
                    </Field>
                  </Grid>
                </Grid>
              </StyledFormContainer>
              <StyledButtonContainer>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: '#009688' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Create and Assign Report'}
                </Button>
              </StyledButtonContainer>
            </Form>
          )}
        </Formik>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
};

export default CreateAndAssignReport;
