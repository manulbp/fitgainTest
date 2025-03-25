import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import Axios from 'axios';
import { FaArrowLeft, FaTimes, FaUser } from "react-icons/fa";
import { Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Typography, IconButton, Popover, Select, MenuItem } from "@mui/material";
import Profile from '../pages/Profile';


export default function Header() {
  const [openlogin, setopenlogin] = useState(false);

  const [errorl, setError] = useState('');

  const [anchorEl, setAnchorEl] = useState(null);
  const [step, setStep] = useState(1);

  const [username, setuname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confpassword, setconfpassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [usernamel, setunamel] = useState('');
  const [passwordl, setpasswordl] = useState('');


  // const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userMail = user ? user.email : null;

  const validateSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Invalid email address') // Corrected error message
      .required('Email is required'), // Added required validation
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be at most 20 characters')
      .matches(/[a-zA-Z]/, 'Password must contain letters'),
    confpassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords must match') // Validate password confirmation
      .required('Please re-type password'), // Added required validation
  });

  const validateSchema2 = Yup.object().shape({
    usernamel: Yup.string().required('Username is required'),
    passwordl: Yup.string()
      .required('Password is required')
  });

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navigate = useNavigate();

  const checkUser = async (e) => {
    e.preventDefault();

    try {
      await validateSchema2.validate({ usernamel, passwordl }, { abortEarly: false });
      const { data: res } = await Axios.post('http://localhost:5050/api/checkLogin', {
        username: usernamel,
        password: passwordl
      });

      const { token, user } = res;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.email === 'adminmail@gmail.com') {
        navigate('/admindashboard');
      }
      console.log(res);
      setopenlogin(false);
      window.location.reload();
    } catch (error) {

      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setErrorMessage2(errors);
      } else if (error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }
  }

  const adduser = async () => {
    try {
      await validateSchema.validate({ username, email, password, confpassword }, { abortEarly: false });
      const response = await Axios.post('http://localhost:5050/api/addLogin', {
        email: email,
        username: username,
        password: password
      })

      console.log('Singup success', response.data);

      setemail('');
      setuname('');
      setpassword('');
      setconfpassword('');
      setStep(step - 1);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      } else if (error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500) {
        setError(error.response.data.message)
      }
    }

  }

  const admin = userMail === 'adminmail@gmail.com';

  return (
    <div className='bg-gray-300'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-7">
        <h1 className='font-bold'>Fit-gain</h1>
        <ul className='flex gap-4'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/product">Products</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          {admin && (
            <>
              <li><Link to="/admindashboard">Admin Dashboard</Link></li>
            </>
          )}
          {user ? (
            <>
              <button style={{ cursor: 'pointer' }} onClick={handleProfileClick}>{user.username}</button>
            </>
          ) :
            (
              <>
                <button style={{ cursor: 'pointer' }} onClick={() => setopenlogin(true)}>Login</button>
              </>
            )}

        </ul>
      </div>
      <Dialog open={openlogin} onClose={() => setopenlogin(false)} fullWidth>
        {step === 1 && (
          <>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              Login
              <IconButton onClick={() => setopenlogin(false)}>
                <FaTimes />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={usernamel}
                  onChange={(e) => setunamel(e.target.value)}
                  sx={{ mb: 2 }}
                  required
                />
                {errorMessage2.usernamel && <div style={{ color: 'red' }}>{errorMessage2.usernamel}</div>}
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={passwordl}
                  onChange={(e) => setpasswordl(e.target.value)}
                  required
                />
                {errorMessage2.passwordl && <div style={{ color: 'red' }}>{errorMessage2.passwordl}</div>}
                {errorl && <Typography color="error">{errorl}</Typography>}
              </Box>
              <Grid container justifyContent="flex-end" sx={{ mt: 1 }}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link onClick={() => setStep(2)} style={{ color: "#D2691E", fontWeight: 600, cursor: "pointer" }}>
                    Register here
                  </Link>
                </Typography>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={checkUser} >
                Login
              </Button>
            </DialogActions>
          </>
        )}

        {step === 2 && (
          <>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <IconButton onClick={() => setStep(1)}>
                <FaArrowLeft />
              </IconButton>
              Sign Up
            </DialogTitle>
            <DialogContent sx={{ paddingTop: 10 }}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                name="username"
                value={username}
                onChange={(e) => setuname(e.target.value)}
                sx={{ mb: 2 }}
              />
              {errorMessage.username && <div style={{ color: 'red' }}>{errorMessage.username}</div>}
              {errorl && <Typography color="error">{errorl}</Typography>}
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                sx={{ mb: 2 }}
              />
              {errorMessage.email && <div style={{ color: 'red' }}>{errorMessage.email}</div>}
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              {errorMessage.password && <div style={{ color: 'red' }}>{errorMessage.password}</div>}
              <TextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                type="password"
                name="confpassword"
                value={confpassword}
                onChange={(e) => setconfpassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              {errorMessage.confpassword && <div style={{ color: 'red' }}>{errorMessage.confpassword}</div>}
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={adduser} >
                Register
              </Button>
            </DialogActions>
          </>

        )}

      </Dialog>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className="poppover"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Profile />
      </Popover>
    </div>
  )
}

