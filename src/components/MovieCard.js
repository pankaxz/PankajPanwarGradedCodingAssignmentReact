import React, { useEffect, useRef, useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import axios from 'axios'

function MovieCard(props) {
  const [isAddedToFav, setIsAddedToFav] = useState(false)

  async function CheckMovieExistsInFavs(movie) {
    let movieExists
    try {
      let moviesInFavs = await axios.get('http://localhost:3001/favourite')
      moviesInFavs = moviesInFavs.data

      let filterMovies = moviesInFavs.filter((movieInFavs) => {
        return movieInFavs.title
          .toLowerCase()
          .includes(movie.title.toLowerCase())
      })

      if (filterMovies.length >= 1) movieExists = true
      else movieExists = false

      return movieExists
    } catch (error) {
      console.log(error)
    }
  }

  async function AddToFav() {
    let movieExists = await CheckMovieExistsInFavs(props.movie)
    if (!movieExists) {
      try {
        const response = await axios.post(
          'http://localhost:3001/favourite',
          props.movie
        )
        setIsAddedToFav(true)
        return response
      } catch (error) {
        console.log(error)
        throw new Error('SOMETHING WENT WRONG WHILE ADDING')
      }
    }
  }

  async function RemovefromFav() {
    console.log('remove')
    let movieExists = await CheckMovieExistsInFavs(props.movie)
    if (movieExists) {
      console.log('inside if block : ', props.movie)

      try {
        const response = await axios.delete('http://localhost:3001/favourite')
        console.log(response)
        setIsAddedToFav(false)
        return response
      } catch (error) {
        console.log(error)
        throw new Error('SOMETHING WENT WRONG WHILE ADDING')
      }
    }
  }
  useEffect(() => {
    console.log(isAddedToFav)
  }, [isAddedToFav])
  return (
    <>
      <div className={css(styles.CardContainer)}>
        <div className={css(styles.CardImageContainer)}>
          <div className={css(styles.ButtonContainer)}>
            {/* {!isAddedToFav && ( */}
            <button
              className={css(styles.AddToCartContainer)}
              onClick={AddToFav}
            >
              <span>Add to favourites 🤍</span>
            </button>
            {/* )} */}
            {/* {isAddedToFav && ( */}
            <button
              className={css(styles.AddToCartContainer)}
              onClick={RemovefromFav}
            >
              <span>Remove from favourites 🤍</span>
            </button>
            {/* )} */}
          </div>

          <img
            className={css(styles.productImage)}
            src={props.movie.poster}
            alt={props.movie.title}
          ></img>
        </div>

        <div className={css(styles.InfoContainer)}>
          <div className={css(styles.ProductName)}>{props.movie.title}</div>
        </div>
      </div>
    </>
  )
}

export default MovieCard

const styles = StyleSheet.create({
  CardContainer: {
    display: 'inline-block',
    width: 'min-content',
    borderRadius: '5px',
    height: 'auto',
    margin: '10px',
    border: '1px solid black',
    ':hover': {
      backgroundColor: '#eceff0',
    },
  },

  InfoContainer: {
    display: 'inline-block',
    width: '90%',
    height: '90%',
    margin: '5px',
  },

  ButtonContainer: {
    top: '10px',
    display: 'flex',
    width: '100%',
    height: '100%',
  },

  WishlistContainer: {
    display: 'block',
    border: '1px solid black',
    margin: '12px 2px',
    background: 'none',
    color: 'inherit',
    padding: '10px',
    float: 'right',
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    ':hover': {
      backgroundColor: 'black',
    },
  },

  AddToCartContainer: {
    border: '1px solid black',
    display: 'block',
    margin: '12px 2px',
    background: 'none',
    color: 'inherit',
    padding: '20px',
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    ':hover': {
      backgroundColor: '#1c1e21',
      color: 'white',
    },
    '::after': {
      backgroundColor: '#1c1e21',
      color: 'white',
    },
  },

  CardImageContainer: {
    display: 'inline-block',
    height: '90%',
    margin: '5px',
  },

  ProductName: {
    fontSize: '20px',
    fontStyle: 'italic',
    left: '0',
    width: 'max-content',
    margin: '0 20px',
  },

  productImage: {
    width: '300px',
    height: '300px',
    borderRadius: '5px',
  },
})
