import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const name = sessionStorage.getItem('name');

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        navigate('/signin');
    };

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)}>
                {
                    name ? (
                        <>
                            <div className='text-2xl text-white rounded-3xl bg-orange-700 w-10 h-10 flex items-center justify-center'>{name[0]}</div>
                        </>
                    ) : (
                        <>
                        </>
                    )
                }
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    <ul className="py-2">
                        <li>
                            <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}