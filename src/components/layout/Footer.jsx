import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    let today = new Date();

  return (
    <footer className='bg-dark text-light py-3 footer mt-lg-5 ' style={{zIndex:1000}}>
        <Container>
            <Row>
                <Col>
                    <h5>&copy; {today.getFullYear()} Silver Sea Hotel</h5>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
