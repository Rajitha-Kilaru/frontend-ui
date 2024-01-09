import { Link } from "react-router-dom";

function Home() {
return(
    <div>
      <Link to='/login'>Login</Link><br/>
      <Link to='/register'>register</Link><br/>
      <Link to='/welcome'>welcome</Link>

    </div>
)
}

export default Home;
