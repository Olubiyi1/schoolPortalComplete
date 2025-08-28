import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';


// creating the verificaton status values
type VerificationStatus = "loading" | "success" | "error"

export const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<VerificationStatus>('loading');

  // resending verification Link
  const [isResending, setIsResending] = useState<boolean>(false);
  
  // allows you route to the login page
  const navigate = useNavigate();

  // loads immediately the page renders
  useEffect(() => {
    checkEmailVerification();
  }, []);

  // this loads by default in the useEffect
  const checkEmailVerification = () => {
    if (!token) {
      setStatus('error');
      return;
    }

    console.log('Token found:', token);
    setStatus('success');
  };

  // login navigation
  const goToLogin = () => {
    navigate('/studentLogin');
  };

  // Function to resend verification email 
  const resendEmail = () => {
    setIsResending(true);
    
    console.log('Resending verification email...');
    
    // Simulate delay with setTimeout
    setTimeout(() => {
      setIsResending(false);
      alert('Verification email sent! Please check your inbox.');
    }, 2000);
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      
      {status === 'loading' && (
        <div>
          <h1>Checking your email...</h1>
          <p>Please wait while we verify your account.</p>
          <p>⏳ Loading...</p>
        </div>
      )}

      {status === 'success' && (
        <div>
          <h1 style={{ color: 'green' }}>Email Verified! ✅</h1>
          <p>Your account is now active!</p>
          <p>You can now login to your account.</p>
          
          <button 
            onClick={goToLogin}
            style={{
              backgroundColor: "black",
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Go to Login
          </button>
        </div>
      )}

      {status === 'error' && (
        <div>
          <h1 style={{ color: 'red' }}>Verification Failed ❌</h1>
          <p>Invalid verification link or token missing.</p>
          <p>You can request a new verification email below.</p>
          
          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={resendEmail}
              disabled={isResending}
              style={{
                backgroundColor: isResending ? '#ccc' : '#28a745',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: isResending ? 'not-allowed' : 'pointer',
                marginRight: '10px'
              }}
            >
              {isResending ? 'Sending...' : 'Resend Verification Email'}
            </button>
            
            <button 
              onClick={goToLogin}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
      
    </div>
  );
};


