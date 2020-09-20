import React from "react";
export default class Rest extends React.Component {
  state = { liked: 0, likes: this.props.likes };
  render() {
    const liked = this.state.liked;
    let button;
    if (liked) {
      button = (
        <div
          onClick={() =>
            this.setState({ liked: false, likes: this.state.likes - 1 })
          }
          className="dislike"
        >
          <span role="img" aria-label="dislike">
            👎{this.state.likes}
          </span>
        </div>
      );
    } else {
      button = (
        <div
          onClick={() =>
            this.setState({ liked: true, likes: this.state.likes + 1 })
          }
          className="like"
        >
          <span role="img" aria-label="like">
            👍 {this.state.likes}
          </span>
        </div>
      );
    }
    return (
      <div className="card">
        <img src={this.props.image} alt="rest img" height="200" width="200" />
        <h1>{this.props.title}</h1>
        <p className="ratings">{this.props.rating} / 5</p>
        <p>{this.props.timings}</p>
        {button}
        
      </div>
    );
  }
}


