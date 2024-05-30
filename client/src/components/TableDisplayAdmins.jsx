// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import axios from 'axios';

// const AdminList = () => {
//   const [admins, setAdmins] = useState([]);

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/admin/getAllAdmins');
//         setAdmins(response.data);
//       } catch (error) {
//         console.error('Error fetching admins:', error);
//       }
//     };

//     fetchAdmins();
//   }, []);

//   return (
//     <div>
//       <h2>Admin List</h2>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>First Name</TableCell>
//               <TableCell>Last Name</TableCell>
//               <TableCell>Email</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {admins.map(admin => (
//               <TableRow key={admin._id}>
//                 <TableCell>{admin._id}</TableCell>
//                 <TableCell>{admin.firstName}</TableCell>
//                 <TableCell>{admin.lastName}</TableCell>
//                 <TableCell>{admin.email}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default AdminList;








import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import axios from 'axios';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:3001/admin/getAllAdmins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  return (
    
    <Box width="70%" height="70%" gap={4}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map(admin => (
              <TableRow key={admin._id}>
                <TableCell>{admin._id}</TableCell>
                <TableCell>{admin.firstName}</TableCell>
                <TableCell>{admin.lastName}</TableCell>
                <TableCell>{admin.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    
  );
};

export default AdminList;
