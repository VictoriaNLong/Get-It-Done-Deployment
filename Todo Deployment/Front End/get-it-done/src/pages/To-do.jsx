import { useEffect, useState } from 'react';
import '../App.css';
import Daily from '../components/Daily';
import TopBar from '../components/TopBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Todo() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  const getUser = async() => {
    try{
      const {data} = await axios.get('/users/me')
      setUser(data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout');
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return null;

  return (
    <div className="Todo">
      <button type="button" className='logout-button' onClick={handleLogout}>
          LOGOUT
        </button>
      <TopBar />
      <div className='user-info'>
        <h2 className='title'>Hi {user.name}!</h2>
        <h3>Lets get some work done</h3>
      </div>
      
      <div className='Todo-body'><Daily /></div>
    </div>
  );
}

export default Todo;