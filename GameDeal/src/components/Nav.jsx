import { Link } from "react-router";

function Nav() {
  return (
    <div className="nav">
      <Link to="/">
        <div>WELCOME</div>
      </Link>
      <Link to="/deals">
        <div>Game Deals</div>
      </Link>
    </div>
  );
}

export default Nav;
