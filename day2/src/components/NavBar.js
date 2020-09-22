import React from "react";
export default class NavigationBar extends React.Component {
  render() {
    return (
      <>
        <div className="navbar">
          <img
            height="50px"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png"
            alt="reactlogo"
          />
          <span className="title">Let's React</span>
        </div>
      </>
    );
  }
}
