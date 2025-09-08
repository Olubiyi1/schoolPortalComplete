import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyUserEmail } from "../../Services/Api";

type VerficationStatus = "loading" | "success" | "error";

export const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<VerficationStatus>("loading");
  const [isResending, setIsResending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  //this use ref tracks if verification was already attempted to avoid re-render cos of useEffect used here
  const verificationAttempted = useRef(false);

  // navigate function to route to student  login Page
  const goToLogin = () => {
    navigate("/studentLogin");
  };

  useEffect(() => {
    checkVerificationToken();
  }, [token]);

  // check verifcation token function
  const checkVerificationToken = async () => {
    // Prevent multiple calls using ref
    if (verificationAttempted.current) {
      return;
    }

    verificationAttempted.current = true;

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link or expired token");
      return;
    }

    try {
      console.log("Starting verification with token:", token);

      const response = await verifyUserEmail(token);

      setStatus("success");
      setMessage("Email verified successfully! You can now login.");
    } catch (error: any) {
      setStatus("error");

      if (error.response?.status === 400) {
        setMessage("This verification link has expired or is invalid");
      } else if (error.response?.status === 409) {
        setMessage("This email is already verified");
      } else if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong. Please try again");
      }
    }
  };


  // resending verifcation code
  
  const resendVerificationMail = () => {
    setIsResending(true);
    console.log("resending verification mail");

    setTimeout(() => {
      setIsResending(false);
      alert("Verification mail resent, check your email");
    }, 2000);
  };

  return (
    <div>
      {status === "loading" ? (
        <div>
          <p>Wait while we verify your account</p>
          <p>Loading 🔄....</p>
        </div>
      ) : status === "success" ? (
        <div>
          <p>{message}</p>
          <p>You can now login to your account</p>
          <button onClick={goToLogin}>Login Page</button>
        </div>
      ) : status === "error" ? (
        <div>
          <p>{message}</p>
          <p>You can request for a new verification link</p>
          <button onClick={resendVerificationMail} disabled={isResending}>
            {isResending ? "Sending" : "Resend Verification Mail"}
          </button>
          <button onClick={goToLogin}>Back to Login</button>
        </div>
      ) : null}
    </div>
  );
};
