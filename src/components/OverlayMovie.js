import React from 'react';
import './OverlayMovie.css';
export default function OverlayMovie({
    title,
    date,
    overview,
    clickedValue,
    setClickedValue,
    info,
}) {
    // useEffect(() => {
    //     const handleClick = () => {
    //         setClickedValue(false);
    //     };
    // }, [clickedValue]);
    console.log('hello');

    return (
        <div
            className={clickedValue && info ? 'overlay-movie show' : 'overlay-movie'}
            onClick={() => setClickedValue(false)}
        >
            <i onClick={() => setClickedValue(false)} className='fas fa-window-close'></i>
            <h2>{title}</h2>
            <h3>{date}</h3>
            <p>{overview}</p>
        </div>
    );
}
