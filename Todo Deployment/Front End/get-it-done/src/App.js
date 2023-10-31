import './App.css';
import AuthRoute from './components/AuthRoute';
import Login from "./pages/Login";
import Register from './pages/Register';
import Todo from "./pages/To-do";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import {Toaster} from 'react-hot-toast'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute />}>
        <Route path="/" element={<Todo />} />
        </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
