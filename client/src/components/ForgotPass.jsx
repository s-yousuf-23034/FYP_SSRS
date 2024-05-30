import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Container, Grid, TextField, Button, Typography, Link } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';

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

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3001/password/forget-password", {
        email,
      });
      setMessage('Please check your email for the password reset link.');
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error("Forgot password error:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <CustomAppBar  position="static">
        <Toolbar>
          <Typography variant="h6">Forgot Password</Typography>
        </Toolbar>
      </CustomAppBar >
      <ForgotPassContainer>
        {message && <Typography variant="body1">{message}</Typography>}
        {!message && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DarkGreenTextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <LightGreenIcon />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <LightGreenButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
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

export default ForgotPass;
