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

  class Individuals extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) { 
      super(props);
      this.state = {
        individuals: []
      };

      this.HandleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
      };
    }

    componentDidMount() {
      const { cookies } = this.props

      var data = new FormData() 
      data.append('user_access_token', cookies.get('token'))
      
      axios.post(Backend_Url + 'individuals', data)
      .then((res) => {
          let result = res.data
          this.setState({individuals: result})
      }).catch((error) => {
          console.log(error)
      })
    }




    render() {
      var individuals = this.state.individuals

      if(individuals.length == 0){
        return (
          <div>
              <Helmet>
                <title>Dashboard - Individuals</title>
                {/* <meta name="description" content="" /> */}
              </Helmet>
              <br/>
              <h6 style={{fontWeight: 'bold'}}>Individuals</h6>
              <br/><br/><br/>
              <h5>
                No individuals found.
              </h5>
          </div>
        );
      }

      var individuals_map = individuals.map((item, index) => {
        return<div onClick={() => this.props.ChangeView2('individual', item)} style={{margin: '5px', border: '1px solid silver', borderRadius: '20px'}}>
          <Row style={{margin: '5px',textAlign: 'left'}}>
            <Col sm='4'>
              <img src={Backend_Url + 'media/' + item.image} style={{width: '100%'}}/>
            </Col>
            <Col>
              <Row>
                <Col>
                  <h6 style={{fontWeight: 'bold'}}>
                    Firstname:
                  </h6>
                </Col>
                <Col>
                  {item.firstname}
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
                  {item.lastname}
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
                  {item.individual_type}
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
                  {item.threat_level}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      })

      return (
        <div>
            <Helmet>
              <title>Dashboard - Individuals</title>
              {/* <meta name="description" content="" /> */}
            </Helmet>
            <br/>
            <h6 style={{fontWeight: 'bold'}}>Individuals</h6>
            <br/><br/>
            {individuals_map}
        </div>
      );
    }

  };
  
  export default withCookies(Individuals);