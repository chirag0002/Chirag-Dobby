import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { Dropdown } from './DropDown';

export const Navbar = () => {

    return <div className="border-b flex justify-between px-10 py-4">
        <Link to="/" className="cursor-pointerflex flex justify-center flex-row items-center font-extrabold text-xl">
            <img className="w-12" src={logo} alt="" />
            <span className='text-white ml-2'>Gallery</span>
        </Link>
        <div className='flex flex-col items-center justify-center'>
            <Dropdown />
        </div>
    </div>
}