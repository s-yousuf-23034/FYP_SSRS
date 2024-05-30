// import React, { useEffect, useState } from 'react';
// import { TextField, Grid, Typography } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { useSelector } from "react-redux";

// const StyledFormContainer = styled('div')({
//   padding: (theme) => theme.spacing(3),
// });

// const StyledTextField = styled(TextField)({
//   '& .MuiInputBase-input': {
//     color: 'black', // Set text color to black
//   },
// });

// const OrganizationList = () => {
//   const [organizations, setOrganizations] = useState([]);
//   const token = useSelector(state => state.auth.token); // Retrieve token from Redux store

//   const headers = {
//     Authorization: `Bearer ${token}`,
//     'Content-Type': 'application/json', // Assuming the content type is JSON
//   };

//   useEffect(() => {
//     // Fetch organization data from the API
//     const fetchOrganizations = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/admin/getAllOrganizations', { headers });
//         setOrganizations(response.data);
//       } catch (error) {
//         console.error('Error fetching organizations:', error);
//       }
//     };

//     fetchOrganizations();
//   }, []);

//   // Function to display organization names
//   const renderOrganizationNames = () => {
//     return (
//       <StyledFormContainer>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Typography variant="h5" gutterBottom>
//               Available Organizations
//             </Typography>
//           </Grid>
//           {organizations.map((org) => (
//             <Grid item xs={12} key={org._id}>
//               <StyledTextField
//                 label="Organization"
//                 variant="outlined"
//                 fullWidth
//                 value={org.name}
//                 readOnly
                
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </StyledFormContainer>
//     );
//   };

//   return (
//     <Grid container justifyContent="center">
//       <Grid item xs={12} sm={8} md={6}>
//         {renderOrganizationNames()}
//       </Grid>
//     </Grid>
//   );
// };

// export default OrganizationList;

import React, { useEffect, useState } from 'react';
import { TextField, Grid, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';


const StyledFormContainer = styled('div')({
  padding: theme => theme.spacing(3),
});

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'black', // Set text color to black
  },
});

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const token = useSelector(state => state.auth.token); // Retrieve token from Redux store

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', // Assuming the content type is JSON
  };

  useEffect(() => {
    // Fetch organization data from the API
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/getAllOrganizations', { headers });
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  // Function to delete an organization by ID
  const handleDeleteOrganization = async (id) => {
    try {
      console.log("arhamarham");
      await axios.post(`http://localhost:3001/admin/removeOrganization/`, {id}, { headers });
      console.log("ishrat");
      // Remove the deleted organization from the state
      setOrganizations(prevOrgs => prevOrgs.filter(org => org._id !== id));
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  // Function to display organization names with delete buttons
  const renderOrganizationNames = () => {
    return (
      <StyledFormContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Available Organizations
            </Typography>
          </Grid>
          {organizations.map((org) => (
            <Grid item xs={12} key={org._id}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={10}>
                  <StyledTextField
                    label="Organization"
                    variant="outlined"
                    fullWidth
                    value={org.name}
                    readOnly
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton color="error" onClick={() => handleDeleteOrganization(org._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </StyledFormContainer>
    );
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        {renderOrganizationNames()}
      </Grid>
    </Grid>
  );
};

export default OrganizationList;
