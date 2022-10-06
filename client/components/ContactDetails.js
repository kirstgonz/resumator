import React, { Component} from 'react'

class ContactDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const{values, handleChange} = this.props;
        return (
            
        )
    }
}