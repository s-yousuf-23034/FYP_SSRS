import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Snackbar,
  Paper
} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../state/index';
import { styled } from '@mui/system';
import axios from 'axios';
import ForgotPass from './ForgotPass';
import MyProfile from './MyProfile';
import ReportTable from './ReportTable';
import logo from './hbl3.png';

const CustomerHome = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [reports, setReports] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [currentReportName, setCurrentReportName] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user from Redux store
  const [openSubMenu1, setOpenSubMenu1] = useState(false);
  const [openSubMenu2, setOpenSubMenu2] = useState(false);
  const [openSubMenu3, setOpenSubMenu3] = useState(false);

  const CustomAppBar = styled(AppBar)({
    backgroundColor: '#009688', // Change background color to green
  });

  const handleSubMenu1Click = () => {
    setOpenSubMenu1(!openSubMenu1);
  };

  const handleSubMenu2Click = () => {
    setOpenSubMenu2(!openSubMenu2);
  };

  const handleSubMenu3Click = () => {
    setOpenSubMenu3(!openSubMenu3);
  };

  const handleLogout = () => {
    // Handle logout logic here
    dispatch(logout());
    //navigate('/'); // Redirect to login page after logout
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setReportData(null); // Clear report data when changing options
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const fetchReports = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/organization-reports', {
        organizationId: user.organization
      });
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setSnackbarMessage('Error fetching reports. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const fetchReportData = async (report) => {
    try {
      const response = await axios.post('http://localhost:3001/api/execute-report', {
        query: report.query
      });
      setReportData(response.data.data);
      setCurrentReportName(report.name);
      setSelectedOption('report');
    } catch (error) {
      console.error('Error fetching report data:', error);
      setSnackbarMessage('Error fetching report data. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [user.organization]);

  return (
    <div>
      <CustomAppBar position="fixed">
        <Toolbar>
          <img src={logo} alt="Logo" style={{ marginRight: '100px', height: '35px', width: 'auto' }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Customer Dashboard
          </Typography>
          {user && (
            <Typography variant="body1" component="div" sx={{ marginRight: '20px' }}>
              {user.email}
            </Typography>
          )}
          <Button color="inherit" onClick={handleLogout}>
            <ExitToAppIcon />
            Logout
          </Button>
        </Toolbar>
      </CustomAppBar>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '240px', backgroundColor: '#f0f0f0', borderRight: '1px solid #ccc', position: 'fixed', top: '64px', bottom: '0', overflowY: 'auto' }}>
          <List>
            <ListItem button onClick={handleSubMenu3Click}>
              <ListItemIcon>
                {openSubMenu3 ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
              </ListItemIcon>
              <ListItemText primary="MIS Reports" />
            </ListItem>
            <Collapse in={openSubMenu3} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {reports.map((report, index) => (
                  <ListItem button key={index} sx={{ pl: 4 }} onClick={() => fetchReportData(report)}>
                    <ListItemIcon>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={report.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <ListItem button onClick={handleSubMenu1Click}>
              <ListItemIcon>
                {openSubMenu1 ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
              </ListItemIcon>
              <ListItemText primary="Profile Management" />
            </ListItem>
            <Collapse in={openSubMenu1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={() => handleOptionClick('forgotPass')} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Change Password" />
                </ListItem>
                <ListItem button onClick={() => handleOptionClick('myProfile')} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Profile" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </div>
        <Paper elevation={3} style={{ padding: '20px', margin: '80px 20px 20px 260px', width: 'calc(100% - 280px)' }}>
          {selectedOption === 'forgotPass' && <ForgotPass />}
          {selectedOption === 'myProfile' && <MyProfile />}
          {selectedOption === 'report' && reportData && <ReportTable data={reportData} reportName={currentReportName} />}
        </Paper>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CustomerHome;