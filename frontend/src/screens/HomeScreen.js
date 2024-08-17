import React from 'react'
import { Row, Col, Container, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function HomeScreen() {


  return (
    <Container className="text-center">
      <h1 className="my-4">Choose a side!</h1>
      <Row className="justify-content-center">
        <Col xs={6} md={4} lg={3}>
          <LinkContainer to='/whitescreen'>
            <Image src="/images/white_chess.png" fluid alt="White Pawn" className="clickable" />    
          </LinkContainer>
        </Col>
        <Col xs={6} md={4} lg={3}>
          <LinkContainer to='/blackscreen'>
            <Image src="/images/black_chess.png" fluid alt="Black Pawn" className="clickable" />
          </LinkContainer>
        </Col>
      </Row>


    </Container>

  )
}

export default HomeScreen