import React, {Component} from 'react';
import {Link} from 'react-router';
import { logoutUser } from '../actions';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
const user_info = cookie.load('token');

class Main extends Component {
    constructor(props){
        super(props);
    }

    handleLogout() {
        this.props.logoutUser();
    }

    componentWillMount() {

    }


    render() {
        let path_name  = this.props.location.pathname;
        return (
            <div>
                <header>
                    <div id="head-wrapper">
                        <div id="head-bar">
                            <div className="head-logo">
                                <h2><Link to={'/'}>Hài 24h</Link></h2>
                            </div>
                            <ul className="main-menu">
                                <li><a href="/">Mới</a></li>
                                <li><a href="/chuyen-muc/hot">Hot</a></li>
                                <li><a href="/tim-kiem">Tìm kiếm</a></li>
                                <li><a target="_blank" href="google.com.vn">App</a></li>
                            </ul>
                            <ul className="main-2-menu">
                                <li className="login_par">
                                    { typeof user_info === 'undefined' ?  <a href="login" >Đăng nhập</a> : <a style={{cursor: 'pointer'}}  id="profile-head" ><img src="/images/avatar.jpg" style={{width: 35, borderRadius: '50%', marginTop: '-10px'}}  />{user_info.user.name}</a> }
                                    <div className="box-profile-head">
                                        <p>{typeof user_info === 'undefined' ? '': <a href={"/user/"+user_info.user.userSlug}>Trang cá nhân</a>}</p>
                                        <p><a style={{cursor: 'pointer'}} onClick={this.handleLogout.bind(this)} >Đăng xuất</a></p>
                                    </div>
                                </li>
                                <li className="upload" ><a href="/upload">Đăng bài</a></li>
                            </ul>
                        </div>
                    </div>
                </header>
                <div id="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps, { logoutUser })(Main);
//export default Main