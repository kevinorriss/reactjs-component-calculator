import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import Calculator from '../../component/src/Calculator'

let wrapper
beforeEach(() => {
    wrapper = mount(<Calculator/>)
})

const getNumberKey = (number) => {
    return wrapper.find('.button--number').filterWhere(c => c.text() == number).first()
}

const getControlKey = (text) => {
    return wrapper.find('.button--control').filterWhere(c => c.text() === text).first()
}

const getOperatorKey = (text) => {
    return wrapper.find('.button--operator').filterWhere(c => c.text() === text).first()
}

const getDisplayText = () => {
    return wrapper.find('.display--value').text()
}

it('should render Calculator correctly', () => {
    const component = renderer.create(<Calculator/>).toJSON()
    expect(component).toMatchSnapshot()
})

it('should append digits to current value', () => {
    getNumberKey(1).simulate('click')
    getNumberKey(3).simulate('click')
    getNumberKey(5).simulate('click')

    expect(getDisplayText()).toEqual('135')
})

it('should accept decimal values', () => {
    getNumberKey(4).simulate('click')
    getControlKey('.').simulate('click')
    getNumberKey(5).simulate('click')

    expect(getDisplayText()).toEqual('4.5')
})

it('should reject multiple decimal characters', () => {
    const decimal = getControlKey('.')
    const key4 = getNumberKey(4)
    const key5 = getNumberKey(5)
    const key6 = getNumberKey(6)

    key4.simulate('click')
    key5.simulate('click')
    decimal.simulate('click')
    decimal.simulate('click')
    key6.simulate('click')
    expect(getDisplayText()).toEqual('45.6')
})

it('should reject 2nd decimal characters after numbers', () => {
    const decimal = getControlKey('.')
    const key4 = getNumberKey(4)
    const key5 = getNumberKey(5)
    const key6 = getNumberKey(6)

    key4.simulate('click')
    decimal.simulate('click')
    key5.simulate('click')
    decimal.simulate('click')
    key6.simulate('click')
    expect(getDisplayText()).toEqual('4.56')
})

it ('should reject multiple 0 keys', () => {
    const zero = getNumberKey(0)
    zero.simulate('click')
    zero.simulate('click')
    
    expect(getDisplayText()).toEqual('0')
})

it ('should accept multiple 0 keys after non-zero key', () => {
    const zero = getNumberKey(0)
    getNumberKey(1).simulate('click')
    zero.simulate('click')
    zero.simulate('click')
    
    expect(getDisplayText()).toEqual('100')
})

it('should clear calculation on clear button press', () => {
    getNumberKey(7).simulate('click')
    getNumberKey(8).simulate('click')
    getControlKey('.').simulate('click')
    getNumberKey(9).simulate('click')

    expect(getDisplayText()).toEqual('78.9')

    getControlKey('C').simulate('click')

    expect(getDisplayText()).toEqual('0')
})

it('should clear left value on clear entry button press', () => {
    getNumberKey(7).simulate('click')
    expect(getDisplayText()).toEqual('7')

    getControlKey('CE').simulate('click')
    expect(getDisplayText()).toEqual('0')
})

it('should delete right-most character on delete key press', () => {
    getNumberKey(1).simulate('click')
    getNumberKey(2).simulate('click')
    expect(getDisplayText()).toEqual('12')

    getControlKey('del').simulate('click')
    expect(getDisplayText()).toEqual('1')
})

it('should delete right-most character on delete key press (decimal)', () => {
    getNumberKey(1).simulate('click')
    getNumberKey(2).simulate('click')
    getControlKey('.').simulate('click')
    expect(getDisplayText()).toEqual('12.')

    getControlKey('del').simulate('click')
    expect(getDisplayText()).toEqual('12')
})

it('should reset to 0 when delete key pressed on single digit value', () => {
    getNumberKey(2).simulate('click')
    expect(getDisplayText()).toEqual('2')

    getControlKey('del').simulate('click')
    expect(getDisplayText()).toEqual('0')
})

it('should do nothing when equals pressed before complete calculation', () => {
    getNumberKey(2).simulate('click')
    getControlKey('=').simulate('click')
    expect(getDisplayText()).toEqual('2')
})

it('should handle addtion calculation', () => {
    getNumberKey(1).simulate('click')
    getControlKey('.').simulate('click')
    getNumberKey(2).simulate('click')
    getOperatorKey('+').simulate('click')
    getNumberKey(3).simulate('click')
    getControlKey('.').simulate('click')
    getNumberKey(4).simulate('click')
    expect(getDisplayText()).toEqual('1.2 + 3.4')

    getControlKey('=').simulate('click')
    expect(getDisplayText()).toEqual('4.6')
})

it('should handle subtraction calculation', () => {
    getNumberKey(1).simulate('click')
    getControlKey('.').simulate('click')
    getNumberKey(2).simulate('click')
    getOperatorKey('-').simulate('click')
    getNumberKey(3).simulate('click')
    getControlKey('.').simulate('click')
    getNumberKey(4).simulate('click')
    expect(getDisplayText()).toEqual('1.2 - 3.4')

    getControlKey('=').simulate('click')
    expect(getDisplayText()).toEqual('-2.2')
})

it('should handle multiplication calculation', () => {
    getNumberKey(1).simulate('click')
    getControlKey('.').simulate('click')
    getNumberKey(2).simulate('click')
    getOperatorKey('*').simulate('click')
    getNumberKey(3).simulate('click')
    getControlKey('.').simulate('click')
    getNumberKey(4).simulate('click')
    expect(getDisplayText()).toEqual('1.2 * 3.4')

    getControlKey('=').simulate('click')
    expect(getDisplayText()).toEqual('4.08')
})

it('should handle division calculation', () => {
    getNumberKey(1).simulate('click')
    getNumberKey(0).simulate('click')
    getOperatorKey('/').simulate('click')
    getNumberKey(4).simulate('click')
    expect(getDisplayText()).toEqual('10 / 4')

    getControlKey('=').simulate('click')
    expect(getDisplayText()).toEqual('2.5')
})

it('should handle modulus calculation', () => {
    getNumberKey(1).simulate('click')
    getNumberKey(0).simulate('click')
    getOperatorKey('%').simulate('click')
    getNumberKey(3).simulate('click')
    expect(getDisplayText()).toEqual('10 % 3')

    getControlKey('=').simulate('click')
    expect(getDisplayText()).toEqual('1')
})

it('should reset to 0 when delete key pressed on single digit negative value', () => {
    getOperatorKey('-').simulate('click')
    getNumberKey(5).simulate('click')
    getControlKey('=').simulate('click')

    expect(getDisplayText()).toEqual('-5')

    getControlKey('del').simulate('click')
    expect(getDisplayText()).toEqual('0')
})

it('should handle operator changing', () => {
    getNumberKey(5).simulate('click')
    getOperatorKey('-').simulate('click')
    expect(getDisplayText()).toEqual('5 -')

    getOperatorKey('+').simulate('click')
    expect(getDisplayText()).toEqual('5 +')

    getNumberKey(6).simulate('click')
    expect(getDisplayText()).toEqual('5 + 6')

    getOperatorKey('*').simulate('click')
    expect(getDisplayText()).toEqual('5 * 6')
})

it('should use answer as new calculation left value', () => {
    getNumberKey(2).simulate('click')
    getOperatorKey('+').simulate('click')
    getNumberKey(3).simulate('click')
    getControlKey('=').simulate('click')
    getOperatorKey('*').simulate('click')
    expect(getDisplayText()).toEqual('5 *')
})

it('should do nothing when pressing delete after operator (no right value)', () => {
    getNumberKey(2).simulate('click')
    getOperatorKey('+').simulate('click')
    getControlKey('del').simulate('click')
    expect(getDisplayText()).toEqual('2 +')
})