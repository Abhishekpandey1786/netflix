import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "../src/assets/redux/store" // ✅ your redux store
import Login from './assets/components/Login';
import Browse from './assets/components/Browse';
import Body from './assets/components/Body';
import toast, { Toaster } from 'react-hot-toast';
import MovieDialog from './assets/components/MovieDialog';

function App() {
  return (
    <Provider store={store}>   {/* ✅ Wrap entire app */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/browse" element={<Browse />} />
          
        </Routes>
         <Body/>
       <Toaster/>  
       <MovieDialog/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
