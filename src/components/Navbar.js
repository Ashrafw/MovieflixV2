import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
export default function Navbar() {
    const [searchInput, setSearchInput] = useState('');
    const [term, setTerm] = useState('');
    const [showClass, setShowClass] = useState(false);
    const navigate = useNavigate();
    const searchInputFocus = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowClass((prev) => (prev === true ? false : true));
        navigate(`/MovieflixV2/search/${term}`);
    };

    return (
        <div className='navbar'>
            <nav className='container'>
                <ul className='nav-left'>
                    <Link to='/MovieflixV2/' className='logo-site'>
                        {/* <img src='images/itv-emblem.png' alt='' srcset='' /> */}
                        Movie<span>Flix</span>
                    </Link>
                    {/* <Link to='/MovieflixV2/'>TV shows</Link> */}
                    <Link className='nav-link-genre' to='/MovieflixV2/genre/1'>
                        Action
                    </Link>
                    <Link className='nav-link-genre' to='/MovieflixV2/genre/2'>
                        Drama
                    </Link>
                    <Link className='nav-link-genre' to='/MovieflixV2/genre/3'>
                        Crime
                    </Link>
                    <Link className='nav-link-genre' to='/MovieflixV2/genre/5'>
                        Romance
                    </Link>
                    <Link className='nav-link-genre' to='/MovieflixV2/genre/6'>
                        Thriller
                    </Link>
                    <Link className='nav-link-genre' to='/MovieflixV2/genre/4'>
                        Kids
                    </Link>
                </ul>
                <ul className='nav-right'>
                    {/* <Link to='/'>britbox</Link>
                    <Link to='/'>watch ad-free now</Link> */}
                    {/* <Link to='/MovieflixV2/'>
                        {' '}
                        Sign In <i className='fas fa-user-circle '></i>
                    </Link> */}
                    <a
                        className={showClass ? 'show' : ''}
                        onClick={() => {
                            setShowClass((prev) => (prev === true ? false : true));
                            // () => searchInputSet();
                        }}
                    >
                        <i className={`fas fa-search`}></i>
                    </a>
                </ul>
            </nav>

            <form
                className={`form-search-main ${showClass ? 'show' : ''}`}
                onSubmit={handleSubmit}
            >
                <input
                    type='text'
                    placeholder='Search for movies...'
                    id='search'
                    onChange={(e) => setTerm(e.target.value)}
                    autoFocus
                    onFocus={(e) => e.currentTarget.select()}
                    required
                    ref={(inputElement) => {
                        if (inputElement && showClass) {
                            inputElement.focus();
                        }
                    }}
                />
            </form>
        </div>
    );
}
