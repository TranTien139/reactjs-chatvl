import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../actions';
import { FormErrors } from './FormErrors.jsx';

class Register extends Component {

    constructor(props){
        super(props);
        this.state ={
            firstName : '',
            lastName :'',
            email: '',
            password:'',
            repassword: '',
            formErrors:{firstName:'',lastName:'',email:'',password:'',repassword:''},
            firstNameValid: false,
            lastNameValid: false,
            emailValid: false,
            passwordValid: false,
            formValid: true
        }
    }
    handleInput(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value}, ()=>{ this.validateField(name, value) });
    }

    validateField(fieldName, value){
        let formValidator = this.state.formErrors;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName){
            case 'firstName':
                firstNameValid = value.length >= 3;
                formValidator.firstName = firstNameValid ? '' : 'Bạn chưa nhập đúng họ tên';
                break;
            case 'lastName':
                lastNameValid = value.length >= 3;
                formValidator.lastName = lastNameValid ? '' : 'Bạn chưa nhập đúng tên đăng nhập';
                break;

            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                formValidator.email = emailValid ? '' : 'Bạn chưa nhập đúng email';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                formValidator.password = passwordValid ? '' : 'Mật khẩu không đủ mạnh';
                break;
            case 'repassword':
                formValidator.repassword = this.state.password === this.state.repassword ? '' : 'Mật khẩu không khớp';
                break;
            default:
                return;
                break;
        }
        this.setState({formErrors:formValidator},this.validateForm);
    }

    validateForm() {
       // this.setState({formValid: this.state.lastNameValid && this.state.firstNameValid &&this.state.emailValid && this.state.passwordValid});
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let data = { email : this.state.email, firstName: this.state.firstName, lastName: this.state.lastName, password:this.state.password }
        this.props.registerUser(data);
        return;
    }

    render() {
        const {handleSubmit} = this.props;
        const FormErrors =
            <div className='FormError'>
                { Object.keys(this.state.formErrors).map((fieldName, i) => {
                    if (this.state.formErrors[fieldName].length > 0) {
                        return (<p key={i}> { this.state.formErrors[fieldName] }</p>)
                    } else {
                        return '';
                    }}
                )
                }
            </div>
        return (
            <div className="col-sm-8 col-sm-offset-2">
                <div style={{ paddingTop: 30 }}></div>
                <div className="col-sm-12">
                    {FormErrors}
                </div>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <label>Họ và tên</label>
                                <input name="firstName" value={this.state.firstName} onChange={this.handleInput.bind(this)} className="form-control"  type="text"/>
                            </div>
                            <div className="col-md-6">
                                <label>Tên đăng nhập (viết liền không dấu)</label>
                                <input name="lastName" value={this.state.lastName} onChange={this.handleInput.bind(this)} className="form-control"  type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12">
                                <label>Địa chỉ email</label>
                                <input name="email" value={this.state.email} onChange={this.handleInput.bind(this)} className="form-control"  type="email"/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12">
                                <label>Mật khẩu</label>
                                <input name="password" value={this.state.password} onChange={this.handleInput.bind(this)} className="form-control"  type="password"/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12">
                                <label>Nhắc lại mật khẩu</label>
                                <input name="repassword" value={this.state.repassword} onChange={this.handleInput.bind(this)}  className="form-control"  type="password"/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <button type="submit" disabled={!this.state.formValid} className="btn btn-primary">Đăng kí</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, {registerUser})(Register);