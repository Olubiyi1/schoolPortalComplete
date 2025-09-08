

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

type VerficationStatus = "loading" | "success" | "error";


export const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<VerficationStatus>("loading");
  const [isResending, setIsResending] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    checkVerificationToken();
  }, [token]);

  const checkVerificationToken = () => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link or expired token");
      return;
    }
    {
      console.log("token found");
      setStatus("success");
      setMessage("Your account is now active");
    }
  };
  const goToLogin = () => {
    navigate("/studentLogin");
  };
  const resendVerificationMail = () => {
    setIsResending(true);
    console.log("resending verifcation mail");

    // set time out is just to simulate how a delay like its connecting to the API. in production, it wont be used
    setTimeout(() => {
      setIsResending(false);
      alert("Verification mail resent, check your email");
    }, 2000);
  };
  return (
    // i have used tenary to replace logical AND &&.but must have a fallback of null to avoid error
    // null be included as the fallback for it to work.
    // there was no issue with the logical AND
    <div>
      {/* {status === "loading" && <p>Loading</p>}
      {status === "success" && <p>Account verification successful</p>}
      {status === "error" && <p>There was an error verifying your account</p>} */}

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
