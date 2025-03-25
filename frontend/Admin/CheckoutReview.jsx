import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    Box
} from "@mui/material";
import { FaCheck } from 'react-icons/fa';

const CheckoutReview = () => {
    const [checkouts, setCheckouts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [searchQuery, setSearchQuery] = useState('');
    // const userMail = user ? user.email : null;
    const userId = user ? user.userId : null;
    const [filterstatus, setfilterStatus] = useState('All');
    const [statusu, setstatus] = useState('');

    const getCheckout = async () => {
        try {
            const response = await Axios.get('http://localhost:5050/api/Checkout');
            console.log(response.data);
            setCheckouts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCheckout();
    }, []);

    const yourcheckouts = checkouts.filter(checkout => checkout.userId === userId);

    const handleFilterChange = (event) => {
        setfilterStatus(event.target.value);
    };

    const filteredCheckouts = filterstatus === 'All'
        ? yourcheckouts
        : yourcheckouts.filter(check => check.status === filterstatus);


    const searchCheckouts = filteredCheckouts.filter(yck =>
        yck.fname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const deleteCheckout = async (_id, status) => {
        if (status === 'Completed') {
            alert('This checkout is already completed and cannot be deleted.');
            return;
        }

        try {

            if (window.confirm('Are you sure to delete this ?')) {
                await Axios.post(`http://localhost:5050/api/deleteCheckout`, { _id });
                setCheckouts((prevCheck) => prevCheck.filter((checkout) => checkout._id !== _id));
            }
        } catch (error) {
            console.error('Axios error: ', error);

        }
    };

    const StatusUpdate = async (id) => {
        try {

            const response = await Axios.post('http://localhost:5050/api/statusupdate', { _id: id, status: statusu });
            if (response.status === 200) {
                getCheckout(); // Refresh the list after updating


                if (statusu === 'Completed') {
                    alert('Checkout is completed');
                } else if (statusu === 'Pending') {
                    alert('Checkout is pending');
                } else {
                    alert('Checkout is in progress');
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "red";
            case "In Progress":
                return "blue";
            case "Completed":
                return "green";
            default:
                return "black";
        }
    };
    return (
        <Box >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                All Checkouts
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={2}>
                <TextField
                    label="Search by name"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: "50%" }}
                />
                <Select value={filterstatus} onChange={handleFilterChange}>
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                </Select>
            </Box>

            {/* Table */}
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#D1D5DB' }}>
                            <TableCell><strong>First name</strong></TableCell>
                            <TableCell><strong>Last name</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Phone</strong></TableCell>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell><strong>Created at</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Update</strong></TableCell>
                            <TableCell><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchCheckouts.map((checkout) => (
                            <TableRow key={checkout._id}>
                                <TableCell>{checkout.fname}</TableCell>
                                <TableCell>Rs {checkout.lname}</TableCell>
                                <TableCell><a href={`mailto:${checkout.userMail}`}>{checkout.userMail}</a></TableCell>
                                <TableCell><a href={`tel:${checkout.mobile}`}>{checkout.mobile}</a></TableCell>
                                <TableCell>{checkout.total} LKR</TableCell>
                                <TableCell>{new Date(checkout.createdAt).toLocaleDateString()}  -  {new Date(checkout.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: getStatusColor(checkout.status) }}>
                                    {checkout.status}
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={statusu}
                                        onChange={(e) => setstatus(e.target.value)}
                                        name='status'
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        <MenuItem value="Pending" style={{ color: 'red' }}>Pending</MenuItem>
                                        <MenuItem value='In Progress' style={{ color: 'blue' }}>In Progress</MenuItem>
                                        <MenuItem value="Completed" style={{ color: 'green' }}>Completed</MenuItem>
                                    </Select>
                                    <Button onClick={() => StatusUpdate(checkout._id)}>
                                        <FaCheck />
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => deleteCheckout(checkout._id, checkout.status)}
                                        disabled={checkout.status === "Completed"}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default CheckoutReview