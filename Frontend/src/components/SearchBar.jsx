import React, { useState } from 'react';
import axios from "axios";

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [movie, setMovie] = useState(null);

    const searchHandler = (ev) => {
        setSearch(ev.target.value);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
    };

    const fetchfunc = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/movies/${search}`);
            setMovie(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className='flex flex-col mt-10 text-white font-medium'>
            <div>
                <form 
                    onSubmit={handleSubmit}
                    className='flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2' // **Responsive layout for form**
                >
                    <input
                        type="text"
                        value={search}
                        onChange={searchHandler}
                        className='pl-5 rounded-lg p-2 w-full sm:w-2/3 focus:outline-none text-black' // **Full width on small screens, specific width on larger screens**
                        placeholder='Enter the name of the movie'
                    />
                    <button 
                        onClick={fetchfunc}
                        className='bg-green-400 w-full sm:w-1/4 rounded p-2' // **Full width on small screens, specific width on larger screens**
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Movie details */}
            {movie ? (
                <div className='mr-2     w-full mt-10 flex p-10 bg-zinc-700 rounded-lg flex font-thin'>
                    <div className='flex-2 mr-4'>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} className='mt-2 w-45 h-45 object-contain rounded-lg' /> 
                    </div>

                    <div className=''>
                    <h2 className='text-7xl font-bold tracking-tighter m-3'>{movie.Title} ({movie.Year})</h2>
                    <div className='w-full bg-stone-500 h-1'></div> 
                    <div className='flex mt-4 '>
                        <p className='flex-col justify-center font-semibold tracking-tight text-lg mr-4'>Director : </p>
                        <p className='flex-col justify-center font-normal tracking-tight text-lg'>{movie.Director}</p>
                    </div>
                    <div className='flex '>
                        <p className='flex-col justify-center font-semibold tracking-tight text-lg mr-4'>Plot : </p>
                        <p className='flex-col justify-center font-normal tracking-tight text-lg'>{movie.Director}</p>
                    </div>
                    <div className='flex  '>
                        <p className='flex-col justify-center font-semibold tracking-tight text-lg mr-4'>Genre : </p>
                        <p className='flex-col justify-center font-normal tracking-tight text-lg'>{movie.Genre}</p>
                    </div>
                    <div className='flex  '>
                        <p className='flex-col justify-center font-semibold tracking-tight text-lg mr-4'>Language:  </p>
                        <p className='flex-col justify-center font-normal tracking-tight text-lg'>{movie.Language}</p>
                    </div>
                    <p><strong>Language:</strong> {movie.Language}</p>
                    <p><strong>Country:</strong> {movie.Country}</p>
                    <p><strong>Runtime:</strong> {movie.Runtime}</p>
                    <p><strong>Actors:</strong> {movie.Actors}</p>
                    <p><strong>Awards:</strong> {movie.Awards}</p>
                    <h3 className='mt-4'>Ratings:</h3>
                    <ul className='list-disc pl-5'>
                        {movie.Ratings.map((rating, index) => (
                            <li key={index}>
                                <strong>{rating.Source}:</strong> {rating.Value}
                            </li>
                        ))}
                    </ul>

                    <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                    <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
                    </div>
                </div>
            ) : (
                <p className='mt-4'>No results found</p>
            )}
        </div>
    );
};

export default SearchBar;
