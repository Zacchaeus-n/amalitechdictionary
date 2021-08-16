import React, { useRef } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../ducks/auth.duck";

const Login = (props) => {
  const WRONG_CREDENTIALS = "auth/wrong-password";
  const NOT_FOUND = "auth/user-not-found";
  const LOGIN_BLOCKED = "auth/too-many-requests";

  const errorMessageHandler = (error) => {
    switch (error.code) {
      case WRONG_CREDENTIALS:
        return "Wrong credentials";
      case NOT_FOUND:
        return "User does not exist";
      case LOGIN_BLOCKED:
        return "User blocked. Try again later.";
      default:
        return "Something went wrong, try again";
    }
  };

  // getting inputs
  const emailRef = useRef();
  const passwordRef = useRef();

  const { history } = props;

  const dispatch = useDispatch();
  const { loginInProgress, loginError } = useSelector((state) => state.auth);

  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(login(emailRef.current.value, passwordRef.current.value))
      .then(() => history.push("/"))
      .catch(() => {
        /**handled in the auth.duck */
      });
  };

  const errorMessage = loginError && errorMessageHandler(loginError);
  // const errorMessage = loginError ? errorMessageHandler(loginError):null
  

  // Component return
  return (
    <Container className="d-flex align-items-center justify-content-center app_wrap">
      <div className="w-100 login_wrap">
        <Card className="login_card">
          <Card.Body className="card_body">
            <h2 className="text-center md-4">Log In</h2>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} value="naazacchi@gmail.com" required />
              </Form.Group>
              <Form.Group id="password" className="w-100 mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} value="22222222" required />
              </Form.Group>
              <Button
                disabled={loginInProgress}
                type="submit"
                variant="custom"
              >
                Log In
              </Button>
              <div className="w-100 text-center mt-3">
                <p>
                  <Link to="/forgot-password">Forgot password?</Link>
                </p>
              </div>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mt-2">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Login;
