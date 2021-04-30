import React from 'react'

const Nav = ({account}) => {
    return(
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <small className="navbar-brand">{account}</small>
        </nav>
    )
}


export default Nav