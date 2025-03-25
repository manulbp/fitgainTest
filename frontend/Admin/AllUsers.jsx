import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";

const AllUsers = () => {

    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
  const userMail = user ? user.email : null;

  const admin = userMail === 'adminmail@gmail.com';
    const getUsers = async () => {
        try {
            const response = await Axios.get('http://localhost:5050/api/users');
            setUsers(response.data.allUser);
        } catch (error) {
            console.error("Axios error: ", error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            await Axios.post('http://localhost:5050/api/deleteUser', { _id: id });
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
            console.log('user deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const searchusers = users.filter(users =>
        users.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom >
                All users
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <TextField
                    label="Search by username"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: "50%" }}
                />
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>

                <Table>
                    {/* Table Head */}
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#D1D5DB" }}>
                            <TableCell sx={{ color: "black", fontWeight: "bold" }}>User ID</TableCell>
                            <TableCell sx={{ color: "black", fontWeight: "bold" }}>Username</TableCell>
                            <TableCell sx={{ color: "black", fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ color: "black", fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* Table Body */}
                    <TableBody>
                        {searchusers.length > 0 ? (
                            searchusers.slice().reverse().map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user._id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => deleteUser(user._id)} disabled={user.email==='adminmail@gmail.com'}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No Users Found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default AllUsers
