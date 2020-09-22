import React from "react";
import { Link } from "react-router-dom";
export default class Rest extends React.Component {
  
constructor(props) {
  super(props)

  this.state = { liked: 0, likes: 78 }
}

  render() {
    const liked = this.state.liked;
    let button;
    const img =
      this.props.image === ""
        ? "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
        : this.props.image;
    if (liked) {
      button = (
        <div
          onClick={() =>
            this.setState({ liked: false, likes: this.state.likes - 1 })
          }
          className="dislike"
        >
          <span class="likes " role="img" aria-label="dislike">
            👎 {this.state.likes} liked this
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
          <span class="likes" role="img" aria-label="like">
            👍 {this.state.likes} liked this
          </span>
        </div>
      );
    }
    return (
      <div className="card">
        {/* <Link to={{ pathname:`/res_details/${this.props.restaurant.res_id}`}} >Click here<Link/> */}
        <Link
          to={{
            pathname: `/res_details/${this.props.resid}`,
            state: {
              from: this.props.location.pathname
            }
          }}
        >
          <img
            src={img}
            alt="rest img"
            height="200"
            width="200"
            className="cardimg"
          />

          <div class="details">
            <h3>{this.props.title}</h3>
            <h4>{this.props.cuisine}</h4>
            <p className="ratings">{this.props.rating} / 5</p>
            <p className="avgcost">Avg cost for two: {this.props.avgcost}</p>
          </div>
          {button}
        </Link>
      </div>
    );
  }
}
