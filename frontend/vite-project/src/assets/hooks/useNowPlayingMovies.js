import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getNowPlayingMovies } from "../redux/movieSlice";
import { Now_Playing_Movie, options } from "../utils/constant";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchNowPlayingMovies = async () => {
            try {
                const res = await axios.get(Now_Playing_Movie, options);
                dispatch(getNowPlayingMovies(res.data.results));
            } catch (error) {
                console.log(error);
            }
        };
        fetchNowPlayingMovies();
    }, [dispatch]);
};

export default useNowPlayingMovies;