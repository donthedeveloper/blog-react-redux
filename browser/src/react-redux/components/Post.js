import React from 'react';

class Post extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state={
  //     editMode: false
  //   }
  // }
  //
  // toggleEditMode() {
  //   this.setState({
  //     editMode: !this.state.editMode
  //   });
  // }
  //
  // savePost() {
  //   const data = new FormData(e.target);
  //   const post = {
  //     title: data.get('title'),
  //     introParagraph: data.get('introParagraph'),
  //     content: data.get('content')
  //   };
  //   props.updatePost(post);
  // }

  render() {
    return(
      <article>
        {/* this.state.editMode &&
          <form>
            <label htmlFor="post-title">Title:</label><br />
            <input id="input-post-title" name="title" type="text" defaultValue={this.props.post.title} /><br />

            <label htmlFor="input-introParagraph">Intro Paragraph:</label><br />
            <input id="input-introParagraph" name="introParagraph" type="text" defaultValue={this.props.post.title} /><br />

            <label htmlFor="input-content">Content:</label><br />
            <textarea id="input-content" name="content" defaultValue={this.props.post.content} />
          </form>
        }
        { !this.state.editMode &&
          <div>
            <h2>{this.props.post.title}</h2>
            <p>{this.props.post.introParagraph}</p>
            <p>{this.props.post.content}</p>
          </div>
        */}
        {/*<img src={ props.post.img } alt="" />*/}
        {/*<button onClick={(e) => this.props.removePost(this.props.post.id)}>Delete</button>
        <button onClick={(e) => this.toggleEditMode()}>
          { (this.state.editMode) ? 'Save' : 'Edit' }
        </button>*/}
        <h2>{this.props.post.title}</h2>
        <p>{this.props.post.introParagraph}</p>
        <p>{this.props.post.content}</p>
      </article>
    );
  }
}

export default Post;
