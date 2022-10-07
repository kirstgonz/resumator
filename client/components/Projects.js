import React, { Component} from 'react'

class Projects extends Component {

    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    render() {
        const{values} = this.props;
        const {classes} = this.props;
        return (

            value = {values.p1.name}

            value = {values.p1.description}

            value = {values.p1.technologies}
            
            value = {values.p1.roles}
            
            value = {values.p1.sourceLink}
            
            value = {values.p1.deployedLink}
            
            value = {values.p2.name}

            value = {values.p2.description}

            value = {values.p2.technologies}
            
            value = {values.p2.roles}
            
            value = {values.p2.sourceLink}
            
            value = {values.p2.deployedLink}
            
        );
    }
}

export default (ContactDetails);