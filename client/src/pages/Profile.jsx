import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center text-gold font-semibold 
      my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
    <img src={currentUser.avatar} alt="profile"
    className="rounded-full h-24 w-24 object-cover
    cursor-pointer self-center mt-2"/>
    <input type="text" placeholder="username" 
    id='username'className="border p-3 rounded-lg"/>
    <input type="email" placeholder="email" 
    id='email' className="border p-3 rounded-lg"/>
    <input type="password" placeholder="password" 
    id='password' className="border p-3 rounded-lg"/>
    <button className='bg-black text-gold p-3 rounded-lg uppercase tracking-wider 
        transition duration-200 hover:bg-gold hover:text-black disabled:bg-gray-800 
        disabled:text-gray-400 disabled:cursor-not-allowed'>update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}
