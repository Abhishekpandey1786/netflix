import { useEffect } from "react";
import axios from "axios";
import { Popular_Movie, options } from '../utils/constant';
import { getPopularMovie } from '../redux/movieSlice';
import { useDispatch } from "react-redux";

const usePopularMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const res = await axios.get(Popular_Movie, options);
                dispatch(getPopularMovie(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchPopularMovies();
    }, [dispatch]);
};

export default usePopularMovies;