import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import SignUp from './pages/SignUp';

function App() {
  document.title = 'TrybeWallet';
  return (
    <div>
      <Route exact path="/" component={ SignUp } />
      <Route path="/carteira" component={ Wallet } />
      <Route path="/signin" component={ Login } />
    </div>
  );
}

export default App;
