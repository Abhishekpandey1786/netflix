import React from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground';
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector(store => store.movie?.nowPlayingMovies);

  // Safety: movies array exist kare aur kam se kam 5 movies ho
  if (!Array.isArray(movies) || movies.length < 5) return null;

  const { overview, id, title } = movies[4];

  return (
    <div>
      <VideoTitle title={title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  )
}

export default MainContainer