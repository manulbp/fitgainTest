import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleAuthProvider } from "../services/firebase.js";
import { Button } from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import React from "react";

const LoginG = () => {
    const navigate = useNavigate();

    const signinwithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            console.log(result);
            localStorage.setItem("token", result.user.accessToken);
            localStorage.setItem("user", JSON.stringify(result.user));
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Button
                style={{
                    borderRadius: "20px",
                    backgroundColor: "blue",
                    color: "white",
                    fontSize: "12px",
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onClick={signinwithGoogle}
            >
                Login with <FaGoogle style={{ marginLeft: '5px' }} />
            </Button>
        </div>
    );
};
export default LoginG;
