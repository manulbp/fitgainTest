import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf } from 'react-icons/fa';

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

    const genpdf = (user) => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        doc.text("User Details Report", 20, 20);

        // Divider Line
        doc.setLineWidth(0.5);
        doc.line(20, 25, 190, 25);

        // User Details
        doc.setFontSize(14);
        doc.setTextColor(60, 60, 60);

        doc.text(`User ID:`, 20, 40);
        doc.text(user._id, 60, 40);

        doc.text(`Username:`, 20, 50);
        doc.text(user.username, 60, 50);

        doc.text(`Email:`, 20, 60);
        doc.text(user.email, 60, 60);

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 280);

        // Save the PDF
        doc.save(`User_${user.username}.pdf`);
    };

    const genAllpdf = (users) => {
        const doc = new jsPDF();

        // Title
        doc.setFontSize(18);
        doc.text("All Users Report", 14, 22);

        // Call autoTable correctly
        autoTable(doc, {
            startY: 30,
            head: [["User ID", "Username", "Email"]],
            body: users.map((user) => [user._id, user.username, user.email]),
            theme: "grid",
            headStyles: {
                fillColor: [210, 105, 30],
                textColor: [255, 255, 255],
                fontStyle: "bold",
            },
            styles: {
                fontSize: 10,
                cellPadding: 3,
            },
        });

        // Footer
        const pageHeight =
            doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        doc.setFontSize(10);
        doc.text(
            `Generated on: ${new Date().toLocaleString()}`,
            14,
            pageHeight - 10,
        );

        doc.save("All_Users_Report.pdf");
    };

    return (
        <Box>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<FaFilePdf />}
                onClick={() => genAllpdf(users)}
                sx={{
                    mt: 2,
                    mb: 1,
                    ml: "auto",
                    display: "block",
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    px: 2,
                    py: 0.5,
                    marginRight: "5%",
                    marginTop: "2%",
                }}
            >
                Export All as PDF
            </Button>
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
                                        <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => deleteUser(user._id)} disabled={user.email === 'adminmail@gmail.com'}>
                                            Delete
                                        </Button>
                                        <Button
                                            color="error"
                                            startIcon={<FaFilePdf />}
                                            style={{ marginLeft: "5px" }}
                                            onClick={() => genpdf(user)}
                                        />
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
