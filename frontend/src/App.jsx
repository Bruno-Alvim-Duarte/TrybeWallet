import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import SignUp from './pages/SignUp';

function App() {
  document.title = 'TrybeWallet';
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
      <Route path="/signup" component={ SignUp } />
    </div>
  );
}

export default App;
