import React from 'react'
import {Routes,Route} from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Start from './pages/Start';
import Home from './pages/Home';
import UserLogout from './pages/UserLogout';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper';
import Riding from './pages/Riding';
import CaptainRiding from './pages/CaptainRiding';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element={<Start/>}/>
        <Route path = '/home' element={
          <UserProtectedWrapper>
            <Home/>
        </UserProtectedWrapper>}/>
        <Route path = '/captain-riding' element={
           <CaptainProtectedWrapper><CaptainRiding/></CaptainProtectedWrapper>
          
          }/>
        <Route path = '/login' element={<UserLogin/>}/>
        <Route path='/riding' element={<UserProtectedWrapper><Riding/></UserProtectedWrapper>
          }></Route>
        <Route path = '/signup' element={<UserSignup/>}/>
        <Route path = '/captain-login' element={<CaptainLogin/>}/>
        <Route path = '/captain-signup' element={<CaptainSignup/>}/>
        <Route path= '/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout/>
          </UserProtectedWrapper>
        }></Route>
        <Route path='/captain-home' element={
          <CaptainProtectedWrapper>
          <CaptainHome/>
          </CaptainProtectedWrapper>}></Route>
      </Routes>
    </div>
  )
}

export default App