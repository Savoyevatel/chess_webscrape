import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import axios from 'axios';

const OpeningScreen = () => {
  const { heading, moves, defenseName } = useParams();
  const [games, setGames] = useState([]);

  useEffect(() => {
    const moveList = moves.split(/\s*\d+\.\s*/).filter(Boolean);
    const moveSequences = [];
    let fullMoves = '';

    moveList.forEach((move, index) => {
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
  }, [moves]);

  const handleSave = async () => {
    const data = {
      defense: decodeURIComponent(defenseName),
      heading: decodeURIComponent(heading),
      moves
    };

    console.log('Sending data:', data);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/save-result/', data);
      console.log('Saved:', response.data);
      // Add user feedback here (e.g., alert, toast notification)
    } catch (error) {
      console.error('Error saving result:', error.response?.data || error.message);
      // Add error feedback for the user here
    }
  };

  const getHighlightedSquares = (game, moveCount) => {
    const history = game.history({ verbose: true });
    const squares = {};
    const highlightMoves = history.slice(-moveCount);

    highlightMoves.forEach(move => {
      squares[move.to] = {
        background: 'radial-gradient(circle, blue 50%, transparent 40%)',
        borderRadius: '50%'
      };
    });

    return squares;
  };

  return (
    <Container>
      <Link to='/'>Go Back</Link>
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

      <Button className='save-button' onClick={handleSave}>Do you want to save this?</Button>
    </Container>
  );
};

export default OpeningScreen;
