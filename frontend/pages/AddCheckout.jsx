import React, { useState } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import * as Yup from 'yup';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCheckout = () => {

    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [mobile, setmobile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));
    const userMail = user ? user.email : null;
    const userId = user ? user.userId : null;

    const navigate = useNavigate();

    const validateSchema = Yup.object().shape({
        fname: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("First name is required"),
        lname: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Last name is required"),
        street: Yup.string().required("Street address is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        zipcode: Yup.string()
            .matches(/^\d{5,6}$/, "Invalid Zip Code")
            .required("Zip Code is required"),
        mobile: Yup.string()
            .matches(/^0\d{9}$/, "Invalid Mobile Number (Must start with 0 and be 10 digits)")
            .required("Mobile Number is required"),
    });
    const addCheckout = async (e) => {

        e.preventDefault();

        try {
            await validateSchema.validate({ fname, lname, street, city, state, zipcode, mobile }, { abortEarly: false })
            const response = await Axios.post('http://localhost:5050/api/addCheckout', {
                fname: fname,
                lname: lname,
                street: street,
                city: city,
                state: state,
                zipcode: zipcode,
                mobile: mobile,
                userMail: userMail,
                userId: userId,
                total: 96800
            });
            console.log(response);
            navigate('/Checkouts');
            alert('Your order is proccessing please wait for response via call!');
            setfname('');
            setlname('');
            street('');
            city('');
            state('');
            zipcode('');
            mobile('');

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach(err => {
                    errors[err.path] = err.message;
                });
                setErrorMessage(errors);
            } else {
                console.log(error);
            }
        }
    }


    return (
        <Box sx={{ maxWidth: "1100px", margin: "auto", padding: 4 }}>
            <Grid container spacing={4}>
                {/* Left Section - Delivery Information */}
                <Grid item xs={12} md={7}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Delivery Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="First Name" variant="outlined" value={fname} onChange={(e) => setfname(e.target.value)} />
                                {errorMessage.fname && <div style={{ color: 'red' }}>{errorMessage.fname}</div>}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Last Name" variant="outlined" value={lname} onChange={(e) => setlname(e.target.value)} />
                                {errorMessage.lname && <div style={{ color: 'red' }}>{errorMessage.lname}</div>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email Address" variant="outlined" value={userMail} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Street" variant="outlined" value={street} onChange={(e) => setStreet(e.target.value)} />
                                {errorMessage.street && <div style={{ color: 'red' }}>{errorMessage.street}</div>}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="City" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} />
                                {errorMessage.city && <div style={{ color: 'red' }}>{errorMessage.city}</div>}

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Province" variant="outlined" value={state} onChange={(e) => setState(e.target.value)} />
                                {errorMessage.state && <div style={{ color: 'red' }}>{errorMessage.state}</div>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Zip Code" variant="outlined" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                                {errorMessage.zipcode && <div style={{ color: 'red' }}>{errorMessage.zipcode}</div>}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField fullWidth label="Phone" variant="outlined" type="number" value={mobile} onChange={(e) => {
                                    const value = e.target.value;
                                    // Allow only numbers and limit to 10 characters
                                    if (/^\d{0,10}$/.test(value)) {
                                        setmobile(value);
                                    }
                                }} />
                                {errorMessage.mobile && <div style={{ color: 'red' }}>{errorMessage.mobile}</div>}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Right Section - Cart Totals */}
                <Grid item xs={12} md={5}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Cart Totals
                        </Typography>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography>Subtotal</Typography>
                            <Typography>Rs 96,500</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography>Delivery fee</Typography>
                            <Typography>Rs 300</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" fontWeight="bold" mb={3}>
                            <Typography>Total</Typography>
                            <Typography>Rs 96,800</Typography>
                        </Box>
                        <Button variant="contained" color="primary" fullWidth onClick={addCheckout}>
                            Proceed to Payment
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddCheckout;
