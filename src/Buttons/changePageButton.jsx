import React from 'react';
import "./Buttons.css";
import Button from 'react-bootstrap/Button';
export default class ChangePageButton extends React.Component {

    handleSubmit = name => {
        this.props.handleSendRequest(name);
    };

    render() {
        const {name} = this.props;
        const {btnContainerClassNames} = this.props;
        return (
            <div className={"page-container "+btnContainerClassNames}>
                <Button variant="danger" className={"btn-base"} onClick={() => {this.handleSubmit(name)}}>{name}</Button>
            </div>

        )
    }
}
