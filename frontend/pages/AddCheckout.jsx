import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import * as Yup from 'yup';
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// District data organized by province
const provinceDistricts = {
    "Western": ["Colombo", "Gampaha", "Kalutara"],
    "Southern": ["Galle", "Matara", "Hambantota"],
    "North-Western": ["Kurunegala", "Puttalam"],
    "Central": ["Kandy", "Matale", "Nuwara Eliya"],
    "Sabaragamuva": ["Kegalle", "Ratnapura"],
    "Northern": ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
    "Eastern": ["Ampara", "Batticaloa", "Trincomalee"],
    "Uva": ["Badulla", "Monaragala"],
    "North-Central": ["Anuradhapura", "Polonnaruwa"]
};

const AddCheckout = () => {
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [mobile, setmobile] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [districts, setDistricts] = useState([]);
    const location = useLocation();
    const totalFromCart = parseFloat(location.state?.total || 0);

    const deliveryFee = 300;
    const totalWithDelivery = totalFromCart + deliveryFee;

    const user = JSON.parse(localStorage.getItem('user'));
    const userMail = user ? user.email : null;
    const userId = user ? user.userId : null;

    const navigate = useNavigate();

    // Update districts when province changes
    useEffect(() => {
        if (state && provinceDistricts[state]) {
            setDistricts(provinceDistricts[state]);
            setDistrict(''); // Reset district when province changes
        } else {
            setDistricts([]);
            setDistrict('');
        }
    }, [state]);

    // Validation schema
    const validateSchema = Yup.object().shape({
        fname: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("First name is required"),
        lname: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Last name is required"),
        street: Yup.string().required("Street address is required"),
        city: Yup.string().required("City is required"),
        district: Yup.string().required("District is required"),
        state: Yup.string().required("State is required"),
        zipcode: Yup.string()
            .matches(/^\d{5,6}$/, "Invalid Zip Code")
            .required("Zip Code is required"),
        mobile: Yup.string()
            .matches(/^0\d{9}$/, "Invalid Mobile Number (Must start with 0 and be 10 digits)")
            .required("Mobile Number is required"),
    });

    // addCheckout function
    const addCheckout = async (e) => {
        e.preventDefault();

        try {
            await validateSchema.validate({ 
                fname, 
                lname, 
                street, 
                city, 
                district,
                state, 
                zipcode, 
                mobile 
            }, { abortEarly: false });
            
            const response = await Axios.post('http://localhost:5050/api/addCheckout', {
                fname: fname,
                lname: lname,
                street: street,
                city: city,
                district: district,
                state: state,
                zipcode: zipcode,
                mobile: mobile,
                userMail: userMail,
                userId: userId,
                total: totalWithDelivery
            });

            console.log(response);
            navigate('/Checkouts');
            alert('Your order is processing please wait for response via call!');
            setfname('');
            setlname('');
            setStreet('');
            setCity('');
            setDistrict('');
            setState('');
            setZipcode('');
            setmobile('');
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

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Province</InputLabel>
                                    <Select
                                        label="Province"
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    >
                                        <MenuItem value="">
                                            <em>Select a province</em>
                                        </MenuItem>
                                        <MenuItem value="Western">Western</MenuItem>
                                        <MenuItem value="Southern">Southern</MenuItem>
                                        <MenuItem value="North-Western">North-Western</MenuItem>
                                        <MenuItem value="Central">Central</MenuItem>
                                        <MenuItem value="Sabaragamuva">Sabaragamuva</MenuItem>
                                        <MenuItem value="Northern">Northern</MenuItem>
                                        <MenuItem value="Eastern">Eastern</MenuItem>
                                        <MenuItem value="Uva">Uva</MenuItem>
                                        <MenuItem value="North-Central">North-Central</MenuItem>
                                    </Select>
                                </FormControl>
                                {errorMessage.state && <div style={{ color: 'red' }}>{errorMessage.state}</div>}
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>District</InputLabel>
                                    <Select
                                        label="District"
                                        value={district}
                                        onChange={(e) => setDistrict(e.target.value)}
                                        disabled={!state}
                                    >
                                        <MenuItem value="">
                                            <em>Select a district</em>
                                        </MenuItem>
                                        {districts.map((district) => (
                                            <MenuItem key={district} value={district}>
                                                {district}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {errorMessage.district && <div style={{ color: 'red' }}>{errorMessage.district}</div>}
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField fullWidth label="City" variant="outlined" value={city} onChange={(e) => setCity(e.target.value)} />
                                {errorMessage.city && <div style={{ color: 'red' }}>{errorMessage.city}</div>}
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField fullWidth label="Street" variant="outlined" value={street} onChange={(e) => setStreet(e.target.value)} />
                                {errorMessage.street && <div style={{ color: 'red' }}>{errorMessage.street}</div>}
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
                            <Typography>Rs {totalFromCart.toFixed(2)}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                            <Typography>Delivery fee</Typography>
                            <Typography>Rs {deliveryFee.toFixed(2)}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" fontWeight="bold" mb={3}>
                            <Typography>Total</Typography>
                            <Typography>Rs {totalWithDelivery.toFixed(2)}</Typography>
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