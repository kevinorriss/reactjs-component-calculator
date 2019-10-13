import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer';
import NumberKey from '../../../component/src/components/NumberKey'

it('should render NumberKey correctly', () => {
    const component = renderer.create(<NumberKey number={0} onClick={jest.fn()} />).toJSON()
    expect(component).toMatchSnapshot()
})

it('should call onClick when corresponding keyboard key pressed', () => {
    const onCick = jest.fn()
    const map = {}
    window.addEventListener = jest.fn((event, cb) => { map[event] = cb })
    shallow(<NumberKey number={0} onClick={onCick} />)
    map.keydown({ key: '0' })
    expect(onCick).toHaveBeenCalledWith('0')
})

it('should call onClick when clicked', () => {
    const onCick = jest.fn()
    const wrapper = shallow(<NumberKey number={0} onClick={onCick} />)
    wrapper.find('.button--number').simulate('click')
    expect(onCick).toHaveBeenLastCalledWith('0')
})