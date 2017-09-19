import React, { Component } from 'react';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){

    }

    render(){
        return (
            <div>
                <section>
                    <div id="main">
                        <div id="content-holder">
                            <div id="content">
                                <input className="form-control" name="search" placeholder = "tim kiem" />
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

export default Search;