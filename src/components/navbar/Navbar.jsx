import { Link } from "react-router-dom";
import "./style.scss";

const logo = "https://cdn-icons-png.flaticon.com/128/528/528101.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav__container">
        <div className="nav__logo">
          <img src={logo} alt="logo" />
          <p>Pokédex</p>
        </div>
        <ul className="nav__list">
          <li className="nav__pokemon">
            <Link to={"/"} className="link">
              Search
            </Link>
            <div className="hover"></div>
          </li>

          <li className="nav__bookmark">
            <Link to={"/booknark"} className="link">
              Bookmark
            </Link>
            <div className="hover"></div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
