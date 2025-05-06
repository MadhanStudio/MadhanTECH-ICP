import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';

function InternetIdentityButton({ onLoginChange }) {
  const [principal, setPrincipal] = useState(null);
  const [authClient, setAuthClient] = useState(null);

  useEffect(() => {
    AuthClient.create().then(client => {
      setAuthClient(client);
      if (client.isAuthenticated()) {
        const identity = client.getIdentity();
        const principalText = identity.getPrincipal().toText();
        setPrincipal(principalText);
        onLoginChange(true);
      } else {
        onLoginChange(false);
      }
    });
  }, []);

  const handleLogin = async () => {
    await authClient.login({
      identityProvider: 'https://identity.ic0.app/#authorize',
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principalText = identity.getPrincipal().toText();
        setPrincipal(principalText);
        onLoginChange(true);
        console.log('Logged in as:', principalText);
      },
    });
  };

  const handleLogout = async () => {
    await authClient.logout();
    setPrincipal(null);
    onLoginChange(false);
  };

  return (
    <div style={{ margin: '20px' }}>
      {principal ? (
        <button onClick={handleLogout} style={buttonStyle}>
          Logout
        </button>
      ) : (
        <button onClick={handleLogin} style={buttonStyle}>
          <img
            src="/icp.svg"
            alt="Internet Identity"
            style={{
              width: '24px',
              height: '24px',
              marginRight: '8px',
            }}
          />
          Sign in with Internet Identity
        </button>
      )}
    </div>
  );
  
  
}

const buttonStyle = {
  backgroundColor: 'black',
  color: 'white',
  border: '1px solid #ccc',
  padding: '10px 20px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontWeight: '500',
  cursor: 'pointer',
};


export default InternetIdentityButton;
