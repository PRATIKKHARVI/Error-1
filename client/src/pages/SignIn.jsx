import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx'

export default function SignIn() {
  const [formData,setFormData]=useState({})
  //const [error,setError]=useState(null);
  const {loading,error} = useSelector((state)=> state.user);
  //const [loading, setLoading]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=(e)=> {
    setFormData({
      ...formData,
        [e.target.id]:e.target.value,
    });
  };

  const handleSubmit = async (e)=> {
    e.preventDefault();
    try {
     // setLoading(true);
     dispatch(signInStart());
    const res=await fetch('/api/auth/signin',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data=await res.json();
    if(data.success===false) {
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
    } catch(error) {
      console.log(error);
      dispatch(signInFailure(error.message));
    }
  };
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center text-gold font-semibold 
      my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      
        <input type="text" placeholder='email'
        className='border p-3 rounded-lg text-black' id='email' 
        onChange={handleChange}/>
        <input type="text" placeholder='password'
        className='border p-3 rounded-lg text-black' id='password' 
        onChange={handleChange}/>
        <button disabled={loading} className='bg-black text-gold p-3 rounded-lg uppercase tracking-wider 
        transition duration-200 hover:bg-gold hover:text-black disabled:bg-gray-800 
        disabled:text-gray-400 disabled:cursor-not-allowed'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-gold hover:underline'>Sign up</span>
        </Link>
      </div>
    {error && <p className='text-red-500 mt-5'>{typeof error === 'string' ? error : error.message}</p>}
    </div>
  )
}
