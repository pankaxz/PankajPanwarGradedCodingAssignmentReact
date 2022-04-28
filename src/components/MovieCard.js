import React, { useEffect, useRef, useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function MovieCard(props) {
  const [isAddedToFav, setIsAddedToFav] = useState(false)
  const navigate = useNavigate()
  const [showFeatures, setShowFeatures] = useState(true)

  function CheckMovieExistsInFavs(movie) {
    console.log(props.MovieInFavs)

    let movieExists = props.MovieInFavs.findIndex((movieInFavs, index) => {
      return movieInFavs.title.toLowerCase().includes(movie.title.toLowerCase())
    })
    console.log('movie exissts : ', movieExists)
    return movieExists
  }

  function ShowMovieData(movie) {
    navigate(
      movie.title,
      {
        state: {
          movieData: props.movie,
        },
      },
      { replace: false }
    )
  }

  async function AddToFav() {
    let movieExists = CheckMovieExistsInFavs(props.movie)
    if (movieExists === -1) {
      try {
        const response = await axios.post(
          'http://localhost:3001/favourite',
          props.movie
        )
        setIsAddedToFav(true)
        props.RefreshFavsList()
        return response
      } catch (error) {
        console.log(error)
        throw new Error('SOMETHING WENT WRONG WHILE ADDING')
      }
    }
  }

  async function RemovefromFav() {
    console.log('remove')
    let movieExists = CheckMovieExistsInFavs(props.movie)
    if (movieExists !== -1) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/favourite/${props.MovieInFavs[movieExists].id}`
        )
        setIsAddedToFav(false)
        props.RefreshFavsList()

        return response
      } catch (error) {
        console.log(error)
        throw new Error('SOMETHING WENT WRONG WHILE REMOVING')
      }
    }
  }

  useEffect(() => {
    console.log(isAddedToFav)
  }, [isAddedToFav])

  return (
    <>
      {
        <div className={css(styles.CardContainer)}>
          <div>
            <div className={css(styles.CardImageContainer)}>
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
          {showFeatures && (
            <div className={css(styles.ButtonContainer)}>
              <button
                className={css(styles.AddToCartContainer)}
                onClick={AddToFav}
              >
                <span>Add to favourites 🤍</span>
              </button>

              <button
                className={css(styles.AddToCartContainer)}
                onClick={RemovefromFav}
              >
                <span>Remove from favourites 🤍</span>
              </button>
            </div>
          )}

          <button
            className={css(styles.AddToCartContainer)}
            onClick={() => ShowMovieData(props.movie)}
          >
            <span>More Info </span>
          </button>
          <button
            onClick={() => {
              setShowFeatures(!showFeatures)
            }}
            className={css(styles.WishlistContainer)}
          >
            {showFeatures && <span>^</span>}

            {!showFeatures && <span>v</span>}
          </button>
        </div>
      }
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

    transition: 'transform 500ms',
    ':hover': {
      backgroundColor: '#eceff0',
    },

    // ':active': {
    //   transform: 'scale(1.5)',
    //   zIndex: '1',
    // },
  },

  MovieDataContainer: {
    backgroundColor: 'red',
  },

  InfoContainer: {
    display: 'flex',
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
    // display: 'block',
    // border: '1px solid black',
    // margin: '2px 2px',
    // background: 'none',
    // color: 'inherit',
    // padding: '10px',
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
    // fontStyle: 'italic',
    textAlign: 'left',
    // width: 'max-content',
    // margin: '0 20px',
  },

  productImage: {
    width: '300px',
    height: '300px',
    borderRadius: '5px',
  },
})
