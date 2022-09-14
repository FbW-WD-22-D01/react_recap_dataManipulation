import React, { useState, useEffect } from 'react'

function Cart() {
  
    const [products, setProducts] = useState(
        [
            {
                id: 1,
                name: 'nice shoes',
                price: 5},
            {
                id: 2,
                name: 'nice shirt',
                price: 2},
            {
                id: 3,
                name: 'tasty bread',
                price: 0.5}
    ])

    const [cart, setCart] = useState(  [      ]  )
    const [total, setTotal] = useState(0)

    
function changePrice(e, id){

    const myArr = products.map ( el => {            //map wenn der Array gleiche Länge aber verändert, filter wenn gleicher Inhalt aber kürzer
        if (el.id === id ) {
            return ({...el, price: e.target.value}) // Ich gebe das Objekt zurück aber eine Eigenschaft verändert sich
        }
        else {
            return el
        }
    })
    
    setProducts(myArr)
}

function addToCart(id){
    // Direkt das Objekt übergeben in der Click Funktion
    // setCart([...cart, item])

    // Produkt mit filter suchen - filter gibt immer Array zurück
    // const myArr = products.filter( el => { // Gibt immer einen Array zurück,
    //     if (el.id === id ){
    //         return el
    //     }
    // }) 
    // setCart([...cart, ...myArr])
    
    // Produjkt mit find suchen, gibt das Element zurück (hier Objekt)
    const myObj = products.find( el => { // Gibt 
        if (el.id === id ){
            return el
        }
    })
    // setCart([...cart, myObj])
    
    // Wir wollen den amount im Warenkorb erhöhen, wenn das Obbjekt bereits vorhanden ist
    // 1. checken ob das Element scon im Warenkorb ist
    const check = cart.filter( el => el.id === id)
    
    if ( check.length > 0 ){
    
        //Wenn es bereits drin ist, erhöhen wir den Amount im Warenkorb
        const myArr = cart.map( el => {
            if (el.id === id) {
                return {...el, amount: el.amount+1 }
            }else {
                return el
            } 
        })
        setCart(myArr)
    }else {
        // Wenn es nicht im Warenkorb ist, legen wir es neu hinein, ergänzen aber den amount, damit wir ihn später ehöhen können
        setCart([...cart, {...myObj, amount: 1}])
    }



}


function removeItem(id){
    console.log('Soll gelöscht werden: ', id, ' aus dem Warenkorb: ', cart)
    // Das Objekt suchen
    const myObj = cart.find(el => el.id === id)
    
    // Den amount im Objekt reduzieren
    myObj.amount = myObj.amount - 1 
    
    // überprüfen ob das Objekt noch da ist
    if (myObj.amount > 0 ){
        
        // Wenn ja das Objekt im Warenkob verändern
        const result = cart.map( el => {
            if (el.id === id){
                return myObj
            } else {
                return el
            }
        })
        setCart(result)


    } else {
        // das Objekt aus Warenkorb löschen
        console.log('Objekt soll raus aus Warenkorb')    
        const result = cart.filter( el => {
            if( el.id !== id){
                return el
            }
        })  
        setCart(result)      
        
    }
}


useEffect(() => {
     const myTotalResult = cart.reduce( (acc, curr, index) => {
                console.log('Acc: ', acc, 'Curent Value: ', curr)        
                acc += curr.price * curr.amount
                return acc
            },0 )
    

    setTotal(myTotalResult)
}, [cart])



  return (
    <div>
        <h3>Unsere Waren</h3>
        <ul>
            {products.map( (item, index) => {
                
                return (
                    <li 
                        key={index}>
                            {item.name}- {item.price}€ 
                            <input value={item.price} onChange={(e) => changePrice(e,item.id )} />
                            <button onClick={() => addToCart(item.id)}>Shop me</button>
                    </li>
                )
            } )}
        </ul>

        <p>Mein Warenkorb enthält: {cart.map( (el, index) => {
           return (
               <span key={index}> 
                <span>{el.name} {el.amount}</span>
                 <button onClick={() => removeItem(el.id)}>-</button> 
                 <span> // </span>
                </span>  )}
           )}
            
            </p>
        
        
        <p>Gesamtsumme: {total}
            {/* {cart.reduce( (acc, curr) => {
                    acc += curr.price * curr.amount
                return acc
            },0 )  } */}
         €</p>
    </div>
  )
}

export default Cart