import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Container, Grid, TextField, Button, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import { useParams } from "react-router-dom";

const CustomAppBar = styled(AppBar)({
  backgroundColor: '#009688', // Change background color to green
});

const ForgotPassContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: theme.spacing(8),
}));

const LightGreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#009688',
  '&:hover': {
    backgroundColor: '#00796B',
  },
  borderRadius: '50px',
  width: '200px', // Widen the button
  margin: '20px auto', // Center the button horizontally
}));

const LightGreenIcon = styled(PersonIcon)(({ theme }) => ({
  color: '#009688',
}));

const LockIcon = styled(LockOutlinedIcon)(({ theme }) => ({
  color: '#009688',
}));

const DarkGreenTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#388E3C',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#388E3C',
    },
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#004D40',
  },
  '& .MuiFormLabel-root': {
    color: '#004D40',
  },
}));

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false); // State for showing/hiding new password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for showing/hiding confirm password
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (newPassword !== confirmPassword) {
        setMessage('Passwords do not match.');
        return;
      }

      const url = `http://localhost:3001/password/reset-password/${token}`;
      
      await axios.post(url, {
        newPassword,
      });
      setMessage('Password changed successfully.');
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error("Reset password error:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <CustomAppBar position="static">
        <Toolbar>
          <Typography variant="h6">Reset Password</Typography>
        </Toolbar>
      </CustomAppBar>
      <ForgotPassContainer>
        {message && <Typography variant="body1">{message}</Typography>}
        {!message && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DarkGreenTextField
                  variant="outlined"
                  fullWidth
                  id="newPassword"
                  label="New Password"
                  type={showNewPassword ? 'text' : 'password'} // Show/hide new password
                  autoComplete="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <LockIcon />
                    ),
                    endAdornment: (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={showNewPassword}
                            onChange={() => setShowNewPassword(!showNewPassword)}
                            color="primary"
                          />
                        }
                        label="Show"
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <DarkGreenTextField
                  variant="outlined"
                  fullWidth
                  id="confirmPassword"
                  label="Re-enter New Password"
                  type={showConfirmPassword ? 'text' : 'password'} // Show/hide confirm password
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <LockIcon />
                    ),
                    endAdornment: (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={showConfirmPassword}
                            onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                            color="primary"
                          />
                        }
                        label="Show"
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <LightGreenButton
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? 'Changing Password...' : 'Change Password'}
                </LightGreenButton>
              </Grid>
            </Grid>
          </form>
        )}
        <Typography variant="body1">
          Remember your password? <Link href="#" onClick={() => navigate('/')}>Login</Link>
        </Typography>
      </ForgotPassContainer>
    </>
  );
};

export default ResetPassword;
