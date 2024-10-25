import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Items from './pages/Item'
import Stock from './pages/Stock'

import Orders from './pages/order/Orders'
import CreateOrders from './pages/order/CreateOrders'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import SingIn from './pages/auth/Sign'

function App() {

  return (
    <AuthProvider>
<BrowserRouter>
  <Routes>
  <Route element={<ProtectedRoute />}>

  {/* <Route path="/" element={<Navigate to="/auth/login" />} />*/}
  
    <Route path="/" element={<Home />} />
    <Route path="/category" element={<Category />} />
    <Route path="/items" element={<Items />} />
    <Route path="/stock" element={<Stock />} />
    <Route path="/createOrders" element={<CreateOrders />} />
    <Route path="/orders" element={<Orders/>} />
    <Route path="/signIn" element={<SingIn/>} />
    </Route>
    
    <Route path="/auth/login" element={<Login />} />

  </Routes>
</BrowserRouter>
</AuthProvider>
  )
}

export default App
