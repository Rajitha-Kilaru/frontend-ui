import { Link } from "react-router-dom";
import './Home.scss';

function Home() {
  return (
    <div className="main_container">
        <Link to='/login'>Login</Link><br />
        <Link to='/register'>register</Link><br />
        <Link to='/welcome'>welcome</Link>
    </div>
  )
}

export default Home;
