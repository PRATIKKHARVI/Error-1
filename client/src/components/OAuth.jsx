import React from 'react';
import {supabase} from '../supabase.js'
import {useDispatch} from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

export default function OAuth() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
    const handleGoogleClick=async()=> {
        try {
          const {data,error} =await supabase.auth.signInWithOAuth({
            provider: 'google',
          });
          if(error) {
            throw new Error('Google Sign-In failed: '+error.message);
          }
          const accessToken = data.session.access_token;
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ access_token: accessToken }),
          });
          if (res.ok) {
            const responseData = await res.json();
            dispatch(signInSuccess(responseData)); // Dispatch to Redux
            navigate('/'); // Redirect to the home page
          } else {
            const errorData = await res.json();
            console.log('Error from backend:', errorData);
            alert('Authentication failed. Please try again!');
          }
        } catch (error) {
          console.log('Could not sign in with Google:', error.message);
        }
      };
      return (
    <button onClick={handleGoogleClick} type='button' className='bg-black text-gold p-3 rounded-lg uppercase tracking-wider 
        transition duration-200 hover:bg-gold hover:text-black disabled:bg-gray-800 
        disabled:text-gray-400 disabled:cursor-not-allowed'>Continue with google</button>
  );
}  