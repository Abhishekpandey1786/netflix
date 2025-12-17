import React from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { API_END_POINT } from '../utils/constant';
import axios from "axios";
import { setUser } from '../redux/userSlice';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from '../redux/movieSlice';

const Header = () => {
    const user = useSelector((store) => store.app.user);
    const toggle = useSelector(store => store.movie.toggle);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`);
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(null));
                navigate("/");
            } else {
                toast.error("Logout failed!");
            }
        } catch (error) {
            toast.error("Logout failed!");
            console.log(error);
        }
    }

    const toggleHandler = () => {
        dispatch(setToggle());
    }

    return (
        <header className="fixed top-0 left-0 w-full z-20 bg-gradient-to-b from-black/90 via-black/70 to-transparent backdrop-blur-md shadow-lg border-b border-gray-800">
            <div className="flex items-center justify-between px-8 py-3">
                <img
                    className="w-44 md:w-56 drop-shadow-lg"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
                    alt="netflix-logo"
                />
                <img  className="w-10 md:w-15 drop-shadow-lg rounded-full bg-amber-50"
                src="src\images\Shrii A J Tech Logo Design.png" alt="" />
                {user && (
                    <div className="flex items-center gap-3">
                        <IoIosArrowDropdown size="28px" color='white' className="mr-1" />
                        <h1 className="text-lg font-semibold text-white mr-3">{user.fullName}</h1>
                        <button
                            type="button"
                            onClick={logoutHandler}
                            className="bg-gradient-to-r from-red-700 to-red-900 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:scale-105 hover:from-red-800 hover:to-red-950 transition-all duration-200"
                        >
                            Logout
                        </button>
                        <button
                            type="button"
                            onClick={toggleHandler}
                            className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:scale-105 hover:from-gray-800 hover:to-black transition-all duration-200 ml-2"
                        >
                            {toggle ? "Home" : "Search Movie"}
                        </button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;