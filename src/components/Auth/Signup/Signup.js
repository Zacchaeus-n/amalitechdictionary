import React, { useRef } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../ducks/auth.duck";

const Signup = (props) => {
  const USER_TAKEN = "auth/email-already-in-use";
  let DIFFERENT_PASSWORDS = "";

  // getting inputs
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // redirect with useHistory
  const { history } = props;

  const dispatch = useDispatch();
  const { signupInProgress, signupError } = useSelector((state) => state.auth);

 
  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      DIFFERENT_PASSWORDS = "Passwords do not match";
      console.log(DIFFERENT_PASSWORDS);
      return -1;
    }

    const values = {
      firstName: "Zacchaeus",
      lastName: "Napuo",
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await dispatch(signup(values));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const errorMessage = signupError
    ? signupError.code === USER_TAKEN
      ? "User already exist"
      : "Passwords do not match"
    : null;

  // Component return
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center app_wrap">
        <div className="w-100 signup_wrap">
          <Card className="signup_card">
            <Card.Body className="card_body">
              <h2 className="text-center md-4">Sign Up</h2>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              {DIFFERENT_PASSWORDS && (
                <Alert variant="danger">{DIFFERENT_PASSWORDS}</Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password" className="w-100 mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="passwordConfirm" className="w-100 mt-3">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button
                  disabled={signupInProgress}
                  type="submit"
                  variant='custom'
                >
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
            <div className="w-100 text-center mt-2">
              <p>
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Signup;
