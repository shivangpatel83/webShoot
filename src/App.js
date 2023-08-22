import './App.css';
import { Capture } from './components/capture/Capture';
import {Provider} from "react-redux";
import { Store } from './store';
import { Display } from './components/display/Display';
import { Route, Routes } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <>     
    <Provider store={Store}>
    <ToastContainer autoClose={1000} position={"top-center"} hideProgressBar={true}/>
      <Routes>
        <Route path='/' element={<Capture/>}/>
        <Route path='/images' element={<Display/>}/>
      </Routes>
      </Provider>
    </>
  );
}

export default App;
