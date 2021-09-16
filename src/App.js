import React from 'react'
import './App.css'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import BusinessOpPage from './pages/BusinessOpPage/BusinessOpPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage'
import Questionaires from './pages/Questionaires/Questionaires'
import ForgetPage from './pages/ForgetPage/ForgetPage'
import PaymentPlans from './pages/PaymentPlans/PaymentPlans'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/business" component={BusinessOpPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/changepassword" component={ChangePasswordPage} />
        <Route path="/forget" component={ForgetPage} />
        <Route path="/plans" component={PaymentPlans} />
        <Route path="/questions" component={Questionaires} />
      </Switch>
    </Router>
  )
}

export default App
