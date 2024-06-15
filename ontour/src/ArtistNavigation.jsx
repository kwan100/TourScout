import React from "react";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useState} from "react";
import { NavLink } from "react-router-dom";

function Navigation() 
{
  const [artist_name, setName] = useState('')

  const navigate = useNavigate(); 
  const routeChange = (artist) =>{ 
    navigate({
      pathname: '/artist', 
      search: createSearchParams({
      artist: artist_name,
      }).toString()
    });
  };

  return (
    <nav id="artist-nav" className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <a href="/">
          <img id="nav-logo" src= "images/logo.png" alt=""/>
        </a>
        {/* <div class="navsearch">
          <input id="input" type="text" class="form-control shadow-none" onChange={event => setName(event.target.value)} value={artist_name} placeholder="Search for an artist or venue"/>
          <button class="btn btn-dark" onClick={routeChange}>
            <img src="images/search_icon.png" alt="..."/>
          </button>
        </div> */}
      </div>
    </nav>
  );
}

export default Navigation;
