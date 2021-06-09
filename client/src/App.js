import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';

import MovieHeader from './components/MovieHeader';

import EditMovieForm from './components/EditMovieForm';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { push } = useHistory()

  useEffect(()=>{
    axios.get('http://localhost:5000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id)=> {
    console.log(`delete movie id ${id}`)
    // const newMovies = movies.filter((item) => {
    //   console.log('hellllo', item)
    //   return item !== itemToDelete
    // })

    // const removeMovie = movies.map(function(item) {
    //   return item.id
    // }).indexOf(id)
    // console.log(movies)
    
    // setMovies(newMovies)
    // console.log('newmovies', newMovies)
    // axios
    //   .delete(`http://localhost:5000/api/movies/${id}`)
    //   .then(res => {
    //     // setMovies(movies)
    //     console.log(res)
        
    //     push('/movies')
    //   })
    //   .catch(err => {
    //     console.log('deleteMovie err:', err)
    //   })
    push('/movies')
  }

  // const addToFavorites = (movie) => {
    
  // }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" ><img width="40px" alt="" src="./Lambda-Logo-Red.png"/> HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovieForm {...props} movies={movies} setMovies={setMovies} />
            </Route>

            <Route path="/movies/:id">
              <Movie movies={movies} setMovies={setMovies} deleteMovie={deleteMovie} />
            </Route>

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

