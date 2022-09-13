import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Cart from './Cart'

function App() {

  const [string, setString] = useState('Ich bin ein String') 
  const [stringArr, setStringArr] = useState(['Ich', 'bin', 'ein','Array'])


  function capitalize(){
    const neuerArr = string.split(' ')
    const arrMap = neuerArr.map( string => string[0].toUpperCase() + string.slice(1))
    setString(arrMap.join(' '))
  }


  function makeBig(word){
    console.log('make me big', word)
    const myArr = stringArr.map( (el) => {
      if (word === el){
        return el.toUpperCase()
      } else {
        return el
      }
    })
    
    setStringArr(myArr)
  }

  function deleteWord(word){
   const myArr =  stringArr.filter( (el) => {
      return el !== word
    })
    
    setStringArr(myArr)
  }

  return (
    <div className="App">
      <h3>Datentypen</h3>
        <h5>Strings</h5>
        <p>{string}</p>
        <button onClick={capitalize}>capitalize me</button>

        <h6>Array</h6>
        <ul>
          {
            stringArr.map( (word, index) => {
             return (
              <li key={index}>
                  <span onClick={() => makeBig(word)}> {word} </span>
                  <button onClick={() => deleteWord(word)}>
                      Lösch mich
                  </button>
              </li> )} )
          }
        </ul>
        <Cart />
    </div>
  )
}

export default App

