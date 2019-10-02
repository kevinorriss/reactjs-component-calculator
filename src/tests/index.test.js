import React from 'react'
import ReactDOM from 'react-dom'
// import { mount } from 'enzyme'
import Calculator from '@kevinorriss/calculator'

test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Calculator />, div)
})

// test('Should render boilerplate text', () => {
//     const wrapper = mount(<Boilerplate />)
//     expect(wrapper.text()).toEqual('Boilerplate React component')
// })