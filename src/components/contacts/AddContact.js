import React, {Component} from "react";
import {Consumer} from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    };

    onSubmit = async (dispatch, e) => {
        e.preventDefault();

        const {name, email, phone} = this.state;

        if (name === '') {
            this.setState({errors: {name: 'Name is required'}});
            return;
        }

        if (email === '') {
            this.setState({errors: {email: 'Email is required'}});
            return;
        }

        if (phone === '') {
            this.setState({errors: {phone: 'Phone is required'}});
            return;
        }

        const newContact = {name: name, email: email, phone: phone};

        const response = await axios.post(
            "https://jsonplaceholder.typicode.com/users",
            newContact
        );

        dispatch({type: "ADD_CONTACT", payload: response.data});

        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        this.props.history.push('/');
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {name, email, phone, errors} = this.state;

        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return (
                        <div className="card mb-3">
                            <div className="card-header">Add Contact</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup
                                        label="Name"
                                        onChange={this.onChange}
                                        value={name}
                                        placeholder="Enter Name"
                                        name="name"
                                        error={errors.name}
                                    />
                                    <TextInputGroup
                                        label="Email"
                                        type="email"
                                        onChange={this.onChange}
                                        value={email}
                                        placeholder="Enter Email"
                                        name="email"
                                        error={errors.email}
                                    />
                                    <TextInputGroup
                                        label="Phone"
                                        onChange={this.onChange}
                                        value={phone}
                                        placeholder="Enter Phone"
                                        name="phone"
                                        error={errors.phone}
                                    />
                                    <input
                                        type="submit"
                                        value="Add Contact"
                                        className="btn btn-light btn-block"
                                    />
                                </form>
                            </div>
                        </div>
                    );
                }}
            </Consumer>
        );
    }
}

export default AddContact;