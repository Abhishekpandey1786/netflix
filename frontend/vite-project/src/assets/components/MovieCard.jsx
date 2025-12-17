import React from 'react'
import { TMDB_IMG_URL } from '../utils/constant';
import { useDispatch } from "react-redux";
import { getId, setOpen } from '../redux/movieSlice';

const MovieCard = ({ posterPath, movieId }) => {
  const dispatch = useDispatch();

  if (!posterPath) return null;

  const handleOpen = () => {
    dispatch(getId(movieId));
    dispatch(setOpen(true));
  }

  return (
    <div
      className="w-44 md:w-48 pr-2 cursor-pointer group"
      onClick={handleOpen}
    >
      <div className="relative rounded-xl overflow-hidden border border-gray-800 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-red-700">
        <img
          src={`${TMDB_IMG_URL}/${posterPath}`}
          alt={`Poster for movie ${movieId}`}
          loading="lazy"
          className="w-full h-64 object-cover rounded-xl transition-all duration-300 group-hover:brightness-90"
        />
        {/* Optional: Overlay effect on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  )
}

export default MovieCard;