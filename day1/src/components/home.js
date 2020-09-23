
import Data from "./Data";
import React from "react";
import Rest from "./Rest";
require("dotenv").config();
export default class Home extends React.Component {
  //SEARCH
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    }
  }

  handleInputChange = (event) => {
    this.setState({
      query: event.target.value
    });
  };

  render() {
    const form = (
      <form>
        <input
          id="searchBar"
          placeholder="Enter your city"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <button id="search">
          
          Search
        </button>
      </form>
    );
    return (
      <>

        <div>
          <div className="heading">
            <div> Top restaurants in Manipal </div>
            <div>{form}</div>
          </div>

          <div className="restaurants">
            {Data.map((rest, index) => {
              return (
                <Rest
                  resid={rest.id}
                  title={rest.title}
                  cuisine={rest.cuisine}
                  image={rest.image}
                  rating={rest.rating}
                  avgcost={rest.avgcost}
                  location={this.props.location}
                  likes={rest.likes}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

