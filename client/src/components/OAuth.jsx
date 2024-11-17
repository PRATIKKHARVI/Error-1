import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { set } from 'mongoose';

function OAuth() {
    const handleGoogleClick=async()=> {
        try {
          const provider=new GoogleAuthProvider()
          const auth=getAuth(app)
          const result= await signInWithPopup(auth,provider)
        } catch (error) {
            console.log('Could not sign in with google', error);
        }
    };
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-black text-gold p-3 rounded-lg uppercase tracking-wider 
        transition duration-200 hover:bg-gold hover:text-black disabled:bg-gray-800 
        disabled:text-gray-400 disabled:cursor-not-allowed'>Continue with google</button>
  )
}

export default OAuth