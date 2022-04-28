import { css, StyleSheet } from 'aphrodite'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'

function MovieList({ listType, data }) {
  const [favMovieList, setFavMovieList] = useState([])

  async function GetMoviesInFavs() {
    try {
      const response = await axios.get('http://localhost:3001/favourite')
      setFavMovieList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetMoviesInFavs()
  }, [listType])

  function RefreshList() {
    GetMoviesInFavs()
  }

  return (
    <div className={css(styles.MovieListContainer)}>
      {data &&
        data.map((movie) => {
          delete movie.id
          return (
            <MovieCard
              movie={movie}
              RefreshFavsList={RefreshList}
              MovieInFavs={favMovieList}
            />
          )
        })}
      {!data && <h1>NOT RESULT FOUND</h1>}
    </div>
  )
}

export default MovieList

const styles = StyleSheet.create({
  MovieListContainer: {
    // backgroundColor: 'grey ',
    display: 'flex',
    // margin: '0 auto',
    // position: 'absolute',
    // width: '85%',
    float: 'right',
    height: '100% ',
    // border: '1px solid black',
    borderRadius: '10px',
    fontFamily:
      'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif !important',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflowX: 'hidden',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
})
