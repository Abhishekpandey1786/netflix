import React from 'react'
import useMovieById from '../hooks/useMovieById';
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId, bool = false }) => {
    const trailerMovie = useSelector(store => store.movie.trailerMovie);

    useMovieById(movieId);

    // Agar trailerMovie ya trailerMovie.key nahi hai toh kuch bhi render na karein
    if (!trailerMovie?.key) return null;

    return (
        <div className='w-screen overflow-hidden'>
            <iframe
                className={bool ? "w-full" : "w-screen aspect-video"}
                src={`https://www.youtube.com/embed/${trailerMovie.key}?si=HorxQfzFY2_TAO1W&autoplay=1&mute=1`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
            />
        </div>
    );
}

export default VideoBackground