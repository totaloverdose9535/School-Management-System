import React from 'react'

export default function Pagination({ totalPosts, postPerPage, setCurrentPage }) {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pages.push(i)
    }
    return (
        <div>
            {
                pages.map((page, index) => {
                    return <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold ml-3 py-2 px-3 rounded-md"
                        onClick={() => setCurrentPage(page)}
                        key={index}>
                        {page}
                    </button>
                })
            }
        </div>
    )
}
