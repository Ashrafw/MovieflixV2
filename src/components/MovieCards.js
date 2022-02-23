import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { useFetch } from '../hooks/useFetch';
import OverlayMovie from './OverlayMovie';
import _Poster from '../assets/poster.png';
import _Backdrop from '../assets/backdrop.png';
export default function MovieCards({ url }) {
    const { data, isPending, error } = useFetch('https://' + url);
    // console.log(url);
    const IMG_URL = 'https://image.tmdb.org/t/p/w1280';

    const [title, setTitle] = useState('');
    const [posterPath, setPosterPath] = useState('');
    const [backdropPath, setBackdropPath] = useState('');
    const [rate, setRate] = useState('');
    const [date, setDate] = useState('');
    const [overview, setOverview] = useState('');
    const [count, setCount] = useState(1);
    const [clickedValue, setClickedValue] = useState(false);
    const [clickedId, setClickedId] = useState('');
    const navigate = useNavigate();
    // const widthRef = useRef(null);

    useEffect(() => {
        if (data) {
            setTitle(data.results[count].title);
            setPosterPath(IMG_URL + data.results[count].poster_path);
            setBackdropPath(IMG_URL + data.results[count].backdrop_path);
            setRate(data.results[count].vote_average);
            setDate(data.results[count].release_date);
            setOverview(data.results[count].overview);
        }
        if (error) {
            setTimeout(() => {
                navigate('/MovieflixV2/');
            }, 3000);
        }
    }, [data, count, isPending, error]);

    const handleOnClick = (info) => {
        navigate(`/MovieflixV2/movie/${info}`);
    };
    return (
        <>
            {error && <h1>{error}</h1>}
            {isPending && <h1>Loading...</h1>}
            {data &&
                data.results.map((movie) => (
                    <div className='poster' key={uuid()}>
                        <img
                            src={
                                movie.poster_path === null
                                    ? _Poster
                                    : IMG_URL + movie.poster_path
                            }
                            alt=''
                            srcSet=''
                            onClick={(e) => {
                                if (!clickedValue) {
                                    setClickedValue(true);
                                    setClickedId(movie.title);
                                } else {
                                    setClickedId('');
                                    setClickedValue(false);
                                }
                            }}
                        />
                        <div
                            className='overlay-init'
                            onClick={() => {
                                handleOnClick(movie.id);
                            }}
                        >
                            <h3>{movie.title}</h3>
                            <h5>{movie.release_date}</h5>
                            <p>{movie.overview.substring(0, 200)}</p>
                            <p>Click for more...</p>
                        </div>
                    </div>
                ))}
        </>
    );
}
