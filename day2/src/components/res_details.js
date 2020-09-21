import React from "react";
import { Link } from "react-router-dom";
export default class ResDetails extends React.Component {
  state = {
    data: {}
  };
  componentDidMount() {
    console.log(this.props);
    fetch(
      `https://developers.zomato.com/api/v2.1/restaurant?res_id=${this.props.match.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-key": "f96f5f00b16133106eac209d1cb6724b"
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data });
        //console.log(data);
      });
  }
  render() {
    const imgSrc =
      this.props.image === ""
        ? "https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"
        : this.state.data.featured_image;

    const { from } = this.props.location.state || { from: "/" };
    return (
      <div className="mainDetails">
        <Link to={from}>
          <button>Back To Home</button>
        </Link>

        <img src={imgSrc} height="500" width=" 500" alt="" />
        <div className="detailText">
          <h1>{this.state.data.name}</h1>
          <h3>Timings: {this.state.data.timings}</h3>
          <h3>Cuisines: {this.state.data.cuisines}</h3>
          <h3>Contact: {this.state.data.phone_numbers}</h3>
        </div>
      </div>
    );
  }
}
