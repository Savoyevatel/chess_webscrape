import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveOpening, resetOpeningSave } from '../actions/openingActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const OpeningScreen = () => {
  const { heading, moves, defenseName } = useParams();
  const [games, setGames] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(true);

  const dispatch = useDispatch();

  const openingSave = useSelector((state) => state.openingSave);
  const { loading, error, success } = openingSave;

  useEffect(() => {
    if (success) {
      setShowSaveButton(false);
      dispatch(resetOpeningSave());
    }

    const moveList = decodeURIComponent(moves).split(/\s*\d+\.\s*/).filter(Boolean);
    const moveSequences = [];
    let fullMoves = '';

    moveList.slice(0, 3).forEach((move, index) => {
      fullMoves += move + ' ';
      moveSequences.push(fullMoves.trim());
    });

    const newGames = moveSequences.map(sequence => {
      const newGame = new Chess();
      const movesArray = sequence.split(' ');
      movesArray.forEach(m => {
        newGame.move(m);
      });
      return newGame;
    });

    setGames(newGames);
  }, [moves, success, dispatch]);

  const handleSave = () => {
    const data = {
      defense: decodeURIComponent(defenseName),
      heading: decodeURIComponent(heading),
      moves,
    };
    dispatch(saveOpening(data));
  };

  const getHighlightedSquares = (game, moveCount) => {
    const history = game.history({ verbose: true });
    const squares = {};
    const highlightMoves = history.slice(-moveCount);

    highlightMoves.forEach(move => {
      squares[move.to] = {
        background: 'radial-gradient(circle, red 50%, transparent 40%)',
        borderRadius: '50%',
      };
    });

    return squares;
  };

  return (
    <Container>
      <Link to='/blackscreen'>Go Back</Link>
      <h1 className="my-4">{decodeURIComponent(heading)}</h1>
      {games.map((game, index) => (
        <Card key={index} className="mb-4">
          <Card.Body>
            <Card.Title>State {index + 1}</Card.Title>
            <Row className="justify-content-center">
              <Col xs={12} md={8} lg={6}>
                <Chessboard 
                  position={game.fen()} 
                  width={350}
                  squareStyles={getHighlightedSquares(game, 2)} // Highlight the last 2 moves
                />
              </Col>
            </Row>
            <Card.Text className="mt-3">
              Moves: {game.history().join(', ')}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}

      {showSaveButton && (
        <Button className='save-button' onClick={handleSave}>
          {loading ? <Loader /> : 'Save Opening'}
        </Button>
      )}
      {error && <Message variant='danger'>{error}</Message>}
    </Container>
  );
};

export default OpeningScreen;
