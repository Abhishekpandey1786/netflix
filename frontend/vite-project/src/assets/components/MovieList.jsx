import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies, searchMovie = false }) => {
    const safeMovies = Array.isArray(movies) ? movies : [];

    return (
        <div className='px-8'>
            <h1 className={`${searchMovie ? "text-black" : "text-white"} text-3xl py-3`}>{title}</h1>
            <div className='flex overflow-x-auto no-scrollbar cursor-pointer'>
                <div className='flex items-center'>
                    {safeMovies.length > 0 ? (
                        safeMovies.map((movie) => (
                            <MovieCard key={movie.id} movieId={movie.id} posterPath={movie.poster_path} />
                        ))
                    ) : (
                        <p className="text-gray-400">No movies found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieList