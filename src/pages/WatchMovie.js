import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import _Poster from '../assets/poster.png';
import _Backdrop from '../assets/backdrop.png';
import uuid from 'react-uuid';
import Suggestions from '../components/Suggestions';
import './WatchMovie.css';

import _Pg from '../assets/pg.png';
import _Adult from '../assets/adult.png';

export default function WatchMovie() {
    const { id } = useParams();
    const IMG_URL = 'https://image.tmdb.org/t/p/w1280';
    const Url = `https://api.themoviedb.org/3/movie/${id}?api_key=9c9a236c211df46e640b24f29796b6c0&language=en-US`;
    const { data, isPending, error } = useFetch(Url);
    const [imgBackdrop, setImgBackdrop] = useState(null);
    const [movieGenre, setMovieGenre] = useState(null);
    const [imgPoster, setImgPoster] = useState(null);
    const [rate, setRate] = useState(0);
    const [starts, setStarts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            // console.log('hello');
            setImgBackdrop(IMG_URL + data.backdrop_path);
            setImgPoster(IMG_URL + data.poster_path);
            setMovieGenre(() =>
                data.genres.length > 0 ? data.genres[0].name : data.genres.name
            );
            setRate(Math.floor(data.vote_average / 2));
            let sizeArr = new Array(rate);
            for (let i = 0; i < rate; i++) {
                sizeArr[i] = <i className='fa-solid fa-star'></i>;
            }
            if (rate < 5) {
                for (let i = sizeArr.length; i < 5; i++) {
                    sizeArr[i] = <i className='fa-solid fa-star gray'></i>;
                }
            }
            console.log(movieGenre, data.id);

            setStarts(sizeArr);
        }
        if (error) {
            setTimeout(() => {
                navigate('/MovieflixV2/');
            }, 3000);
        }
    }, [isPending, rate, data, error, imgBackdrop]);

    return (
        <>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {data && (
                <div className='main-movie' key={uuid()}>
                    <div className='movie-img'>
                        <img
                            src={data.backdrop_path === null ? _Backdrop : imgBackdrop}
                            alt=''
                        />
                        <div className='play-icon'>
                            <i className='fa-solid fa-play'></i>
                        </div>
                    </div>

                    <div className='movie-info'>
                        {/* <div className='logo'>{data.id}</div> */}
                        <div className='movie-info-1'>
                            <img
                                src={data.poster_path === null ? _Poster : imgPoster}
                                alt=''
                            />
                            <div className='movie-info-main'>
                                <h1>{data.original_title}</h1>
                                <h2></h2>
                                <p>{data.overview}</p>
                                <h3>Genres: </h3>
                                <ul>
                                    {data.genres.map((gen) => (
                                        <li>{gen.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='movie-info-sec'>
                            {data.adult ? (
                                <img src={_Adult} alt='' />
                            ) : (
                                <img src={_Pg} alt='' />
                            )}
                            <ul>
                                {starts.map((s) => (
                                    <li>{s}</li>
                                ))}
                            </ul>
                            <h3>Release date: {data.release_date}</h3>
                            {/* <h3>Rating: {rate}</h3> */}

                            <h3>
                                Runtime: <span>{data.runtime}min</span>{' '}
                            </h3>
                            <h3>
                                Status: <span>{data.status}</span>{' '}
                            </h3>
                        </div>
                    </div>
                    <hr />
                    <Suggestions movieGenre={movieGenre} />
                </div>
            )}
        </>
    );
}
