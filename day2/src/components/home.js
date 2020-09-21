import React from "react";
import Rest from "./Rest";
export default class Home extends React.Component {
  //SEARCH
  state = {
    query: "",
    entity_id: "11299",
    entity_type: "city",
    city_name: "Manipal",
    res: []
  };

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
          "user-key": "f96f5f00b16133106eac209d1cb6724b"
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
    this.setState({ city: this.state.query });
    fetch(
      // `https://developers.zomato.com/api/v2.1/cities?q=${this.state.query}`,
      `https://developers.zomato.com/api/v2.1/locations?query=${this.state.query}`,
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
        this.setState({ entity_id: data.location_suggestions[0].entity_id });
        this.setState({
          entity_type: data.location_suggestions[0].entity_type,
          city_name: data.location_suggestions[0].city_name
        });
        fetch(
          `https://developers.zomato.com/api/v2.1/location_details?entity_id=${data.location_suggestions[0].entity_id}&entity_type=${data.location_suggestions[0].entity_type}`,
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
            this.setState({ res: data.best_rated_restaurant });
          });
        //console.log(data.location_suggestions[0].entity_id);
        //console.log(this.state);works here
      });
    // console.log(this.state);
  }

  render() {
    return (
      <>
        <form>
          <input
            id="searchBar"
            placeholder="Enter your city"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleSearch.bind(this)} id="search">
            {" "}
            Search{" "}
          </button>
        </form>
        <div class="heading">Top restaurants in {this.state.city_name}</div>
        {this.state.res.map((rest) => {
          return (
            <Rest
              resid={rest.restaurant.id}
              title={rest.restaurant.name}
              cuisine={rest.restaurant.establishment[0]}
              image={rest.restaurant.thumb}
              rating={rest.restaurant.user_rating.aggregate_rating}
              avgcost={rest.restaurant.average_cost_for_two}
              location={this.props.location}
            />
          );
        })}
      </>
    );
  }
}
