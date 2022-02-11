import React, { Component, useReducer } from 'react';
import {Collapse,Nav,NavItem,NavLink,UncontrolledDropdown,
 Button, Input, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, Container, Label, InputGroup} from "reactstrap";
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {Helmet} from 'react-helmet'
import {Backend_Url} from './backend_url'
import {
  Audio,
  BallTriangle,
  Bars,
  Circles,
  Grid,
  Hearts,
  Oval,
  Puff,
  Rings,
  SpinningCircles,
  TailSpin,
  ThreeDots,
} from '@agney/react-loading';

  class Individual extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) { 
      super(props);
      this.state = {
        individual: {}
      };

      this.HandleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
      };

      this.RenderByIndividualType = () => {
        var individual = this.state.individual
        var individual_type = individual.individual_type
        if(individual_type == 'Student'){
          return<Col>
            <Row>
              <Col>
                <h6 style={{fontWeight: 'bold'}}>
                  Registration Number:
                </h6>
              </Col>
              <Col>
                {individual.registration_number}
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <h6 style={{fontWeight: 'bold'}}>
                  Degree:
                </h6>
              </Col>
              <Col>
                {individual.degree}
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <h6 style={{fontWeight: 'bold'}}>
                  School:
                </h6>
              </Col>
              <Col>
                {individual.department}
              </Col>
            </Row>
            <br/>
          </Col>
        }else if(individual_type == 'Staff'){
          return<Col>
            <Row>
              <Col>
                <h6 style={{fontWeight: 'bold'}}>
                  Work Number:
                </h6>
              </Col>
              <Col>
                {individual.registration_number}
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <h6 style={{fontWeight: 'bold'}}>
                  Designation:
                </h6>
              </Col>
              <Col>
                {individual.designation}
              </Col>
            </Row>
            <br/>
            <Row>
              <Col>
                <h6 style={{fontWeight: 'bold'}}>
                  Department:
                </h6>
              </Col>
              <Col>
                {individual.department}
              </Col>
            </Row>
            <br/>
          </Col>
        }else if(individual_type == 'Outsider'){
          return<Col>
          
          </Col>
        }else{
          return<Col>
          
          </Col>
        }
      }
    }

    componentDidMount() {
      this.setState({individual: this.props.individual})
    }




    render() {
      var individual = this.props.individual
      return (
        <div>
            <Helmet>
              <title>Dashboard - Individual</title>
              {/* <meta name="description" content="" /> */}
            </Helmet>
            <br/>
            <h6 style={{fontWeight: 'bold'}}>Individual</h6>
            <br/><br/>
            <Row style={{marginRight: '0px', textAlign: 'left'}}>
              <Col sm='3'>
                <img src={Backend_Url + 'media/' + individual.image} style={{width: '100%'}} />
              </Col>
              <Col>
                <Row>
                  <Col>
                    <h6 style={{fontWeight: 'bold'}}>
                      Firstname:
                    </h6>
                  </Col>
                  <Col>
                    {individual.firstname}
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    <h6 style={{fontWeight: 'bold'}}>
                      Lastname:
                    </h6>
                  </Col>
                  <Col>
                    {individual.lastname}
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    <h6 style={{fontWeight: 'bold'}}>
                      Individual Type:
                    </h6>
                  </Col>
                  <Col>
                    {individual.individual_type}
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    <h6 style={{fontWeight: 'bold'}}>
                      National ID Number:
                    </h6>
                  </Col>
                  <Col>
                    {individual.national_id_number}
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    <h6 style={{fontWeight: 'bold'}}>
                      Threat Level:
                    </h6>
                  </Col>
                  <Col>
                    {individual.threat_level}
                  </Col>
                </Row>
                <br/>
              </Col>
              <this.RenderByIndividualType/>
            </Row>
        </div>
      );
    }

  };
  
  export default withCookies(Individual);