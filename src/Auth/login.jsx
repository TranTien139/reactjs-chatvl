import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router';
import {loginUser} from '../actions';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChangeInput(e){
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    renderAlert() {
        if(this.props.errorMessage) {
            return (
                <div>
                    <span>{this.props.errorMessage}</span>
                </div>
            );
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let data = {email: this.state.email, password: this.state.password}
        this.props.loginUser(data);
        return;
    }

    render() {
        return (
            <div>
                <div className="col-sm-6 col-sm-offset-3">
                    <div style={{paddingTop: 30}}></div>
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                        { this.renderAlert() }
                        <div className="form-group">
                            <label>Địa chỉ email</label>
                            <input name="email" className="form-control" type="text"  onChange={this.handleChangeInput.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input name="password" className="form-control" onChange={this.handleChangeInput.bind(this)} type="password"/>
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
        errorMessage: state.auth.error
    };
}

export default connect(mapStateToProps, {loginUser})(Login);