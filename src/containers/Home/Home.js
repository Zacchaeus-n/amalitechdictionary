import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Dictionary from "../../components/Dictionary/Dictionary";
import { logout } from "../../ducks/auth.duck";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../ducks/user.duck";
import LOGO_IMG from "../../images/logo.png";
import { Avatar } from "@material-ui/core";

const Home = (props) => {
  const { history } = props;

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  // handling log out
  const logoutHandler = async () => {
    dispatch(logout())
      .then(() => history.push("/login"))
      .catch(() => {
        /**handled in the auth.duck*/
      });
  };

  const fullName = currentUser && currentUser.displayName;
  const firstNameLetter = fullName ? fullName.charAt(0) : null;
  const email = currentUser && currentUser.email;

  return (
    <div className="main_app_wrap">
      <Card className="home_header_wrap">
        <Card.Body>
          <div className="homeHeader">
            <img src={LOGO_IMG} alt="Logo" />
            <div className="profile">
              <div className="profileDrop">
                {/* split email by the @ inton array  */}
                {/* <strong className="email">{email?.split('@')[0]}</strong> */}
                <Avatar className="avatar" title={email} variant="custom">{ firstNameLetter}</Avatar>
                <Button
                  className="logoutBtn"
                  variant="link"
                  onClick={logoutHandler}
                >
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Dictionary />
    </div>
  );
};

export default Home;
