import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

function App() {
  const [audience, setAudience] = useState([]);
  const [rules, setRules] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const handleLoginSuccess = (response) => {
    console.log('Login Success: currentUser:', response.profileObj);
  };

  const handleLoginFailure = (response) => {
    console.log('Login Failed:', response);
  };

  const addRule = (rule) => {
    setRules([...rules, rule]);
  };

  const checkAudience = async () => {
    const response = await axios.post('/api/audience/check', { rules });
    setAudience(response.data);
  };

  const saveAudience = async () => {
    const response = await axios.post('/api/audience/save', { rules });
    setCampaigns([response.data, ...campaigns]);
  };

  return (
    <div className="App">
      <h1>Campaign Creator</h1>
      <GoogleLogin
        clientId="your_google_client_id"
        buttonText="Login"
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        cookiePolicy={'single_host_origin'}
      />
      <div>
        <button onClick={checkAudience}>Check Audience Size</button>
        <button onClick={saveAudience}>Save Audience</button>
      </div>
      <div>
        <h2>Audience Size: {audience.length}</h2>
      </div>
      <div>
        <h2>Campaigns</h2>
        <ul>
          {campaigns.map((campaign) => (
            <li key={campaign.id}>{campaign.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
