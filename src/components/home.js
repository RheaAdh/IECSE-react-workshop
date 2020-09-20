import React from "react";
import Rest from "./Rest";
import Data from "./Data"
export default class Home extends React.Component {
  //SEARCH
  state = {
    query: ""
  };

  handleInputChange = (event) => {
    this.setState({
      query: event.target.value
    });
  };

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
          <button id="search"> Search {this.state.query} </button>
        </form>
        {Data.map((rest)=>{
          return <Rest 
          image={rest.image} 
          title={rest.title}
          rating={rest.rating}
          timings={rest.timings}
          likes={rest.likes}/>
        })}
        
        
        
      </>
    );
  }
}
