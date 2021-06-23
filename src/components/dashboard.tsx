import React, { useContext, useRef } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Form, ListGroup, InputGroup } from 'react-bootstrap';

import IdentityContext from '../context/identity-context';

// interface Props {}

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
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

const Dashboard = () => {
  const { user, identity: netlifyIdentity } = useContext(IdentityContext);

  const inputRef = useRef();

  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  // console.log(todos);
  // console.log('displatch! :', dispatch, 'data! :', data);

  return (
    <div>
      <span>Hallo {user && user.user_metadata.full_name}, welkom!</span>

      {user && (
        <Button
          variant="outline-danger"
          type="button"
          className="px-4 mx-4"
          onClick={() => {
            netlifyIdentity.logout();
          }}
        >
          Log out {user.user_metadata.full_name}
        </Button>
      )}

      <div className="container my-5">
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            await addTodo({ variables: { text: inputRef.current.value } });
            inputRef.current.value = '';
            await refetch();
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
              <ListGroup as="ul">
                {data.todos.map((todo) => (
                  <>
                    <ListGroup.Item
                      eventKey={todo.id}
                      as="li"
                      className="d-flex justify-content-evenly"
                      onClick={async () => {
                        await updateTodoDone({ variables: { id: todo.id } });
                        await refetch();
                      }}
                    >
                      <InputGroup.Checkbox
                        aria-label="Checkbox for following text input"
                        checked={todo.done}
                      />
                      <span>{todo.text}</span>
                    </ListGroup.Item>
                  </>
                ))}
                {console.log(data)}
              </ListGroup>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Dashboard;
