import { Link} from 'react-router-dom'
import { clearUser } from "@/lib/redux/user.js";
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch(); // Move the dispatch inside the component

  const  logout = () : void => {
    localStorage.setItem('isLoggedIn',  JSON.stringify({isLogged : false, username: ''}))
    dispatch(clearUser());
  }

  return (
    <section className=" flex justify-center bg-dark-2 w-full">
      
      <div className=" flex flex-between py-4 px-5 items-center align-middle justify-center gap-5  w-3/4">
      <div>
      <Link to="/">
            <img src="/assets/icons/people.svg" alt="" />
          </Link>
      </div>
        <div>
          <Link to="/" className="flex gap-3 ">
            <img src="/assets/images/logo.svg"/>
          </Link>
        </div>

        <div className="flex gap-5 flex-around">
          <Link to="/">
            <img src="/assets/icons/people.svg" alt="" />
          </Link>
          <Link to="/">
            <img src="/assets/icons/people.svg" alt="" />
          </Link>
          <div onClick={logout}>
            <img src="/assets/icons/logout.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header