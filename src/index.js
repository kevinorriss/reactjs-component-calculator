import React from 'react'
import ReactDOM from 'react-dom'
import Calculator from '@kevinorriss/calculator'

ReactDOM.render(
    <div style={{ width: '40rem', textAlign:'center'}}>
        <p>Header</p>
        <div style={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
            <p>Left</p>
            <div style={{ flexGrow:1 }}>
                <Calculator />
            </div>
            <p>Right</p>
        </div>
        <p>Footer</p>
    </div>
, document.getElementById('root'))
