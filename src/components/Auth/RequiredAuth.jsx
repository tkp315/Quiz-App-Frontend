import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import PropTypes from 'prop-types';
function RequiredAuth({ allowedRoles }) {
  const { isLoggedIn ,user} = useSelector((state) => state.auth);
  const role = user.role
  return isLoggedIn && allowedRoles.find((myrole) => myrole === role) ? (
    <Outlet></Outlet>
  ) : isLoggedIn ? (
      <Link to='/access-denied'></Link>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
RequiredAuth.propTypes = {
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
  
export default RequiredAuth;