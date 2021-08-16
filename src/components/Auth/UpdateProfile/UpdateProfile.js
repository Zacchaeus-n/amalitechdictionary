import React, { useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useAuth } from "../../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
// import { useAuth } from "../../../contexts/AuthContext";
import { emailUpdates, passwordUpdate } from "../../../ducks/auth.duck";
// import { fetchCurrentUser } from "../../../ducks/user.duck";

const UpdateProfile = (props) => {
  // getting inputs
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const passwordConfirmRef = useRef();

  // redirect with useHistory
  // const history = useHistory();
  // const { history } = props;

  // making use of authentication values : signup func
  // const { currentUser, UpdateEmail, updatePassword } = useAuth();
  // const { currentUser } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const {
  //   emailUpdateInProgress,
  //   emailUpdateError,
  //   passwordUpdateInProgress,
  //   passwordUpdateError,
  // } = useSelector((state) => state.auth);

  // state
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  // handling submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   console.log("Passwords do not match");
    //   return -1;
    // }

    // promises to handle changes
    // const promises = [];
    // setLoading(true);
    // setError("");
    // if (emailRef.current.value !== currentUser.email) {
    //   promises.push(dispatch(emailUpdates(emailRef.current.value)));
    // }

    // if (passwordRef.current.value) {
    //   promises.push(dispatch(passwordUpdate(passwordRef.current.value)));
    // }

    //   run if all promises were successful
    // Promise.all(promises)
    //   .then(() => history.push("/"))
    //   .catch((e) => console.log(e));
    // .finally(() => setLoading(false));
  };

  // Component return
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center md-4">Update Profile</h2>
          {/* {emailUpdateError && (
            <Alert variant="danger">{emailUpdateError}</Alert>
          )} */}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                // ref={emailRef}
                // defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password" className="w-100 mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                // ref={passwordRef}
                placeholder="Keep current password? Leave blank!"
              />
            </Form.Group>
            <Form.Group id="passwordConfirm" className="w-100 mt-3">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                // ref={passwordConfirmRef}
                placeholder="Keep current password? Leave blank!"
              />
            </Form.Group>
            <Button
              // disabled={passwordUpdateInProgress}
              className="w-100 mt-3"
              type="submit"
            >
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <p>
          <Link to="/">Cancel</Link>
        </p>
      </div>
    </>
  );
};

export default UpdateProfile;
