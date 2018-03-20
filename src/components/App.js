import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then(response => {
    return this.setState({posts: response.data})
    })
  }

  updatePost(id,text) {
    var updated = axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, { text }).then(res => {
      return this.setState({posts: res.data})
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then(res => {
      return this.setState({posts: res.data})
    })
  }

  createPost() {

  }

  render() {
    const { posts } = this.state;


    let postList = posts.map((e,i) => {
      return <Post key={i} text={JSON.stringify(e.text)} date={e.date} updatePostFn={this.updatePost} deletePostFn={this.deletePost} id={e.id} />
    });
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          {postList}
          
          
        </section>
      </div>
    );
  }
}

export default App;
