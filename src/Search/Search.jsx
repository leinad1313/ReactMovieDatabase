import React from 'react';
import "./Search.css";
import Button from 'react-bootstrap/Button';

export default class Search extends React.Component {
    state= {
        title: ''
    };
    handleSubmit = () => {
        const {title} = this.state;
        this.props.handleSendRequest(title);
        this.setState({title: ''})
    };
    handleInputTitle = (event) => {
        event.preventDefault();
        const title = event.target.value;
        this.setState({title});
    };
    render() {
        const {title} = this.state;
        return (
            <div className="search-form">
                <input className="search-box form-control" type="text" onChange={this.handleInputTitle} value={title}/>
                <Button variant="danger" className="btn btn-search" onClick={this.handleSubmit}>Search</Button>
            </div>
        )
    }
}
