import React, { useState } from 'react';
import axios from "axios";
import { SEARCH_MOVIE_URL, options } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import MovieList from './MovieList';

const SearchMovie = () => {
    const [searchMovie, setSearchMovie] = useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.app.isLoading);
    const { movieName, searchedMovie } = useSelector(store => store.searchMovie);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, options);
            const movies = res?.data?.results;
            dispatch(setSearchMovieDetails({ searchMovie, movies }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        setSearchMovie("");
    }

    return (
        <div className="h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-16 px-4 overflow-hidden">
            <form 
                onSubmit={submitHandler} 
                className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-10"
            >
                <div className="flex items-center gap-4">
                    <input
                        value={searchMovie}
                        onChange={(e) => setSearchMovie(e.target.value)}
                        className="flex-1 bg-white/80 text-gray-900 placeholder-gray-500 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-red-500 shadow-inner transition"
                        type="text"
                        placeholder="Search Movies..."
                    />
                    <button
                        className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg px-6 py-3 font-semibold shadow-lg hover:from-red-700 hover:to-red-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Search"}
                    </button>
                </div>
            </form>
            <div className="w-full max-w-4xl flex-1 overflow-y-auto rounded-xl bg-white/5 p-4">
                {searchedMovie && searchedMovie.length > 0 ? (
                    <MovieList title={movieName} searchMovie={true} movies={searchedMovie} />
                ) : (
                    <h1 className="mt-16 text-2xl font-bold text-white bg-red-700/80 px-6 py-3 rounded-lg shadow-lg animate-pulse">
                        Movie Not Found!!
                    </h1>
                )}
            </div>
        </div>
    )
}

export default SearchMovie;