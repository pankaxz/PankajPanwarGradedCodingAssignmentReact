import { css, StyleSheet } from 'aphrodite'
import React, { useState, useEffect } from 'react'

function Navbar(props) {
  function HandleInputChange(input) {
    props.inputChange(input.target.value)
  }

  function SetFocus(isFocused) {
    props.isSearching(isFocused)
  }

  return (
    <div className={css(styles.LeftButtonContainer)}>
      <input
        className={css(styles.NavbarInput)}
        type="text"
        name="search"
        id="navbarSearch"
        onChange={HandleInputChange}
        onFocus={() => SetFocus(true)}
        onBlur={() => SetFocus(false)}
      />
    </div>
  )
}

export default Navbar

const styles = StyleSheet.create({
  NavbarInput: {
    display: 'inline-block',
    margin: '10px auto',
    borderRadius: '15px',
    border: '1px solid black',
    width: '80%',
    minWidth: '40%',
    height: '65px',
  },

  RightButtonContainer: {
    position: 'relative',
    display: 'flex',
    float: 'right',
    flexDirection: 'row-reverse',
  },

  LeftButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  AddToCartContainer: {
    textDecoration: 'none',
    position: 'relative',
    marginTop: '10px',
    border: '1px solid black',
    display: 'inline-block',
    margin: '12px 12px',
    background: 'none',
    color: 'inherit',
    padding: '20px',
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    ':hover': {
      backgroundColor: '#141414',
      color: 'white',
    },
  },

  CounterBubble: {
    position: 'absolute',
    bottom: '-15px',
    left: '-15px',
    color: 'white',
    height: '20px',
    minWidth: '20px',
    width: 'fit-content',
    alignContent: 'center',
    padding: '4px',
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '1em',
    borderRadius: '15px',
    boxShadow: '1px 1px 1px gray',
  },
})
