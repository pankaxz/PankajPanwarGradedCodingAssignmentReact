import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { css, StyleSheet } from 'aphrodite'

function MovieData() {
  const movieDataVal = useLocation().state.movieData
  const navigate = useNavigate()

  console.log('stateParamVal : ', movieDataVal)

  function GoBack() {
    navigate('/', { replace: false })
  }
  return (
    <>
      <button onClick={GoBack}>Go back to the main page</button>

      <div className={css(styles.MovieDataContainer)}>
        {/* image */}
        <div className={css(styles.posterContainer)}>
          <img
            className={css(styles.productImage)}
            src={movieDataVal.poster}
            alt={movieDataVal.title}
          ></img>
        </div>

        <div className={css(styles.InfoContainer)}>
          {/* movie title */}
          <div className={css(styles.titleContainertemp)}>
            <h1>
              {movieDataVal.title}({movieDataVal.year})
            </h1>
          </div>

          {/* movie Generic */}
          <div className={css(styles.GenericContainer)}>
            {movieDataVal.genres.map((genre) => {
              return <span className={css(styles.Generic)}>{genre}</span>
            })}
          </div>

          {/* movie releaseDate */}
          <div className={css(styles.GenericContainer)}>
            <span className={css(styles.Generic)}>
              Release Date : {movieDataVal.releaseDate}
            </span>
          </div>

          {/* movie duration */}
          <div className={css(styles.GenericContainer)}>
            <span className={css(styles.Generic)}>
              Duration : {movieDataVal.duration}
            </span>
          </div>

          {/* rating */}
          {/* imdb rating */}
          <div className={css(styles.GenericContainer)}>
            <span className={css(styles.Generic)}>
              IMDB Rating : {movieDataVal.imdbRating}
            </span>
          </div>

          {/* content rating */}

          <div className={css(styles.GenericContainer)}>
            <span className={css(styles.Generic)}>
              Content Rating : {movieDataVal.contentRating}
            </span>
          </div>

          {/* average rating */}

          <div className={css(styles.GenericContainer)}>
            <span className={css(styles.Generic)}>
              Average Rating :
              {(
                movieDataVal.ratings.reduce((a, b) => {
                  return a + b
                }) / movieDataVal.ratings.length
              ).toFixed(2)}
            </span>
          </div>

          {/* story */}
          <div className={css(styles.GenericContainer)}>
            <span className={css(styles.Generic)}>
              {movieDataVal.storyline}
            </span>
          </div>

          {/* actors */}
          <div className={css(styles.titleContainer)}>
            Cast :
            {movieDataVal.actors.map((actor) => {
              return <span className={css(styles.Generic)}>{actor}</span>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default MovieData

const styles = StyleSheet.create({
  InfoContainer: {
    display: 'inline-block',
    height: 'max-content',
    border: '1px solid black',
    fontFamily:
      'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif !important',
    flexWrap: 'wrap',
  },

  MovieDataContainer: {
    color: 'white',
    display: 'flex',
    height: 'max-content !important',
    border: '1px solid black !important',
    fontFamily:
      '"Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif !important',
    flexWrap: 'nowrap',
    columnGap: '10px',
    padding: '50px',
  },

  GenericContainer: {
    display: 'flex',
    margin: '10px',
    flexDirection: 'row',
    border: '1px solid black',
  },

  Generic: {
    margin: '10px',
    border: '1px solid black',
  },

  titleContainertemp: {
    fontSize: '3em',
    border: '1px solid black',
    fontFamily:
      'Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif !important',
  },
})
