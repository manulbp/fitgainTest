import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography, Box, Dialog, DialogTitle, IconButton, DialogContent, TextField, DialogActions } from "@mui/material";
import { FaUserCircle, FaSignOutAlt, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import Axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';


const Profile = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const userMail = user ? user.email : null;
    const userId = user ? user.userId : null;
    const userName = user ? user.username : null;
    const userDname = user ? user.displayName : null;
    const [open, setopen] = useState(false);
    const [username, setUusername] = useState(user.username);
    const [email, setUemail] = useState(user.email);

    const signOutUser = async () => {
        try {
            if (window.confirm('Are you sure ?')) {
                if (userDname) {
                    await signOut(auth);
                }
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteUser = async () => {
        try {
            if (window.confirm('Are you sure to delete your account ?')) {
                await Axios.post('http://localhost:5050/api/deleteUser', { _id: userId });
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
                console.log('User deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting User:', error);
        }
    };

    const updateUser = async () => {
        try {

            if (window.confirm('You need to re-login when updating your profile details.. Ok ?')) {
                const response = await Axios.post('http://localhost:5050/api/updateuser', {
                    _id: userId,
                    username,
                    email
                });
                console.log("User update is successful", response.data);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.reload();
            }


        } catch (error) {
            console.error('Error deleting User:', error);
        }
    }
    return (
        <>

            <Card
                sx={{
                    maxWidth: 400,
                    margin: "auto",
                    textAlign: "center",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    padding: 3,
                    background: "linear-gradient(135deg, #D1D5DB, #fff)",
                    color: "#fff",
                }}
            >
                <CardContent>

                    <FaUserCircle size={60} style={{ marginLeft: '30%' }} />


                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {userName}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "black" }}>
                        {userMail}
                    </Typography>


                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            startIcon={<FaEdit />}
                            onClick={() => setopen(true)}
                            disabled={!!user.displayName}
                            sx={{ backgroundColor: "#FFD700", color: "#000", fontWeight: 600 }}
                        >
                            Update Account
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<FaTrash />}
                            onClick={deleteUser}
                            disabled={!!user.displayName}
                            sx={{ backgroundColor: "red", color: "#fff", fontWeight: 600 }}
                        >
                            Delete Account
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<FaSignOutAlt />}
                            onClick={signOutUser}
                            sx={{ backgroundColor: "#000", color: "#fff", fontWeight: 600 }}
                        >
                            Logout
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <Dialog open={open}>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    Update details
                    <IconButton onClick={() => setopen(false)}>
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
                            value={username}
                            onChange={(e) => setUusername(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setUemail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={updateUser} >
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

        </>



    )
}

export default Profile
