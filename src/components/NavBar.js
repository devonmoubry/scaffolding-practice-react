import React, { Component } from 'react';
export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse bg-primary">
        <a className="navbar-brand">Navbar</a>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
    )
  }
}
