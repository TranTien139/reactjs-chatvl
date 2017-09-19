import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { loginUser } from '../actions';

const form = reduxForm({
    form: 'login'
});

class Login extends Component {
    handleFormSubmit(formProps) {
        this.props.loginUser(formProps);
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div>
                    <span><strong>Error!</strong> {this.props.errorMessage}</span>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <div className="col-sm-6 col-sm-offset-3">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    {this.renderAlert()}
                    <div className="form-group">
                        <label>Email</label>
                        <Field name="email" className="form-control" component="input" type="text" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <Field name="password" className="form-control" component="input" type="password" />
                    </div>
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary">Đăng nhập</button>
                    </div>
                </form>
                    <div className="pull-right"><a href="register">Đăng kí</a></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message
    };
}

export default connect(mapStateToProps, { loginUser })(form(Login));