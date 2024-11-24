import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase.js'; // Import Supabase client
import {
 // updateUserStart,
 // updateUserSuccess,
 // updateUserFailure,
  //deleteUserFailure,
  //deleteUserStart,
  //deleteUserSuccess,
  //signOutUserStart,
} from '../redux/user/userSlice';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    try {
      const fileName = `${currentUser.id}/${new Date().getTime()}-${file.name}`;
      
      // Upload file to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('TradeCamp') // Replace with your bucket name
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          onProgress: (progressEvent) => {
            // Calculate progress percentage
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setFilePerc(progress);
          },
        });
  
      if (uploadError) throw uploadError;
  
      // Get public URL of the uploaded file
      const { data: urlData, error: urlError } = supabase.storage
        .from('TradeCamp') // Ensure the correct bucket name
        .getPublicUrl(fileName);
  
      if (urlError) throw urlError;
  
      const publicURL = urlData.publicUrl;
  
      // Update the form data with the public URL
      setFormData({ ...formData, avatar: publicURL });
    } catch (error) {
      console.error('File upload error:', error.message);
      setFileUploadError(true);
    }
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const { data, error } = await supabase
        .from('users') // Replace 'users' with your table name
        .update(formData)
        .eq('id', currentUser.id);

      if (error) throw error;

      dispatch(updateUserSuccess(data[0]));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const { error } = await supabase
        .from('users') // Replace 'users' with your table name
        .delete()
        .eq('id', currentUser.id);

      if (error) throw error;

      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const { data, error } = await supabase
        .from('listings') // Replace 'listings' with your table name
        .select('*')
        .eq('user_id', currentUser.id);

      if (error) throw error;

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const { error } = await supabase
        .from('listings') // Replace 'listings' with your table name
        .delete()
        .eq('id', listingId);

      if (error) throw error;

      setUserListings((prev) =>
        prev.filter((listing) => listing.id !== listingId)
      );
    } catch (error) {
      console.error('Delete listing error:', error.message);
    }
  };
  return ( 
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center text-gold font-semibold 
      my-7'>Profile</h1>
    <form className="flex flex-col gap-4">
      <input 
      onChange={(e)=>setFile(e.target.files[0])}
      type="file" 
      ref={fileRef} hidden accept="img/*"/>
    <img onClick={()=>fileRef.current.click()} src={currentUser.avatar} alt="profile"
    className="rounded-full h-24 w-24 object-cover
    cursor-pointer self-center mt-2"/>
    <p>
      {fileUploadError ? 
    (<span className='text-red-700'>Error Image upload
    </span>) :
    filePerc >0 && filePerc<100 ? (
    <span className='text-slate-700'>
      {`uploading ${filePerc}%`}
    </span>)
    :
    filePerc===100 ? (
    <span className='text-green-700'>Successfully uploaded!</span>)
    :
    ""
    }
    </p>
    <input 
    type="text" 
    placeholder="username" 
    defaultValue={currentUser.username}
    id='username'
    className="border p-3 rounded-lg"
    onChange={handleChange}
    />
    <input 
    type="email" 
    placeholder="email" 
    id='email' 
    defaultValue={currentUser.email}
    className="border p-3 rounded-lg"
    onChange={handleChange}
    />
    <input 
    type="password" 
    placeholder="password" 
    onChange={handleChange}
    id='password' 
    className="border p-3 rounded-lg"
    />
    <button 
    disabled={loading}
    className='bg-black text-gold p-3 rounded-lg uppercase tracking-wider 
        transition duration-200 hover:bg-gold hover:text-black disabled:bg-gray-800 
        disabled:text-gray-400 disabled:cursor-not-allowed'
        >{loading?'Loading...':'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}
