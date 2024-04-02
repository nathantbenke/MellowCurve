import {React, Component} from 'react'
import { Container } from 'react-bootstrap'
import Login from "../elements/Login/Login"

import 'bootstrap/scss/bootstrap.scss'
import './Home.scss'

class Landing extends Component {

    componentDidMount () {      
     }

    render () {
        return ( 
            <Container fluid className="p-0 home-container fill-height">
              <h1 className="text-center pt-5 mb-2">MellowCurve</h1>
              <h3 className="text-center mt-2 pb-5">Digital Sampler</h3>
              <div className="d-flex justify-content-center">
                  <Login />
              </div>
            </Container>
        );
    }
}

export default Landing;
