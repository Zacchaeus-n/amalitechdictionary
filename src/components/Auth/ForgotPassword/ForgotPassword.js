import React, { useRef } from "react";
import { Alert, Button, Card, Form, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetPassword } from "../../../ducks/auth.duck";

const ForgotPassword = () => {
  // getting inputs
  const emailRef = useRef();

  const dispatch = useDispatch();
  const { passwordResetInProgress, passwordResetError, passwordResetSuccess } =
    useSelector((state) => state.auth);

  // handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(resetPassword(emailRef.current.value));
    } catch (error) {
      console.log(`Password reset error ${error}`);
    }
  };

  // Component return
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center app_wrap">
        <div className="w-100 signup_wrap">
          <Card className="signup_card">
            <Card.Body className="card_body">
          <h2 className="text-center md-4">Reset Password</h2>
          {passwordResetError && (
            <Alert variant="danger">{passwordResetError}</Alert>
          )}
          {passwordResetSuccess && (
            <Alert variant="success">{passwordResetSuccess}</Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button
              disabled={passwordResetInProgress}
              type="submit"
              variant='custom'
            >
              Reset Password
            </Button>
            <div className="w-100 text-center mt-3">
              <p>
                <Link to="/login">Back to Log In Page</Link>
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
    </>
  );
};

export default ForgotPassword;
