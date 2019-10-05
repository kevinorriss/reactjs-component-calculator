import React from 'react'
import ReactDOM from 'react-dom'
// import { mount } from 'enzyme'
import Calculator from '@kevinorriss/calculator'

let wrappper
beforeEach(() => {
    wrappper = mount(<Calculator />)
})

// Should accept 0-9 keyboard presses
// Should reject A-Z keyboard presses
// Should accept decimal character keyboard press
// Should accept 0-9 after decimal
// Should reject multiple decimal characters
// 