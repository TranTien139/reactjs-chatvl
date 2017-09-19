import React, {Component} from 'react';
import cookie from 'react-cookies';
const user = cookie.load('token');

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: ''
        }
    }

    handlePostInput(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value });
    }

    handleSubmitPost(e){
        e.preventDefault();
        fetch('/api/upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title:this.state.title,
                link:this.state.link,
                id: user.user.id,
                name: user.user.name,
                image: user.user.image,
                userSlug: user.user.userSlug
            })
        }).then((response)=> response.json()).then((responseJson)=>{
             window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <section>
                    <div id="main">
                        <div id="content-holder">
                            <div id="content">
                                <form onSubmit={ this.handleSubmitPost.bind(this)}>
                                    <div className="form-group">
                                        <input className="form-control" name="title" value={this.state.title} onChange={this.handlePostInput.bind(this)} placeholder="Tiêu đề"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" name="link" value={this.state.link} onChange={this.handlePostInput.bind(this)}  placeholder="Nhập link ảnh hoặc link youtube"/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Đăng bài</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <aside>

                </aside>
            </div>
        );
    }
}

export default Upload;