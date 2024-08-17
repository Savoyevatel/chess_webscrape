import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listSavedOpenings, deleteOpening } from '../actions/savedActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const SaveScreen = () => {
  const dispatch = useDispatch();

  const openingList = useSelector((state) => state.openingList);
  const { loading, error, savedOpenings } = openingList;

  const openingDelete = useSelector((state) => state.openingDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = openingDelete;

  useEffect(() => {
    dispatch(listSavedOpenings());
  }, [dispatch, successDelete]);  // Re-fetch the list after successful deletion

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this opening?')) {
      dispatch(deleteOpening(id));
    }
  };

  return (
    <Container>
      <Link to='/'>Go Back</Link>
      <h1 className="my-4">Saved Openings</h1>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : savedOpenings.length === 0 ? (
        <p>No saved items found.</p>
      ) : (
        savedOpenings.map((item, index) => (
          <Card key={index} className="mb-4">
            <Card.Body>
              <Card.Title>{item.heading}</Card.Title>
              <Row>
                <Col>
                  <p><strong>Moves:</strong> {item.moves}</p>
                </Col>
                <Col>
                  <Button
                    as={Link}
                    to={`/opening-details/${encodeURIComponent(item.heading)}/${encodeURIComponent(item.moves)}/${encodeURIComponent(item.defense)}`}
                  >
                    View Opening
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(item.id)}  // Handle delete
                  >
                    Delete Opening
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default SaveScreen;
