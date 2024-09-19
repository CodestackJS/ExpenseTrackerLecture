import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateAccount from './expense-tracker/components/CreateAccount.tsx'
import ExpenseList from './expense-tracker/components/ExpenseList.tsx'
import Login from './expense-tracker/components/Login.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}



<BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/CreateAccount" element={<CreateAccount/>}/>
        <Route path="/ExpenseList" element={<App/>}/>

      </Routes>

</BrowserRouter>
  </React.StrictMode>,
)
