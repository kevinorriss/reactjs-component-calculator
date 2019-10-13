import React from 'react'
import PropTypes from 'prop-types'

class NumberKey extends React.Component {
    constructor(props) {
        super(props)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.state = {
            number: props.number.toString(),
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
        if (event.key === this.state.number) {
            this.state.onClick(this.state.number)
        }
    }

    render() {
        return (
            <div className="button button--number" onClick={() => {this.state.onClick(this.state.number)}}><div>{this.state.number}</div></div>
        )
    }
}

NumberKey.propTypes = {
    onClick: PropTypes.func.isRequired,
    number: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).isRequired
}

export default NumberKey