import React, { useState } from 'react'
import axios from 'axios'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col, Card } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function BlackScreen() {
  const [defenseName, setDefenseName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState([])
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResults([])

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        '/api/chess/scrape/',
        { name: defenseName },
        config
      )
      setResults(data.results)
      console.log(data.results)

    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred')

    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (heading, moves) => {
    const formattedMoves = Array.isArray(moves) ? moves.join(' ') : moves
    navigate(`/opening-details/${encodeURIComponent(heading)}/${encodeURIComponent(formattedMoves)}/${encodeURIComponent(defenseName)}`)
  }

  return (
    <FormContainer>
      <Link to='/'>Go Back</Link>
      <h1 className="my-4">Select a Defense!</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='defenseName'>
          <Form.Control
            type='text'
            placeholder='Enter Defense'
            value={defenseName}
            onChange={(e) => setDefenseName(e.target.value)}
            required
          />
        </Form.Group>

        <Button type='submit' variant='primary' disabled={loading}>
          {loading ? 'Searching...' : 'Ready!'}
        </Button>
      </Form>

      {error && <p className="text-danger mt-3">{error}</p>}

      {results.length > 0 && (
        <Row className="mt-4">
          <h2>Results:</h2>
          {results.map((result, index) => (
            <Col key={index} sm={12} md={6} lg={4} xl={3}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{result.heading}</Card.Title>
                  <Card.Text>
                    {Array.isArray(result.moves) ? result.moves.join(', ') : result.moves}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleViewDetails(result.heading, result.moves)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Row className='py-3'>
        <Col>
          Not sure? <Link to={'/'}>Suggestions!</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default BlackScreen
