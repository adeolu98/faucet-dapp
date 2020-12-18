import React, { Component } from 'react'
import Identicon from 'identicon.js';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends Component {

  render() {
    return (
      <nav className = "navbar navbar-dark fixed-top flex-md-nowrap p-0 shadow border-bottom border-secondary" style = {{backgroundColor: '#333F47'}}>
        <a  
        className = 'navbar-brand col-sm-3 col-md-2 mr-0'
        target = 'blank'
        rel = 'noopener noreferrer'
        >
          Token Faucet
        </a>

        <ul className='nav-bar-nav px-3'>
          <li className='nav-item text-nowrap d-none d-sm-none d-sm-block'>
            <small className= 'text-secondary'>
              <small id ="account" style = {{color: "white"}}> {this.props.account} </small>
            </small>
            
            { this.props.account
              ? <img
                className="ml-2"
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                alt=""
              />
              : <span></span>
            }

          </li>
        </ul>
        
      </nav> 
    );
  }
}

export default Navbar;
