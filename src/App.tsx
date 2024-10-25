
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Items from './pages/Item'
import Stock from './pages/Stock'

import Orders from './pages/order/Orders'
import CreateOrders from './pages/order/CreateOrders'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './auth/Login'
import SignUp from './auth/SignUp'

function App() {

  return (
    <AuthProvider>
<BrowserRouter>
  <Routes>
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<Home />} />
    <Route path="/category" element={<Category />} />
    <Route path="/items" element={<Items />} />
    <Route path="/stock" element={<Stock />} />
    <Route path="/createOrders" element={<CreateOrders />} />
    <Route path="/orders" element={<Orders/>} />
    <Route path="/signUp" element={<SignUp/>} />

    </Route>
    <Route path="/auth/login" element={<Login />} />
    <Route path="/auth/signUp" element={<SignUp/>} />
    
  </Routes>
</BrowserRouter>
</AuthProvider>
  )
}

export default App
