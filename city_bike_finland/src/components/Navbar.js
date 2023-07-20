
import { Routes, Route, Link } from "react-router-dom";
export default function Navbar(){
    return(
        <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Stations">Stations</Link>
          </li>
          <li>
          <Link to="/Journeys">Journeys</Link>
          </li>
        </ul>
      </nav>
    )
}