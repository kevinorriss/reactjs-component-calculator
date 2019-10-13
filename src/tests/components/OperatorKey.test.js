import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import OperatorKey from '../../../component/src/components/OperatorKey'

it('should render OperatorKey correctly', () => {
    const component = renderer.create(<OperatorKey text="+" onClick={jest.fn()}/>).toJSON()
    expect(component).toMatchSnapshot()
})

it('should call onClick when corresponding keyboard key pressed', () => {
    const onCick = jest.fn()
    const map = {}
    window.addEventListener = jest.fn((event, cb) => { map[event] = cb })
    shallow(<OperatorKey text="+" onClick={onCick}/>)
    map.keydown({ key: '+' })
    expect(onCick).toHaveBeenCalled()
})

it('should call onClick when clicked', () => {
    const onCick = jest.fn()
    const wrapper = shallow(<OperatorKey text="+" onClick={onCick}/>)
    wrapper.find('.button--operator').simulate('click')
    expect(onCick).toHaveBeenCalled()
})