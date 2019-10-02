import React, { Fragment, useState } from 'react'
import ReactResizeDetector from 'react-resize-detector'

// operators
const ADDITION = '+'
const SUBTRACTION = '-'
const MULTIPLICATION = 'x'
const DIVISION = '/'
const MODULUS = '%'

const Calculator = () => {
    // the initial values object
    const initialCalculation = {
        left: '0',
        operator: null,
        right: null
    }

    // TODO after the equals button is pressed, new number presses should clear the answer

    // TODO add keyboard input functionality

    // TODO css height match width - use padding-top and 0 height

    // TODO responsive font sizing  - CSS @media only works based on viewport size, not container size
    //                              - will need to use JS to watch the container width

    // TODO export CSS with component

    // create the calculation state
    const [calculation, setCalculation] = useState(initialCalculation)

    // destructure the state object into variables
    const { left, operator, right } = calculation

    const getCurrentValue = () => {
        return operator ? right || '' : left
    }

    const setCurrentValue = (value) => {
        setCalculation({
            ...calculation,
            left: operator ? calculation.left : value,
            right: operator ? value : calculation.right
        })
    }

    // handle a number being clicked
    const onNumClick = e => {
        // get the button value clicked
        const buttonText = e.target.textContent

        // get the value to append
        let value = getCurrentValue()

        if (value === '0' || isNaN(value) || !isFinite(value)) {
            value = buttonText
        } else {
            value = value + buttonText
        }

        setCurrentValue(value)
    }

    const onDecimalClick = e => {
        let value = getCurrentValue()
        if (value.match(/\./)) {
            return
        } else if (isNaN(value) || !isFinite(value)) {
            value = '0.'
        } else {
            value = value + '.'
        }

        setCurrentValue(value)
    }

    const onOperatorClick = e => {
        setCalculation({
            ...calculation,
            operator: e.target.textContent
        })
    }

    const onDeleteClick = e => {
        let value = getCurrentValue()

        if (value.length === 1) {
            value = '0'
        } else {
            value = value.substring(0, value.length - 1);
        }

        setCurrentValue(value)
    }

    const onEqualsClick = e => {
        if (right === null) {
            return
        }

        let value;
        const leftNumber = Number(left)
        const rightNumber = Number(right)
        switch (operator) {
            case ADDITION:
                value = leftNumber + rightNumber
                break
            case SUBTRACTION:
                value = leftNumber - rightNumber
                break
            case DIVISION:
                value = leftNumber / rightNumber
                break
            case MULTIPLICATION:
                value = leftNumber * rightNumber
                break
            case MODULUS:
                value = leftNumber % rightNumber
                break
            default:
                return
        }

        setCalculation({
            ...calculation,
            left: value.toString(),
            operator: null,
            right: null
        })
    }

    const onClearEntryClick = e => {
        setCalculation({
            ...calculation,
            left: operator ? calculation.left : '0',
            right: operator ? '0' : null
        })
    }

    const onClearClick = e => {
        setCalculation({
            ...initialCalculation
        })
    }

    const getDisplayValue = () => {
        let text = right || left
        return text.length > 16 ? Number(text).toExponential().toString() : text
    }

    const onResize = (width, height) => {
        console.log(`width: ${width}`)
        console.log(`height: ${height}`)
        console.log('------------------')
    }

    return (
        <div className="calculator">
            <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />
            <div className="display">
                <p className="display--calculation">test
                    {operator && <span>{left.length > 16 ? Number(left).toExponential() : left} {operator}</span>}
                </p>
                <h4 className="display--value">{getDisplayValue()}</h4>
            </div>
        </div>
    )
}

export default Calculator
