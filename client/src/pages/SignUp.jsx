import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';
export default function SignUp() {
  const [formData,setFormData]=useState({})
  const [error,setError]=useState(null);
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();
  const handleChange=(e)=> {
    setFormData({
      ...formData,
        [e.target.id]:e.target.value,
    });
  };
  const handleSubmit = async (e)=> {
    e.preventDefault();
    try {
      setLoading(true);
    const res=await fetch('/api/auth/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data=await res.json();
    if(data.success===false) {
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
    } catch(error) {
      setLoading(false);
      setError(error.message);
    }
  };
  
  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl text-center text-gold font-semibold 
      my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='username'
        className='border p-3 rounded-lg text-black' id='username' 
        onChange={handleChange}/>
        <input type="email" placeholder='email'
        className='border p-3 rounded-lg text-black' id='email' 
        onChange={handleChange}/>
        <input type="password" placeholder='password'
        className='border p-3 rounded-lg text-black' id='password' 
        onChange={handleChange}/>
        <button disabled={loading} className='bg-black text-gold p-3 rounded-lg uppercase tracking-wider 
        transition duration-200 hover:bg-gold hover:text-black disabled:bg-gray-800 
        disabled:text-gray-400 disabled:cursor-not-allowed'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-gold hover:underline'>Sign in</span>
        </Link>
      </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
