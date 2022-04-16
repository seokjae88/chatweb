import { useState } from 'react';
import axios from 'axios';

const Model = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { 'username': username, 'password': password };

    axios.post('/login', data)
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        window.location.reload();

      } else {
        setError(response.data);  
      }      
    }).catch(err => {
      setError(err.response.data);
    })
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            className="joinInput"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            className="joinInput mt-20"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button mt-20" type="submit">
            Sign in
          </button>
        </form>
        <h1 className="error">{error}</h1>
    </div>
  </div>

  );
};

export default Model;
