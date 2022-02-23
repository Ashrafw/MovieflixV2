import { useState, useEffect } from 'react';
import './MainLanding.css';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import uuid from 'react-uuid';
export default function MainLanding() {
    const urlMain =
        'https://api.themoviedb.org/3/discover/movie?with_genres=28&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1';
    const { data, isPending, error } = useFetch(urlMain);
    const IMG_URL = 'https://image.tmdb.org/t/p/w1280';
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [posterPath, setPosterPath] = useState('');
    const [backdropPath, setBackdropPath] = useState('');
    const [rate, setRate] = useState('');
    const [date, setDate] = useState('');
    const [overview, setOverview] = useState('');
    const [second, setSecond] = useState(0);
    const [count, setCount] = useState(0);
    const [movieId, setMovieId] = useState(0);
    const [ii, setIi] = useState(0);
    const [isShown, setIsShown] = useState(true);

    const [threeMovie, setThreeMovie] = useState([]);

    useEffect(() => {
        if (data) {
            while (threeMovie.length < 3) {
                var r = Math.floor(Math.random() * 19) + 1;
                if (threeMovie.indexOf(r) === -1) threeMovie.push(r);
            }
            setTitle(data.results[count].title);
            setPosterPath(IMG_URL + data.results[count].poster_path);
            setBackdropPath(IMG_URL + data.results[count].backdrop_path);
            setRate(data.results[count].vote_average);
            setDate(data.results[count].release_date);
            setOverview(data.results[count].overview);
            setMovieId(data.results[count].id);
        }
        if (error) {
            setTimeout(() => {
                navigate('/MovieflixV2/');
            }, 3000);
        }
        const interval = setInterval(() => {
            if (!isShown) {
                setSecond(second + 1);
                if (ii < 6) {
                    setCount(ii);
                    setIi(ii + 1);
                } else {
                    setIi(0);
                }
            }
        }, 1500);
        return () => clearInterval(interval);
    }, [data, count, second, isPending, error, isShown]);

    const handleOnClick = (info) => {
        navigate(`/MovieflixV2/movie/${info}`);
    };
    return (
        <div className='main-landing'>
            {/* <div className='landing-info'>
                <h1>Discover brand new drama</h1>
                <h2>The premiere episode of Trigger Point is here</h2>
                <button>More Info</button>
            </div> */}
            <div className='landing-movies'>
                {error && <h1>{error}</h1>}
                {isPending && <h1>Loading...</h1>}
                {data && (
                    <div
                        className='content-landing'
                        id='landing'
                        style={{ backgroundImage: `url("${backdropPath}")` }}
                    >
                        <div className='contain '>
                            <div
                                className='details '
                                onMouseEnter={() => setIsShown(true)}
                                onMouseLeave={() => setIsShown(false)}
                            >
                                <div className='image' id='image'>
                                    <img src={posterPath} alt='' srcSet='' />
                                </div>
                                <div className='info'>
                                    <div className='info-movie'>
                                        <div className='title'>
                                            <h1 id='titleH1'>{title}</h1>
                                        </div>

                                        <h3>
                                            Rating: <span id='rating'>{rate}</span>
                                        </h3>

                                        <p className='overview' id='overview'>
                                            {overview}
                                        </p>
                                        <button onClick={() => handleOnClick(movieId)}>
                                            More Info
                                        </button>
                                    </div>
                                </div>
                                <div className='select-movie'>
                                    <div
                                        onClick={() => {
                                            setCount(0);
                                            setIi(0);
                                        }}
                                        className={
                                            count === 0 ? 'circle selected' : 'circle'
                                        }
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setCount(1);
                                            setIi(1);
                                        }}
                                        className={
                                            count === 1 ? 'circle selected' : 'circle'
                                        }
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setCount(2);
                                            setIi(2);
                                        }}
                                        className={
                                            count === 2 ? 'circle selected' : 'circle'
                                        }
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setCount(3);
                                            setIi(3);
                                        }}
                                        className={
                                            count === 3 ? 'circle selected' : 'circle'
                                        }
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setCount(4);
                                            setIi(4);
                                        }}
                                        className={
                                            count === 4 ? 'circle selected' : 'circle'
                                        }
                                    ></div>
                                    <div
                                        onClick={() => {
                                            setCount(5);
                                            setIi(5);
                                        }}
                                        className={
                                            count === 5 ? 'circle selected' : 'circle'
                                        }
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className='cards-section'>
                            <div className='main-cards container-m'>
                                {threeMovie.map((movieNum) => (
                                    <div className='card' key={uuid()}>
                                        <img
                                            src={
                                                IMG_URL +
                                                data.results[movieNum].backdrop_path
                                            }
                                            alt=''
                                            srcSet=''
                                        />
                                        <h4 id='title-h4'>
                                            {data.results[movieNum].title}
                                        </h4>
                                        <h3>
                                            Rating:{' '}
                                            <span id='rating'>
                                                {data.results[movieNum].vote_average}
                                            </span>
                                        </h3>
                                        <div
                                            className='overlay-init'
                                            onClick={() =>
                                                handleOnClick(data.results[movieNum].id)
                                            }
                                            // onClick={() => handleOnClick(data.results[movieNum].id)}
                                        >
                                            <h3>{data.results[movieNum].title}</h3>
                                            <h5>{data.results[movieNum].release_date}</h5>
                                            <p>
                                                {data.results[
                                                    movieNum
                                                ].overview.substring(0, 140)}
                                            </p>
                                            <p>Click for more...</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
