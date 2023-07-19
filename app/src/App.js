import React from 'react'
import Authentication from './screens/auth/Authentication'
import { Route, Routes } from 'react-router-dom'
import Landing from './screens/landing/Landing'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Authentication />}></Route>
      <Route path='/' element={<Landing />}></Route>
    </Routes>
  )
}

export default App

