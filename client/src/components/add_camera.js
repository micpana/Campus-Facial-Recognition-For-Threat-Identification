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

  class AddCamera extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) { 
      super(props);
      this.state = {
          name: '',
          ip_address: '',
          username: '',
          password: ''
      };

      this.HandleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
      };

    this.AddCamera = () => {
      const { cookies } = this.props

      var data = new FormData() 
      data.append('user_access_token', cookies.get('token'))
      data.append('name', this.state.name)
      data.append('ip_address', 'http://'+this.state.ip_address)
      data.append('username', this.state.username)
      data.append('password', this.state.password)
      
      axios.post(Backend_Url + 'addCamera', data)
      .then((res) => {
          let result = res.data
          if(result == 'Successful'){
            alert(this.state.name + ' added successfully.')
            window.location.reload()
          }else if(result == 'Exists'){
            alert('Camera already registered.')
          }else(
            alert('Something went wrong, please try again.')
          )
      }).catch((error) => {
          console.log(error)
      })
      }
    }

    componentDidMount() {

    }




    render() {

      return (
        <div>
            <Helmet>
              <title>Dashboard - Add IP Camera</title>
              {/* <meta name="description" content="" /> */}
            </Helmet>
            <br/>
            <h6 style={{fontWeight: 'bold'}}>Add IP Camera</h6>
            <br/><br/>
            <Row>
              <Col>
                <Input name='name' value={this.state.name} type='text' onChange={this.HandleChange} placeholder='Name'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
              <Col>
                <Input name='ip_address' value={this.state.ip_address} type='text' onChange={this.HandleChange} placeholder='IP Address & Port'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
            </Row>
            <br/><br/>
            <Row>
              <Col>
                <Input name='username' value={this.state.username} type='text' onChange={this.HandleChange} placeholder='Username'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
              <Col>
                <Input name='password' value={this.state.password} type='password' onChange={this.HandleChange} placeholder='Password'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
            </Row>
            <br/><br/>
            <Button onClick={this.AddCamera} style={{backgroundColor: '#3a92cd', color: '#FFFFFF', border: 'none', borderRadius: '20px', fontWeight: 'bold', width: '240px'}}>
              Add Camera
            </Button>
            <br/><br/><br/>
        </div>
      );
    }

  };
  
  export default withCookies(AddCamera);