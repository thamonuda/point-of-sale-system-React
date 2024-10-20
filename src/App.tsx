import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Items from './pages/Item'
import Stock from './pages/Stock'

import Orders from './pages/order/Orders'
import CreateOrders from './pages/order/CreateOrders'

function App() {

  return (
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/category" element={<Category />} />
    <Route path="/items" element={<Items />} />
    <Route path="/stock" element={<Stock />} />
    <Route path="/createOrders" element={<CreateOrders />} />
    <Route path="/orders" element={<Orders/>} />
  </Routes>
</BrowserRouter>
  )
}

export default App
