import './Genres.css';
// import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import MovieCards from './MovieCards';
import useSliding from '../hooks/useSliding';
import useSizeElement from '../hooks/useSizeElement';

const genreObj = [
    {
        id: 1,
        genre: 'Action',
        url: 'api.themoviedb.org/3/discover/movie?with_genres=28&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1',
    },
    {
        id: 2,
        genre: 'Drama',
        url: 'api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1',
    },
    {
        id: 3,
        genre: 'Crime',
        url: 'api.themoviedb.org/3/discover/movie?with_genres=80&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1',
    },
    {
        id: 4,
        genre: 'Children',
        url: 'api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1',
    },
    {
        id: 5,
        genre: 'Romance',
        url: 'api.themoviedb.org/3/discover/movie?with_genres=10749&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1',
    },
    {
        id: 6,
        genre: 'Thriller',
        url: 'api.themoviedb.org/3/discover/movie?with_genres=53&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1',
    },
];

export default function Genres() {
    const [width, setWidth] = useState(0);
    const [move, setMove] = useState(0);
    const [movement, setMovement] = useState(10);
    const [event, setEvent] = useState([
        {
            id: 1,
            translation: 0,
            movement: 0,
            genre: 'Action',
            url: 'api.themoviedb.org/3/discover/movie?with_genres=28&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1',
        },
        {
            id: 2,
            translation: 0,
            movement: 0,
            genre: 'Drama',
            url: 'api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1',
        },
        {
            id: 3,
            translation: 0,
            movement: 0,
            genre: 'Crime',
            url: 'api.themoviedb.org/3/discover/movie?with_genres=80&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1',
        },
        {
            id: 4,
            translation: 0,
            movement: 0,
            genre: 'Children',
            url: 'api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1',
        },
        {
            id: 5,
            translation: 0,
            movement: 0,
            genre: 'Romance',
            url: 'api.themoviedb.org/3/discover/movie?with_genres=10749&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1',
        },
        {
            id: 6,
            translation: 0,
            movement: 0,
            genre: 'Thriller',
            url: 'api.themoviedb.org/3/discover/movie?with_genres=53&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=1',
        },
    ]);
    const ref = useRef(0);
    // const componentWidth = useRef();

    // console.log(event);

    useLayoutEffect(() => {
        if (ref.current.clientWidth != width) {
            setWidth(ref.current.clientWidth);
            console.log('width is: ', width);
        } else {
            console.log('width is no changed: ', width);
        }
    }, [ref.current]);
    const moveRight = (e) => {
        console.log('ref clientWidth:', width);
        console.log('New Movement');

        setEvent((prevEvent) => {
            return prevEvent.filter((event) => {
                if (event.genre === e) {
                    console.log('moved by:', -width * 0.7);
                    event.movement = event.movement - width * 0.7;
                    console.log('movement: ', event.movement);
                    return (event.translation = event.translation - width * 0.7);
                } else {
                    return true;
                }
            });
        });
    };
    const moveLeft = (e) => {
        setEvent((prevEvent) => {
            return prevEvent.filter((event) => {
                if (event.genre === e) {
                    console.log('event.translation: ', event.translation);
                    console.log('moved by: ', width * 0.7);
                    event.movement = event.movement - width * 0.7;
                    console.log('movement: ', event.movement);

                    return (event.translation = event.translation + width * 0.7);
                } else {
                    return true;
                }
            });
        });
    };
    return event.map((section) => (
        <>
            <div className='genres' key={section.genre} id={section.genre}>
                <div className='genre-titles'>
                    <Link to={`/genre/${section.id}`}>
                        {section.genre}
                        <div className='explore'>
                            Explore <i className='fas fa-chevron-right'></i>
                        </div>
                    </Link>
                </div>
                <div className='posters'>
                    <div
                        className='chevron-left'
                        onClick={(e) => moveLeft(section.genre)}
                    >
                        <i className='fa-solid fa-chevron-left'></i>
                    </div>
                    <div
                        className='posters-section'
                        ref={ref}
                        style={{ transform: `translate(${section.translation}px)` }}
                    >
                        <MovieCards
                            url={section.url}
                            genre={section.genre}
                            width={width}
                            setWidth={setWidth}
                        />
                    </div>
                    <div
                        className='chevron-right'
                        onClick={(e) => moveRight(section.genre)}
                    >
                        <i className='fa-solid fa-chevron-right'></i>
                    </div>
                </div>
            </div>
            <hr />
        </>
    ));
}
