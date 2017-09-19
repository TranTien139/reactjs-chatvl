import React, { Component } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import common from '../../app/functions/common.js';

//import * as articleActions from '../../actions/articleActions';

import {getArticleUser} from '../actions/articleActions';

class UserPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 0
        }
    }
    componentDidMount(){
        let page = this.state.page;
        if( typeof page === 'undefined'){
            page = 0;
        }

        let queryParams = this.props.location.query;
        queryParams = queryParams.page;

        let userslug = this.props.params.slug;
        if(typeof queryParams === 'undefined'){
            queryParams = 0;
        }
        queryParams = parseInt(queryParams) + 1;

        this.setState({page:queryParams});

        this.props.getArticleUser(userslug,queryParams-1);
    }

    render(){
        const imageList = this.props.users.users;

        const imageNode = imageList.map((image) => {
            return (
                <div className="gag-link" key={image._id} >
                    <div className="content">
                        <div className="img-wrap">
                            <Link to={'/chi-tiet/'+ image._id}>
                                <img className="thumb-img" src={image.image} alt />
                                {image.linkVideo !== '' ? <img className="videoIndicator" src="/images/play_icon.png" /> : ''}
                            </Link>
                        </div>
                    </div>
                    <div className="post-info">
                        <div className="info scriptolution-stop">
                            <h1><Link className="jump_focus" to={'/chi-tiet/'+ image._id}>{image.title}</Link></h1>
                            <div className="uinfo">
                                Bởi { typeof image.user !== 'undefined' ? <a href={'/user/'+image.user.id} >{image.user.name }</a> : <a href={'/user/unknown'} >unknown &nbsp;</a> }
                                <span>{ common.NiceTime(image.date) }</span>
                            </div>
                            <div className="p-stats">
                                <span title="Lượt xem" className="views">{ image.views }</span>
                                <span className="comments">{ image.comments.length }</span>
                            </div>
                            <div className="like-box">
                                <span><img src="images/like_icon.png" width="20px" height="20px" /><span style={{position: 'absolute'}}>{ image.likes.length }</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div>
                <section>
                    <div id="main">
                        <div id="content-holder">
                            <div id="content">
                                <div id="entries-content" className="list">
                                    <div id="entries-content-ul" className="col-1">
                                        {imageNode}
                                    </div>
                                    <div id="paging-buttons" className="paging-buttons">
                                        <a href={'?page=' + this.state.page } className="older">Load thêm »</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <aside>
                    <div className="side-bar">
                        <div className="feature-people top-like">
                            <h3 className="topUsers">Top Hài 24h</h3>
                            <ul className="topUsersSort topUsersSortHome">
                                <li><a className="selected" data-sort="week" href="http://chatvl.com/#">Tuần</a> /</li>
                                <li><a data-sort="month" href="http://chatvl.com/#">Tháng</a> /</li>
                                <li><a data-sort="all" href="http://chatvl.com/#">Tất cả</a></li>
                            </ul>
                            <div className="clear">
                            </div>
                            <div id="topUserContent">
                                <div className="topUsers">
                                    <div className="item">
                                        <a href title="Nguyen Tuan Anh">
                                            <img src="images/avatar.jpg" />
                                            <div className="info">
                                                <span className="name">Nguyen Tuan Anh</span> <span className="views">5k</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href title="Bách Nhiên Tử">
                                            <img src="images/avatar.jpg" />
                                            <div className="info">
                                                <span className="name">Bách Nhiên Tử</span> <span className="views">4.9k</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href title="Jack Cheung">
                                            <img src="images/avatar.jpg" />
                                            <div className="info">
                                                <span className="name">Jack Cheung</span> <span className="views">4.6k</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href title="Trần Hữu Hải">
                                            <img src="images/avatar.jpg" />
                                            <div className="info">
                                                <span className="name">Trần Hữu Hải</span> <span className="views">4.4k</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href="http://chatvl.com/user/1686086911657417" title="David Hoover">
                                            <img src="images/avatar.jpg" />
                                            <div className="info">
                                                <span className="name">David Hoover</span> <span className="views">4.3k</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href title="Lê Minh Công">
                                            <img src="images/avatar.jpg" />
                                            <div className="info">
                                                <span className="name">Lê Minh Công</span> <span className="views">4.1k</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href title="Tường Văn">
                                            <img src="images/avatar.jpg" />
                                            <div className="info">
                                                <span className="name">Tường Văn</span> <span className="views">3.1k</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href title="Phế Như Con Dế">
                                            <img src="images/avatar.jpg" />
                                            <div className="info">
                                                <span className="name">Phế Như Con Dế</span> <span className="views">2.8k</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href title="Người Tốt ">
                                            <img src="images/avatar.jpg" />
                                            <div className="info">
                                                <span className="name">Người Tốt </span> <span className="views">2.7k</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="item">
                                        <a href title="Admin">
                                            <img src="images/avatar.jpg" />
                                            <div className="info">
                                                <span className="name">Admin</span> <span className="views">2.6k</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="clear" />
                                <div className="moreTop"><a href>xem thêm »</a></div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getArticleUser:getArticleUser
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPost);