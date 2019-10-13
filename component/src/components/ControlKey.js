import React from 'react'
import PropTypes from 'prop-types'

class ControlKey extends React.Component {
    constructor(props) {
        super(props)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.state = {
            text: props.text,
            keys: props.keys,
            onClick: props.onClick,
            className: props.className
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown(event) {
        if (this.state.keys.includes(event.key)) {
            this.state.onClick()
        }
    }

    render() {
        return (
            <div className={"button button--control" + (this.state.className ? ' ' + this.state.className : '')} onClick={() => {this.state.onClick()}}>
                <div>{this.state.text}</div>
            </div>
        )
    }
}

ControlKey.propTypes = {
    text: PropTypes.string.isRequired,
    keys: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default ControlKey