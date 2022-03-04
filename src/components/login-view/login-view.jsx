
import React, { useState } from 'react';

export function LoginView(props) {
  // set useState() to empty string. useState returns array of paired values destructured by []
  // useState() creats local state and preserves between render cycles. 
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    // prevents default behavior of page refresh/reload when button clicked/submited from <button type="submit".
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}
