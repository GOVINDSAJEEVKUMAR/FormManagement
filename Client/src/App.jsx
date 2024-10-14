import React from 'react'
import { Route,Routes } from 'react-router-dom'
import InventoryForm from './Components/Form'
import DisplayPage from './Components/Dipslay'
import PurchaseOrderForm from './Components/OrderForm'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
      <Routes>
        <Route path='' element={<InventoryForm />} />
        <Route path='/display' element={<DisplayPage />} />
        <Route path='/order' element={<PurchaseOrderForm />} />
      </Routes>
    </div>
  )
}

export default App
