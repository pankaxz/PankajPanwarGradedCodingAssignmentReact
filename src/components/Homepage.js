import React, { useState, useEffect } from 'react'
import MovieList from './MovieList'
import Navbar from './Navbar'
import axios from 'axios'
import Sidebar from './Sidebar'
import { css, StyleSheet } from 'aphrodite'

function Homepage() {
  const [currentCategory, setCurrentCategory] = useState('')
  const [dataArr, setDataArr] = useState([])
  const [inputDataArr, setinputDataArr] = useState([])
  const [inputSearchData, setInputSearchData] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  function NavbarChangeHandler(current) {
    console.log('current : ', current)
    setCurrentCategory(current)
    UpdateCat(current)
  }

  function HandleInputChange(current) {
    setInputSearchData(current)
  }

  function SetFocus(current) {
    setIsSearching(current)
  }

  async function UpdateCat(current) {
    try {
      let response = await axios('http://localhost:3001/' + current)
      setDataArr(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    currentCategory
      ? UpdateCat(currentCategory)
      : UpdateCat('movies-in-theaters')
  }, [currentCategory])

  useEffect(() => {
    let temp = dataArr.filter((data) => {
      return data.title.toLowerCase().includes(inputSearchData.toLowerCase())
    })

    if (temp.length > 0) setinputDataArr(temp)
    else if (temp.length === 0) setinputDataArr('')
  }, [inputSearchData, dataArr])

  return (
    <>
      <div className={css(styles.NavbarContainer)}>
        <Navbar inputChange={HandleInputChange} isSearching={SetFocus} />
      </div>

      <div className={css(styles.MidContainer)}>
        <Sidebar catChange={NavbarChangeHandler} />
        <MovieList
          listType={currentCategory}
          data={isSearching || inputDataArr.length > 0 ? inputDataArr : dataArr}
        />
      </div>
    </>
  )
}

export default Homepage

const styles = StyleSheet.create({
  NavbarContainer: {
    display: 'inline-block',
    height: '10%',
    width: '100%',
  },

  MidContainer: {
    display: 'flex',
    columnGap: '100px',
    height: '90%',
    width: '100%',
  },
})
