import React, { useState, useEffect } from 'react'
import './index.css'
import { isArray } from 'util'

const Calculator = () => {
    // operator constants
    const ADDITION = '+'
    const SUBTRACTION = '-'
    const MULTIPLICATION = '*'
    const DIVISION = '/'
    const MODULUS = '%'

    // listens for the keydown event for the given key and calls the callback function
    const onKeyDown = (key, callback) => {
        const onDown = (e) => {
            const eventKeyLower = e.key.toLowerCase()
            if (isArray(key)) {
                if(key.find((elem) => elem.toLowerCase() == eventKeyLower)) {
                    callback()
                }
            } else if (key.toLowerCase() == eventKeyLower) {
                callback()
            }
        }

        useEffect(() => {
            window.addEventListener("keydown", onDown)
            return () => {
                window.removeEventListener("keydown", onDown)
            }
        }, [key])
    }

    // Number Button (0-9)
    const NumberKey = ({children:key}) => {
        onKeyDown(key, () => onNumClick(key))
        return (
            <td className="button button--number" onClick={() => {onNumClick(key)}}><div>{key}</div></td>
        )
    }

    // Operator Button (plus, minus, divide, multiply, modulus)
    const OperatorKey = ({children:key}) => {
        onKeyDown(key, () => onOperatorClick(key))
        return (
            <td className="button button--operator" onClick={() => onOperatorClick(key)}><div>{key}</div></td>
        )
    }

    // Control Button (clear, delete, equals, decimal)
    const ControlKey = ({children:value, onClick, listenKey, classModify, ...rest}) => {
        onKeyDown(listenKey || value, onClick)
        return (
            <td className={"button button--control " + classModify} onClick={onClick} {...rest}><div>{value}</div></td>
        )
    }

    // setup the state
    const initialCalculation = {
        left: null,
        operator: null,
        right: null,
        answer: null
    }
    const [calculation, setCalculation] = useState(initialCalculation)

    // gets the left or right value based on if operator is set
    const getCurrentValue = () => {
        return calculation.operator ? calculation.right : calculation.left
    }

    // sets the left or right value based on if operator is set
    const setCurrentValue = (value) => {
        setCalculation({
            ...calculation,
            answer: initialCalculation.answer,
            left: calculation.operator ? calculation.left : value,
            right: calculation.operator ? value : calculation.right
        })
    }

    // appends the number onto the current value
    const onNumClick = (number) => {
        let value = getCurrentValue()
        setCurrentValue((value === null || value === '0' || isNaN(value) || !isFinite(value)) ? number : value + number)
    }

    // handle an operator being clicked
    const onOperatorClick = (operator) => {
        setCalculation({
            ...calculation,
            answer: initialCalculation.answer,
            left: calculation.left || calculation.answer,
            operator
        })
    }

    // clears the entire calculation
    const onClearClick = () => {
        setCalculation({
            ...initialCalculation
        })
    }

    // clears the current entry of the calculation
    const onClearEntryClick = () => {
        setCalculation({
            ...calculation,
            answer: initialCalculation.answer,
            left: calculation.operator ? calculation.left : initialCalculation.left,
            right: initialCalculation.right
        })
    }

    // backspace on the current entry of the calculation
    const onDeleteClick = () => {
        let value = getCurrentValue()
        setCurrentValue(value === null || value.length === 1 ? null : value.substring(0, value.length - 1))
    }

    // adds a decimal to the current entry of the calculation
    const onDecimalClick = () => {
        let value = getCurrentValue()
        if (value !== null && value.match(/\./)) return
        setCurrentValue((value === null || value === '0' || isNaN(value) || !isFinite(value)) ? '0.' : value + '.')
    }

    // sets the answer to the calculation as the new left entry value
    const onEqualsClick = () => {
        // if no right value, dont calculate
        if (calculation.right === null) {
            return
        }

        let value;
        const leftNumber = Number(calculation.left)
        const rightNumber = Number(calculation.right)
        switch (calculation.operator) {
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
            left: null,
            operator: null,
            right: null,
            answer: value.toString()
        })
    }

    const getDisplayText = () => {
        if (calculation.answer) {
            return calculation.answer
        }

        return `${calculation.left || '0'} ${calculation.operator || ''} ${calculation.right || ''}`
    }

    return (
        <div className="calculator">
            <div className="display">
                <div className="display--inner">
                    <h4 className="display--value">{getDisplayText()}</h4>
                </div>
            </div>
            <table className="keypad">
                <tbody>
                    <tr>
                        <ControlKey onClick={onClearClick} listenKey="escape" width="25%">C</ControlKey>
                        <ControlKey onClick={onClearEntryClick} listenKey="delete" width="50%" colSpan={2}>CE</ControlKey>
                        <OperatorKey width="25%">{MODULUS}</OperatorKey>
                    </tr>
                    <tr>
                        <NumberKey>1</NumberKey>
                        <NumberKey>2</NumberKey>
                        <NumberKey>3</NumberKey>
                        <OperatorKey>{DIVISION}</OperatorKey>
                    </tr>
                    <tr>
                        <NumberKey>4</NumberKey>
                        <NumberKey>5</NumberKey>
                        <NumberKey>6</NumberKey>
                        <OperatorKey>{MULTIPLICATION}</OperatorKey>
                    </tr>
                    <tr>
                        <NumberKey>7</NumberKey>
                        <NumberKey>8</NumberKey>
                        <NumberKey>9</NumberKey>
                        <OperatorKey>{SUBTRACTION}</OperatorKey>
                    </tr>
                    <tr>
                        <ControlKey onClick={onDeleteClick} listenKey="backspace">del</ControlKey>
                        <NumberKey>0</NumberKey>
                        <ControlKey onClick={onDecimalClick}>.</ControlKey>
                        <OperatorKey>{ADDITION}</OperatorKey>
                    </tr>
                    <tr>
                        <ControlKey onClick={onEqualsClick} listenKey={['=', 'Enter']} classModify="button--control-equals" colSpan={4}>=</ControlKey>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Calculator
