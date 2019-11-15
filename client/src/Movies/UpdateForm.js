import React, { useState, useEffect } from "react";
import axios from 'axios';

const UpdateForm = props => {

    const [movie, setMovie] = useState({ title: props.item.title, director: props.item.director, metascore: props.item.metascore, stars: props.item.stars });

    const handleChange = event => {
        let value = event.target.value;
        //this is supposed to allow the stars field to take comma seperated names and parse them to their own strings for the stars array in initialMovie.stars
        if (event.target.name === "stars") {
            let sarsArr = value.split(',');
            setMovie({ ...movie, [event.target.name]: sarsArr })
        } else {
            setMovie({ ...movie, [event.target.name]: event.target.value })
        }
    };

    //the guided project example had a useEffect hear to fix a refresh race condition. I'm not sure if that will be needed here, but noting just in case.

    const submitForm = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${props.item.id}`, movie)
            .then(res => {
                props.updateItem(res.data);
                console.log("axios put", res)
            })
            .catch(err => console.log(err));
        props.history.push('');
        setMovie({ title: props.item.title, director: props.item.director, metascore: props.item.metascore, stars: props.item.stars });
    }

    // loading state if we don't have data yet
    if (props.item.length === 0) {
        return <h2>Loading data...</h2>;
    }

    return (
        <div className="movie-card">
            <h2>Update Movie</h2>
            <form onSubmit={submitForm}>
                <input type="text" name="title" value={movie.title} onChange={handleChange} placeholder="Title" />
                <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange} />
                <input type="number" name="metascore" value={movie.metascore} onChange={handleChange} />
                <p>Comma separate stars to add more than one.</p>
                <input type="text" name="stars" placeholder="Stars" value={movie.stars} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

export default UpdateForm;