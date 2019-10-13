import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import ControlKey from '../../../component/src/components/ControlKey'

it('should render ControlKey correctly', () => {
    const component = renderer.create(<ControlKey text="C" keys={['Escape']} onClick={jest.fn()} className="button--control-equals" />).toJSON()
    expect(component).toMatchSnapshot()
})

it('should call onClick when corresponding keyboard key pressed', () => {
    const onCick = jest.fn()
    const map = {}
    window.addEventListener = jest.fn((event, cb) => { map[event] = cb })
    shallow(<ControlKey text="C" keys={['Escape']} onClick={onCick}/>)
    map.keydown({ key: 'Escape' })
    expect(onCick).toHaveBeenCalled()
})

it('should call onClick when clicked', () => {
    const onCick = jest.fn()
    const wrapper = shallow(<ControlKey text="C" keys={['Escape']} onClick={onCick}/>)
    wrapper.find('.button--control').simulate('click')
    expect(onCick).toHaveBeenCalled()
})