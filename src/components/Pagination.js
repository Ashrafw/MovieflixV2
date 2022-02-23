import React from 'react';
import './Pagination.css';

export default function Pagination({
    pageNumber,
    setPageNumber,
    pageInit,
    setPageInit,
    totalPages,
}) {
    return (
        <div className='pagination'>
            <button
                onClick={() => {
                    setPageInit(1);
                    setPageNumber(1);
                }}
                className={pageNumber === '>' ? 'active-page' : ''}
                style={{ display: pageNumber > 9 ? 'block' : 'none' }}
            >
                <i className='fa-solid fa-chevron-left'></i>
                <i className='fa-solid fa-chevron-left'></i>
            </button>
            <button
                onClick={() => setPageInit((prev) => (prev < 7 ? 1 : prev - 3))}
                className={pageNumber === '>>' ? 'active-page' : ''}
                style={{ display: pageInit > 1 ? 'block' : 'none' }}
            >
                <i className='fa-solid fa-chevron-left'></i>
            </button>
            <button
                onClick={() => {
                    if (pageInit > 3) {
                        setPageInit((prev) => prev - 3);
                    }
                    setPageNumber(pageInit);
                }}
                className={pageNumber === pageInit ? 'active-page' : ''}
            >
                {pageInit}
            </button>
            <button
                onClick={() => setPageNumber(pageInit + 1)}
                className={pageNumber === pageInit + 1 ? 'active-page' : ''}
            >
                {pageInit + 1}
            </button>
            <button
                onClick={() => setPageNumber(pageInit + 2)}
                className={pageNumber === pageInit + 2 ? 'active-page' : ''}
            >
                {pageInit + 2}
            </button>
            <button
                onClick={() => setPageNumber(pageInit + 3)}
                className={pageNumber === pageInit + 3 ? 'active-page' : ''}
            >
                {pageInit + 3}
            </button>
            <button
                onClick={() => setPageNumber(pageInit + 4)}
                className={pageNumber === pageInit + 4 ? 'active-page' : ''}
            >
                {pageInit + 4}
            </button>
            <button
                onClick={() => setPageNumber(pageInit + 5)}
                className={pageNumber === pageInit + 5 ? 'active-page' : ''}
            >
                {pageInit + 5}
            </button>
            <button
                onClick={() => {
                    setPageInit((prev) => (prev > totalPages - 9 ? prev : prev + 3));
                    setPageNumber(pageInit + 6);
                }}
                className={pageNumber === pageInit + 6 ? 'active-page' : ''}
            >
                {pageInit + 6}
            </button>
            <button
                onClick={() =>
                    setPageInit((prev) => (prev + 8 > 500 - 6 ? 500 - 6 : prev + 8))
                }
                className={pageNumber === '>' ? 'active-page' : ''}
                style={{ display: pageInit < 500 - 6 ? 'block' : 'none' }}
            >
                <i className='fa-solid fa-chevron-right'></i>
            </button>
            <button
                onClick={() => {
                    // setPageNumber(totalPages);
                    setPageInit(totalPages - 6);
                }}
                className={pageNumber === '>>' ? 'active-page' : ''}
                style={{ display: pageInit < 500 - 9 ? 'block' : 'none' }}
            >
                <i className='fa-solid fa-chevron-right'></i>
                <i className='fa-solid fa-chevron-right'></i>
            </button>
        </div>
    );
}
