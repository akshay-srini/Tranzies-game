import React,{useState,useEffect} from 'react'
import Confetti from "react-confetti"
import Dice from './components/Dice'
import {nanoid} from 'nanoid'
export default function App () {  

  const [dice, setDice] = useState(allNewDices)
  const [tanzies, setTanzies] = useState(false)

  useEffect(()=> {
    const allHeld = dice.every(die => die.isHeld)
    const firstDieValue = dice[0].value 
    const allSameValue = dice.every(die => die.value == firstDieValue)
    if (allHeld && allSameValue){
      setTanzies(true)
      console.log("You won")
    }
  },[dice])
  
  function allNewDices() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(
        {value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
        )
      
  }
  return newDice
  }

  function rollDice(){
    if(!tanzies){
      setDice(oldDice => oldDice.map(dice =>  dice.isHeld ? dice : {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()}))
    }else{
      setTanzies(false)
      setDice(allNewDices())
    }
    
        
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  
  const DiceButton = (tanzies ? "Start Game" : "Roll")

console.log(allNewDices())

const dieElement = dice.map(die => <Dice key={die.id} value={die.value} isHeld = {die.isHeld} holdDice = {() => holdDice(die.id)}/>)

  return ( 
    <section className="div-container">
      {tanzies && <Confetti />}
      <h1 className='title'>Tanzies</h1>
      <p className='desc'>Roll until all dice are the same. Click each Die to freeze it as its current value between rolls. </p>
      <div className='dice-container'>
        {dieElement}
      </div>
      <button className="button" onClick={rollDice}>{DiceButton}</button>
    </section>
  )
}