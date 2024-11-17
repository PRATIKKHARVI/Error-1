import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '/src/index.css' 
function Header() {
  return (
    <header className='bg-black shadow-lg'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to='/'>
        <h1 className='font-bold text-lg sm:text-2xl flex flex-wrap'>
            <span className='prp-highlight'>TradeX</span>
            <span className='text-white'> Camp</span>
        </h1>
        </Link>
        <form className='bg-gray-800 p-3 rounded-lg flex items-center'>
            <input 
            type='text' 
            placeholder='Search...' 
            className='bg-transparent text-white placeholder-gray-400 focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-gold'/>
        </form>
        <ul className='flex gap-6'>
            <Link to='/'>
            <li className='hidden sm:inline text-white hover:text-gold transition-colors duration-300'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='hidden sm:inline text-white hover:text-gold transition-colors duration-300'>About</li>
            </Link>
            <Link to='/sign-in'>
            <li className='hidden sm:inline text-white hover:text-gold transition-colors duration-300'>Sign in</li>
            </Link>
        </ul>
        </div>
    </header>
  )
}

export default Header