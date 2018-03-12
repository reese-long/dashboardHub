import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div id = 'navContainer'>
  <div id = 'titleContainer' >
    <h1 id = 'navTitle' >IoT-Dashboard</h1>
    <img id = "titleLogo" src = '/slider.png' />
    </div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <NavLink activeClassName="active" activeStyle = {{backgroundColor:'white'}}  className = 'navLink' to="/home">Home</NavLink>
          <a  activeStyle = {{backgroundColor:'White'}}  className = 'navLink' href="#" onClick={handleClick}>

            Logout
          </a>

        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <NavLink activeClassName="active" activeStyle = {{backgroundColor:'white'}} className = 'navLink' to="/login">Login</NavLink>
          <NavLink activeClassName="active" activeStyle = {{backgroundColor:'white'}}  className = 'navLink' to="/signup">Sign Up</NavLink>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
