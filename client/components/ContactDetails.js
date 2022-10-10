import React, { Component} from 'react'

class ContactDetails extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const{values} = this.props;
        const {classes} = this.props;
        return (

            value = {values.firstname}

            value = {values.lastname}

            value = {values.city}

            value = {values.state}

            value = {values.zip}

            value = {values.phone}

            value = {values.email}

        );
    }
}

export default (ContactDetails);