import React, { useContext, useRef, useReducer } from 'react';

import { Button, Form, ListGroup, InputGroup } from 'react-bootstrap';
import IdentityContext from '../context/identity-context';

// interface Props {}

const todosReducer = (state, action) => {
  const newState = [...state];
  switch (action.type) {
    case 'addTodo':
      return [{ done: false, value: action.payload }, ...state];

    case 'toggleTodoDone':
      newState[action.payload] = {
        done: !state[action.payload].done,
        value: state[action.payload].value,
      };
      return newState;
    default:
  }
  return undefined;
};

const Dashboard = () => {
  const { gebruiker, identity: netlifyIdentity } = useContext(IdentityContext);

  const inputRef = useRef();
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <div>
      <span>
        Hallo {gebruiker && gebruiker.user_metadata.full_name}, welkom!
      </span>

      {gebruiker && (
        <Button
          variant="outline-danger"
          type="button"
          className="px-4 mx-4"
          onClick={() => {
            netlifyIdentity.logout();
          }}
        >
          Log out {gebruiker.user_metadata.full_name}
        </Button>
      )}

      <div className="container my-5">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              { type: 'addTodo', payload: inputRef.current.value },
              ...todos,
            );
            inputRef.current.value = '';
          }}
        >
          <Form.Group className="d-flex justify-content-between">
            <Form.Label htmlFor="add-die-todo">Add een todo </Form.Label>
            <Form.Control type="text" placeholder="Enter text" ref={inputRef} />
            <Button type="submit" className="mb-2">
              Submit
            </Button>
          </Form.Group>

          <div className="container mt-5 ">
            <ListGroup>
              {todos.map((todo, i) => (
                <>
                  <ListGroup.Item
                    className="d-flex justify-content-evenly"
                    onClick={() => {
                      dispatch({ type: 'toggleTodoDone', payload: i });
                    }}
                  >
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      checked={todo.done}
                    />
                    <span>{todo.value}</span>
                  </ListGroup.Item>
                </>
              ))}
              {console.log(todos)}
            </ListGroup>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Dashboard;
