import React from "react";
import Rest from "./Rest";
require("dotenv").config();
export default class Home extends React.Component {
  //SEARCH
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      query: "",
      entity_id: "11299",
      entity_type: "city",
      city_name: "Manipal",
      res: [],
      alertyes: false
    };
  }

  handleInputChange = (event) => {
    this.setState({
      query: event.target.value
    });
  };

  componentDidMount() {
    // console.log(this.state);
    fetch(
      `https://developers.zomato.com/api/v2.1/location_details?entity_id=${this.state.entity_id}&entity_type=${this.state.entity_type}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-key": process.env.REACT_APP_API_KEY
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ res: data.best_rated_restaurant });
        // console.log(data);
        // console.log(data.best_rated_restaurant);
      });
  }

  handleSearch(e) {
    e.preventDefault();
    this.setState({ city: this.state.query.toLowerCase() });
    fetch(
      // `https://developers.zomato.com/api/v2.1/cities?q=${this.state.query}`,
      `https://developers.zomato.com/api/v2.1/locations?query=${this.state.query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-key": process.env.REACT_APP_API_KEY
        }
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.location_suggestions.length === 0) {
          this.setState({
            alertyes: true
          });
        } else {
          this.setState({ entity_id: data.location_suggestions[0].entity_id });
          this.setState({
            alertyes: false,
            entity_type: data.location_suggestions[0].entity_type,
            city_name: data.location_suggestions[0].city_name
          });

          fetch(
            `https://developers.zomato.com/api/v2.1/location_details?entity_id=${data.location_suggestions[0].entity_id}&entity_type=${data.location_suggestions[0].entity_type}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "user-key": process.env.REACT_APP_API_KEY
              }
            }
          )
            .then((response) => response.json())
            .then((data) => {
              this.setState({ res: data.best_rated_restaurant });
            });
        }
        //console.log(data.location_suggestions[0].entity_id);
        //console.log(this.state);works here
      });

    // console.log(this.state);
  }

  render() {
    const form = (
      <form>
        <input
          id="searchBar"
          placeholder="Enter your city"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch} id="search">
          {" "}
          Search{" "}
        </button>
      </form>
    );
    return (
      <>
        {this.state.alertyes === true ? (
          <div>
            {" "}
            <h1>No results found</h1>
            {form}
          </div>
        ) : (
            <div>
              <div className="heading">
                <div> Top restaurants in {this.state.city_name} </div>
                <div>{form}</div>
              </div>

              <div className="restaurants">
                {this.state.res.map((rest, index) => {
                  return (
                    <Rest
                      resid={rest.restaurant.id}
                      title={rest.restaurant.name}
                      cuisine={rest.restaurant.establishment[0]}
                      image={rest.restaurant.thumb}
                      rating={rest.restaurant.user_rating.aggregate_rating}
                      avgcost={rest.restaurant.average_cost_for_two}
                      location={this.props.location}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          )}
      </>
    );
  }
}
