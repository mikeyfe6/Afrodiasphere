import React, { useContext, useRef, useReducer } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Form, ListGroup, InputGroup } from 'react-bootstrap';

import IdentityContext from '../context/identity-context';

// interface Props {}

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(text: "one todo") {
      id
    }
  }
`;

const UPDATE_TODO_DONE = gql`
  mutation UpdateTodoDone($id: ID!) {
    updateTodoDone(id: $id) {
      text
      done
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;

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
  const [todos] = useReducer(todosReducer, []);

  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  console.log(data);
  // console.log('displatch! :', dispatch, 'data! :', data);

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
            addTodo({ variables: { text: inputRef.current.value } });
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
            {loading ? <div>loading...</div> : null}
            {error ? <div>{error.message}</div> : null}
            {!loading && !error && (
              <ListGroup>
                {data.todos.map((todo) => (
                  <>
                    <ListGroup.Item
                      key={todo.id}
                      className="d-flex justify-content-evenly"
                      onClick={() => {
                        updateTodoDone({ variables: { id: todo.id } });
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
                {/* {console.log(todos)} */}
              </ListGroup>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Dashboard;
