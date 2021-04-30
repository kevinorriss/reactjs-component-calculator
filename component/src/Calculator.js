import React from 'react'
import mexp from 'math-expression-evaluator'
import ControlKey from './components/ControlKey'
import NumberKey from './components/NumberKey'
import OperatorKey from './components/OperatorKey'
import './styles.css'

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.handleNumericKeyEvent = this.handleNumericKeyEvent.bind(this)
        this.handleOperatorKeyEvent = this.handleOperatorKeyEvent.bind(this)
        this.handleClearEvent = this.handleClearEvent.bind(this)
        this.handleClearEntryEvent = this.handleClearEntryEvent.bind(this)
        this.handleDeleteEvent = this.handleDeleteEvent.bind(this)
        this.handleDecimalEvent = this.handleDecimalEvent.bind(this)
        this.handleEqualsEvent = this.handleEqualsEvent.bind(this)

        this.state = {
            left: null,
            operator: null,
            right: null,
            answer: null
        }
    }

    handleNumericKeyEvent(number) {
        let value = this.getCurrentValue()
        this.setCurrentValue((value === null || value === '0' || isNaN(value) || !isFinite(value)) ? number : value + number)
    }

    handleOperatorKeyEvent(operator) {
        this.setState((prevState) => ({
            left: prevState.left || prevState.answer,
            operator,
            right: prevState.right,
            answer: null
        }))
    }

    handleClearEvent() {
        this.setState({
            left: null,
            operator: null,
            right: null,
            answer: null
        })
    }

    handleClearEntryEvent() {
        this.setState((prevState) => ({
            left: prevState.operator ? prevState.left : null,
            operator: prevState.operator,
            right: null,
            answer: null
        }))
    }

    handleDeleteEvent() {
        const value = this.getCurrentValue()
        this.setCurrentValue(value === null || RegExp('^-?.$').test(value) ? null : value.substring(0, value.length - 1))
    }

    handleDecimalEvent() {
        const value = this.getCurrentValue()
        if (value === null || !value.match(/\./)) {
            this.setCurrentValue((value === null || value === '0' || isNaN(value) || !isFinite(value)) ? '0.' : value + '.')
        }
    }

    handleEqualsEvent() {
        if (this.state.right !== null) {
            this.setState({
                left: null,
                operator: null,
                right: null,
                answer: mexp.eval(this.getDisplayText().replace('%', 'Mod')).toString()
            })
        }
    }

    getCurrentValue() {
        return this.state.operator ? this.state.right : this.state.left || this.state.answer
    }

    setCurrentValue(value) {
        this.setState((prevState) => ({
            left: prevState.operator ? prevState.left : value,
            operator: prevState.operator,
            right: prevState.operator ? value : prevState.right,
            answer: null
        }))
    }

    getDisplayText() {
        if (this.state.answer) {
            return this.state.answer
        }
        return (`${this.state.left || '0'} ${this.state.operator || ''} ${this.state.right || ''}`).trim()
    }

    render() {
        return (
            <div className="calculator">
                <div className="display">
                    <div className="display--inner">
                        <h4 className="display--value">{this.getDisplayText()}</h4>
                    </div>
                </div>
                <table className="keypad">
                    <tbody>
                        <tr>
                            <td width="25%"><ControlKey text="C" keys={['Escape']} onClick={this.handleClearEvent}/></td>
                            <td width="50%" colSpan={2}><ControlKey text="CE" keys={['Delete']} onClick={this.handleClearEntryEvent}/></td>
                            <td width="25%"><OperatorKey text="%" onClick={this.handleOperatorKeyEvent}/></td>
                        </tr>
                        <tr>
                            <td><NumberKey number={1} onClick={this.handleNumericKeyEvent}/></td>
                            <td><NumberKey number={2} onClick={this.handleNumericKeyEvent}/></td>
                            <td><NumberKey number={3} onClick={this.handleNumericKeyEvent}/></td>
                            <td><OperatorKey text="/" onClick={this.handleOperatorKeyEvent}/></td>
                        </tr>
                        <tr>
                            <td><NumberKey number={4} onClick={this.handleNumericKeyEvent}/></td>
                            <td><NumberKey number={5} onClick={this.handleNumericKeyEvent}/></td>
                            <td><NumberKey number={6} onClick={this.handleNumericKeyEvent}/></td>
                            <td><OperatorKey text="*" onClick={this.handleOperatorKeyEvent}/></td>
                        </tr>
                        <tr>
                            <td><NumberKey number={7} onClick={this.handleNumericKeyEvent}/></td>
                            <td><NumberKey number={8} onClick={this.handleNumericKeyEvent}/></td>
                            <td><NumberKey number={9} onClick={this.handleNumericKeyEvent}/></td>
                            <td><OperatorKey text="-" onClick={this.handleOperatorKeyEvent}/></td>
                        </tr>
                        <tr>
                            <td><ControlKey text="del" keys={['Backspace']} onClick={this.handleDeleteEvent}/></td>
                            <td><NumberKey number={0} onClick={this.handleNumericKeyEvent}/></td>
                            <td><ControlKey text="." keys={['.']} onClick={this.handleDecimalEvent}/></td>
                            <td><OperatorKey text="+" onClick={this.handleOperatorKeyEvent}/></td>
                        </tr>
                        <tr>
                            <td colSpan={4}><ControlKey text="=" keys={['=', 'Enter']} onClick={this.handleEqualsEvent} className="button--control-equals"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Calculator
