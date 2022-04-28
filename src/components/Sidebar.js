import { css, StyleSheet } from 'aphrodite'
import React, { useState, useEffect } from 'react'

function Sidebar(props) {
  function ChangeCategory(newCat) {
    props.catChange(newCat)
  }

  return (
    <div className={css(styles.SidebarContainer)}>
      <div
        className={css(styles.AddToCartContainer)}
        onClick={() => ChangeCategory('movies-in-theaters')}
      >
        Movies in theaters
      </div>

      <div
        className={css(styles.AddToCartContainer)}
        onClick={() => ChangeCategory('movies-coming')}
      >
        Coming soon
      </div>

      <div
        className={css(styles.AddToCartContainer)}
        onClick={() => ChangeCategory('top-rated-india')}
      >
        Top rated Indian
      </div>

      <div
        className={css(styles.AddToCartContainer)}
        onClick={() => ChangeCategory('top-rated-movies')}
      >
        Top rated movies
      </div>

      <div
        className={css(styles.AddToCartContainer)}
        onClick={() => ChangeCategory('favourite')}
      >
        Favourites
      </div>
    </div>
  )
}

export default Sidebar

const styles = StyleSheet.create({
  SidebarContainer: {
    height: '100%',
    top: '0',
    left: '0',
    backgroundColor: '#18191a',
    transition: '0.5s',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },

  AddToCartContainer: {
    position: 'relative',
    marginBottom: '10px',
    margin: '12px 0',
    background: 'none',
    color: 'red',
    textAlign: 'center',
    font: 'inherit',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#1c1e21',
      color: 'white',
    },
    padding: '8px 8px 8px 32px',
    textDecoration: 'none',
    fontSize: ' 25px',
    display: 'block',
    transition: '0.3s',
  },
})
