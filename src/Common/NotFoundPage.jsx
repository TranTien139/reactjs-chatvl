import React, { Component } from 'react';

class NotFoundPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 0
        }
    }

    render(){
        return (
            <div>
                <section>
                    <h1>Không tìm thấy trang này</h1>
                </section>
            </div>
        );
    }
}

export default NotFoundPage;