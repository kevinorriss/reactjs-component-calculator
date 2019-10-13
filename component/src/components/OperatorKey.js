import React from 'react'
import PropTypes from 'prop-types'

class OperatorKey extends React.Component {
    constructor(props) {
        super(props)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.state = {
            text: props.text,
            onClick: props.onClick
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown(event) {
        if (event.key === this.state.text) {
            this.state.onClick(this.state.text)
        }
    }

    render() {
        return (
            <div className="button button--operator" onClick={() => this.state.onClick(this.state.text)}><div>{this.state.text}</div></div>
        )
    }
}

OperatorKey.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.oneOf(['+', '-', '*', '/', '%']).isRequired
}

export default OperatorKey
