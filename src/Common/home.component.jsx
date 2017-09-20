import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import common from '../../app/functions/common.js';

//import * as articleActions from '../../actions/articleActions';

import {getArticleNew, getTopUserWeek} from '../actions/articleActions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0
        }
    }

    componentDidMount() {
        let page = this.state.page;
        if (typeof page === 'undefined') {
            page = 0;
        }

        let queryParams = this.props.location.query;
        queryParams = queryParams.page;
        if (typeof queryParams === 'undefined') {
            queryParams = 0;
        }
        queryParams = parseInt(queryParams) + 1;

        this.setState({page: queryParams});

        this.props.getAticleNew(queryParams - 1);

        this.props.getTopUserWeek();
    }

    render() {
        const imageList = this.props.news.news;

        const topuserlist = this.props.topweek.topweek;

        const imageNode = imageList.map((image) => {
            return (
                <div className="gag-link" key={image._id}>
                    <div className="content">
                        <div className="img-wrap">
                            <Link to={'/chi-tiet/' + image._id}>
                                <img className="thumb-img" src={image.image} alt/>
                                {image.linkVideo !== '' ?
                                    <img className="videoIndicator" src="/images/play_icon.png"/> : ''}
                            </Link>
                        </div>
                    </div>
                    <div className="post-info">
                        <div className="info scriptolution-stop">
                            <h1><Link className="jump_focus" to={'/chi-tiet/' + image._id}>{image.title}</Link></h1>
                            <div className="uinfo">
                                Bởi { typeof image.user !== 'undefined' ?
                                <a href={'/user/' + image.userSlug}>{image.user.name }</a> :
                                <a href={'/user/unknown'}>unknown &nbsp;</a> }
                                <span>{ common.NiceTime(image.date) }</span>
                            </div>
                            <div className="p-stats">
                                <span title="Lượt xem" className="views">{ image.views }</span>
                                <span className="comments">{ image.comments.length }</span>
                            </div>
                            <div className="like-box">
                                <span><img src="images/like_icon.png" width="20px" height="20px"/><span
                                    style={{position: 'absolute'}}>{ image.likes.length }</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
        const TopUserWeek = topuserlist.map((user) => {
            return (
                <div className="item" key={user._id}>
                    <a href={typeof user.local.userSlug !== 'undefined' ? '/user/'+ user.local.userSlug :'/user/unknown'}>
                        <img src={ user.local.image === '' ? '/images/avatar.jpg' : user.local.image}/>
                        <div className="info">
                            <span className="name">{user.local.name}</span> <span className="views">{ typeof user.meta !== "undefined" ? user.meta.viewWeek : 0 }</span>
                        </div>
                    </a>
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
                                <li><a className="selected" data-sort="week" href="">Tuần</a> /</li>
                                <li><a data-sort="month" href="">Tháng</a> /</li>
                                <li><a data-sort="all" href="">Tất cả</a></li>
                            </ul>
                            <div className="clear">
                            </div>
                            <div id="topUserContent">
                                <div className="topUsers">
                                    { TopUserWeek }
                                </div>
                                <div className="clear"/>
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
        news: state.news,
        topweek: state.topweek
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAticleNew: getArticleNew,
        getTopUserWeek: getTopUserWeek
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);