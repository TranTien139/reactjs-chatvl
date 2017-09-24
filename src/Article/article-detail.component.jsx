import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {getDetailArticle} from '../actions/detailActions';

import common from '../../app/functions/common.js';

import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ListReply from '../Article/ListReply.jsx'

class ArticleDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            hot: [],
            likes: false,
            dislikes: false,
            countlikes: 0,
            countdislikes: 0,
            id_user: '',
            detail:{},
            comments: [],
        };
    }

    handleRedirect() {
        browserHistory.push('/');
    }

    componentWillMount(){
        let user = this.props.auth;
        let id_user =  user.content.id;
        this.setState({
            id_user:id_user
        });

        const id = this.props.params.id;
        fetch('/api/detail/'+id)
            .then(response => response.json())
            .then(json => {
              let liked = json.likes.indexOf(this.state.id_user)!== -1;
              let disliked = json.dislikes.indexOf(this.state.id_user)!== -1;
              let countlikes = json.likes.length;
              let countdislikes = json.dislikes.length;
              let comments = json.comments;
              this.setState({
                  detail:json,
                  likes:liked,
                  dislikes:disliked,
                  countlikes:countlikes,
                  countdislikes:countdislikes,
                  comments:comments
              });
            }).catch(err=>{
              console.log(err);
            });
    }

    componentDidMount() {
        fetch("/api/article-hot")
            .then(response => response.json())
            .then(json => {
                this.setState({hot: json});
            }).catch(err=>{
              console.log(err);
            });
    }

    handleComment = (value) => {
        let content = this.refs.comment.value;
        let date = new Date();
        let id = this.props.params.id;
        let user = this.props.auth;

        if(value !== ''){
          content = $('.reply-'+value).val();
        }
        if (content.length > 2 && typeof user !== 'undefined' && user.authenticated === true) {
            fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_article:id,
                    id: user.content.id,
                    name: user.content.name,
                    image: user.content.image,
                    like: [],
                    content: content,
                    date: date,
                    reply: [],
                    replyID:value,
                })
            }).then((response)=> response.json()).then((responseJson)=>{
                    let comments = responseJson;
                    this.setState({
                      comments:comments
                    });
            }).catch((err)=>{
                console.log(err);
            });
        }
    }

    handlelikes = (action)=>{
        let id = this.props.params.id;
        let user = this.props.auth;
        if(action === 'like'){
          let liked = ! this.state.likes;
          let countlikes = liked === true ? this.state.countlikes +1: this.state.countlikes - 1;
          this.setState({
            likes:liked,
            countlikes:countlikes
          })
        }else {
          let disliked = !this.state.dislikes;
          let countdislikes = disliked === true ? this.state.countdislikes +1: this.state.countdislikes - 1;
          this.setState({
            dislikes:disliked,
            countdislikes:countdislikes
          })
        }
        if (typeof user != 'undefined' && user.authenticated === true) {
            fetch('/api/likes', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action:action,
                    id_article:id,
                    id: user.content.id,
                    name: user.content.name,
                    image: user.content.image,
                })
            }).then((response)=> response.json()).then((responseJson)=>{
            }).catch((err)=>{
                console.log(err);
            });
        }
    }

    render() {

        const article = this.state.detail;
        const listComment = this.state.comments.length > 0 ?
            this.state.comments.map((cmt, i) => {
                return (
                    <li className="comment" key={cmt._id}>
                        <div className="comment-38983">
                            <div>
                                <div className="avatar avatar-32 photo"  style={{backgroundImage: 'url('+ cmt.image+')'}}/>
                                <cite>{ cmt.name }</cite>
                                <div className="comment-link">
                                    <span className="icon-clock"> </span>
                                    <time>{ common.NiceTime(cmt.date) }</time>
                                </div>
                            </div>
                            <div className="comment-content">
                                <p>{ cmt.content }</p>
                            </div>
                            <div className="comment-meta comment-38983">
                                <div className="comment-reply-link"><span className="icon-reply"/> Trả lời
                                </div>
                            </div>
                          </div>

                            <div className="reply-form" id="replyform">
                              { cmt.reply.map((rep,k)=>{
                                return(
                                <div key={rep._id}>
                                  <div className="avatar avatar-32 photo"  style={{backgroundImage: 'url('+ rep.image+')'}}>
                                  </div>
                                  <div>
                                    <cite>{ rep.name }</cite>
                                    <div className="comment-link">
                                      <span className="icon-clock"> </span>
                                      <time>{ common.NiceTime(rep.date) }</time>
                                    </div>
                                  </div>
                                  <div className="comment-content">
                                    <p>{ rep.content }</p>
                                  </div>
                                  <div className="clearfix"></div>
                                </div>
                                );
                              })
                              }
                                <div className="clearfix"></div>
                                <div className="clearfix"   id="reply-form-input-wrap">
                                    <div className="commenter-avatar-wrap">
                                        <div className="commenter-avatar"
                                             style={{ backgroundImage: 'url("./images/avatar.jpg")' }}/>
                                    </div>
                                    <textarea id="reply" name="reply" className = { 'reply-'+cmt._id.toString() } placeholder="Ý kiến của bạn?"  />
                                    <div id="reply-nofitication"
                                         className="comment-notify-wrap">
                                        <p className="comment-notify"/>
                                    </div>
                                </div>
                                <div id="reply-submit-wrap" className="clearfix">
                                    <div id="reply-submit" onClick={ this.handleComment.bind(this,cmt._id.toString()) } >Gửi <span
                                        className="icon-right"/></div>
                                </div>
                            </div>
                    </li>
                );
            }) : '';

        const ListArticleHot = this.state.hot.map((hot, i) => {
            return (
                <div key={hot._id}>
                    <div className="photoListItemSmall">
                        <a href={'/chi-tiet/' + hot._id }>
                            <div className="thumbnail">
                                <img className="thumb-img" src={ hot.image }
                                     alt="not found image"/>
                            </div>
                            <div className="info">
                                <h3>{ hot.title }</h3>
                                <div className="user">
                                    <span className="user-by">bởi</span>
                                    <span className="name">{ typeof hot.user !== 'undefined' ? <a href={'/user/'+hot.userSlug} >{hot.user.name }</a> : <a href={'/user/unknown'} >unknown &nbsp;</a> }</span>

                                </div>
                                <div className="time_ago">{ common.NiceTime(hot.date) }</div>
                            </div>
                            <div className="clear">
                            </div>
                        </a>
                    </div>
                </div>
            );
        });
        return (
            <div>
                <div id="main">
                    <section>
                        <div id="content-holder">
                            <div className="photoDetails">
                                <div className="photoInfo">
                                    <h1>{ article.title }</h1>
                                </div>
                            </div>
                            <div id="post-control-bar" className="spread-bar-wrap">
                                <div className="spread-bar">
                                    <div id="facebook-btn" className="facebook-btn">
                                        <a className={ this.state.likes === true ? "stat-item_like liked" : "stat-item_like"} onClick={ this.handlelikes.bind(this,'like') }> <i
                                            className="fa fa-thumbs-up icon"/> { this.state.countlikes }
                                        </a>
                                        <a className={ this.state.dislikes === true ? "stat-item_like liked" : "stat-item_like"} onClick={ this.handlelikes.bind(this,'dislike') } > <i className="fa fa-thumbs-down icon"/>
                                            { this.state.countdislikes }
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div id="content">
                                <div className="post-container">
                                    <div className="img-wrap">
                                        <div id="divVideoAds">
                                            <div id="video-container" className="text-center">
                                                { article.linkVideo !== '' ?
                                                    <iframe id="video-iframe" className="video-iframe" width="100%"
                                                            height={450}
                                                            src={"https://www.youtube.com/embed/" + article.linkVideo}
                                                            frameBorder={0} allowFullScreen={1}/> :
                                                    <img className="" src={article.image}/> }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-info-wrapper">
                                    <div className="uploader">
                                        <div className="avatar"><img
                                            src={ typeof article.user !== 'undefined' ? article.user.image : '/images/avatar.jpg' }/>
                                        </div>
                                        <div className="info">
                                            <div className="uploader-name">
                                                { typeof article.user !== 'undefined' ? <a href={'/user/'+article.userSlug} >{article.user.name }</a> : <a href={'/user/unknown'} >unknown &nbsp;</a> }
                                            </div>
                                            <div>
                                                <button className="subcribe_user">Đăng kí</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="post-info">
                                        <div className="post-date">
                                            Đăng { typeof article.date !== 'undefined' ? common.NiceTime(article.date) : '' }</div>
                                        <div className="stats">
                                                <span title="Lượt xem" className="views"> <span
                                                    className="number">{ typeof article.views !== 'undefined' ? article.views : 0 }</span></span>
                                            <span title="Bình luận" className="comments"> <span
                                                className="number">{ typeof article.comments !== 'undefined' ? article.comments.length : 0 }</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="clear"/>
                                <div className="comment-section">
                                    <div className="post-comment">
                                        <div className="commentss" id="comments">
                                            <div className="comment-respond" id="respond">
                                                <div className="comment-form" id="commentform">
                                                    <div className="clearfix" id="comment-form-input-wrap">
                                                        <div className="commenter-avatar-wrap">
                                                            <div className="commenter-avatar"
                                                                 style={{backgroundImage: 'url("./images/avatar.jpg")'}}/>
                                                        </div>
                                                        <textarea id="comment" name="comment"
                                                                  placeholder="Bạn nghĩ gì về bài viết này?"
                                                                  ref="comment"/>
                                                        <div id="comment-nofitication"
                                                             className="comment-notify-wrap">
                                                            <p className="comment-notify"/>
                                                        </div>
                                                    </div>
                                                    <div id="comment-submit-wrap" className="clearfix">
                                                        <div id="comment-submit" style={{ marginTop: 0}} onClick={ this.handleComment.bind(this,'') }>Gửi bình
                                                            luận <span
                                                                className="icon-right"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ol className="comment-list" id="comment-list">
                                                { listComment }
                                            </ol>

                                            <div id="more-comment-wrap">
                                                <a href="javascript:void(0);" className="more-comment"
                                                   onclick="show_comments()">XEM THÊM...</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                < aside >
                    < div className="side-bar">
                        <div className="s-300">
                            <div className="title-post_hot">Tin hót trong ngày</div>
                            <div className="box darkBox randomBox">
                                {ListArticleHot}
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
        details: state.details,
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDetailArticle: getDetailArticle
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
