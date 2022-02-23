import { useState, useEffect } from 'react';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
// import OverlayMovie from '../../components/OverlayMovie';
import './GenrePage.css';
import Pagination from '../components/Pagination';
import uuid from 'react-uuid';
import _Poster from '../assets/poster.png';
import _Backdrop from '../assets/backdrop.png';

const SEARCH_URL =
    'https://api.themoviedb.org/3/search/movie?api_key=9c9a236c211df46e640b24f29796b6c0&query=';

export default function Search() {
    console.log('searchid');
    const { searchid } = useParams();

    const IMG_URL = 'https://image.tmdb.org/t/p/w1280';

    const [selectedGenreUrl, setSelectedGenreUrl] = useState(SEARCH_URL + searchid);
    const [title, setTitle] = useState('');
    const [posterPath, setPosterPath] = useState('');
    const [backdropPath, setBackdropPath] = useState('');
    const [rate, setRate] = useState('');
    const [date, setDate] = useState('');
    const [overview, setOverview] = useState('');
    const [clickedValue, setClickedValue] = useState(false);
    const [clickedId, setClickedId] = useState('');
    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [searchFound, setSearchFound] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);
    const [pageInit, setPageInit] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { data, isPending, error } = useFetch(selectedGenreUrl);
    // console.log(selectedGenreUrl);
    useEffect(() => {
        // setSelectedGenreUrl(list.url + '&page=' + pageNumber);
        setSelectedGenreUrl(SEARCH_URL + searchid + '&page=' + pageNumber);
        if (data && data.results.length != 0) {
            setTitle(data.results[count].title);
            setPosterPath(IMG_URL + data.results[count].poster_path);
            setBackdropPath(IMG_URL + data.results[count].backdrop_path);
            setRate(data.results[count].vote_average);
            setDate(data.results[count].release_date);
            setOverview(data.results[count].overview);
            // setTotalPageNumberUrl(data.total_pages);
            setTotalPages(data.total_pages > 500 ? 500 : data.total_pages);
            setSearchFound(true);
        } else if (data && data.results.length === 0) {
            setSearchFound(false);
        }
        if (error) {
            setTimeout(() => {
                navigate('/MovieflixV2');
            }, 3000);
        }
    }, [searchid, data, error, count, navigate, pageNumber]);
    const handleOnClick = (info) => {
        navigate(`/MovieflixV2/movie/${info}`);
    };

    return (
        <div className='genre-page container-s'>
            {searchFound && (
                <>
                    <div className='genre-page-info searchId'>
                        {isPending && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                        {data && (
                            <>
                                <h1>
                                    Search result for: <span>{searchid}</span>
                                </h1>
                                <Pagination
                                    pageNumber={pageNumber}
                                    setPageNumber={setPageNumber}
                                    pageInit={pageInit}
                                    setPageInit={setPageInit}
                                    totalPages={totalPages}
                                />
                            </>
                        )}
                    </div>

                    <div className='genre-section'>
                        {isPending && <div>Loading...</div>}
                        {error && <div>{error}</div>}
                        {data &&
                            data.results.map((movie) => (
                                <div className='movie' key={uuid()}>
                                    {/* <OverlayMovie
                                title={movie.title}
                                date={movie.release_date}
                                overview={movie.overview}
                                clickedValue={clickedValue}
                                setClickedValue={setClickedValue}
                                info={clickedId === movie.title ? true : false}
                            /> */}
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
                                        onClick={() => handleOnClick(movie.id)}
                                    >
                                        <h3>{movie.title}</h3>
                                        <h5>{movie.release_date}</h5>
                                        <p>{movie.overview.substring(0, 300)}</p>
                                        <h5>Click for more...</h5>
                                    </div>
                                    <div className='movie-info'>
                                        <h5>{movie.title}</h5>
                                        <div className='movie-info-sec'>
                                            <p>{movie.release_date}</p>
                                            <span>{movie.vote_average}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </>
            )}
            {!searchFound && (
                <div className='genre-page-info searchId marginBig'>
                    <h1>
                        No Search results for: <span>{searchid}</span>
                    </h1>
                </div>
            )}
        </div>
    );
}
