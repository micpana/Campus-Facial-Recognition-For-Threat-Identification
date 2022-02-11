import React, { Component, useReducer } from 'react';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
 Button, Input, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Table, Form, FormGroup, Container, Label, InputGroup} from "reactstrap";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import axios from 'axios';
import {Helmet} from 'react-helmet'
import {Backend_Url} from './backend_url'
import Image from '../images/image_1.png'

  class Signin extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) { 
      super(props);
      this.state = {
        email: '',
        password: ''
    };


    this.SignIn = (e) => {
        e.preventDefault()
        const { cookies } = this.props
        var email = this.state.email
        var password = this.state.password

        var data = new FormData() 
        data.append('email', email)
        data.append('password', password)
        
        axios.post(Backend_Url + 'signin', data)
        .then((res) => {
            let result = res.data
            if(result.status == 'failed'){
                alert('Incorrent details entered.')
            }else if(result.status == 'successful'){
                cookies.set('token', result.id, { path: '/' })
                let port = (window.location.port ? ':' + window.location.port : '')
                window.location.href = '//' + window.location.hostname + port + '/dashboard'
            }else{
                alert('An network error has occured, please try again.')
            }
        }).catch((error) => {
            alert('SignIn failed, please check your details and try again.')
        })
      }

    ///////////handle text fields change
    this.HandleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
    };//////handle change ends here
    }

    componentDidMount() {
      const { cookies } = this.props;
      if(cookies.get('token')!=null){
        let port = (window.location.port ? ':' + window.location.port : '');
        window.location.href = '//' + window.location.hostname + port + '/dashboard';
      };
  }

    render() {
      return (
        <div>
          <Helmet>
            <title>Sign In</title>
            {/* <meta name="description" content="" /> */}
          </Helmet>
          <Row style={{margin: '0px'}}>
            <Col sm='5'>
            <Form onSubmit={this.SignIn} >
              <Container style={{paddingRight: '100px', paddingLeft: '100px'}}>
              <br/><br/><br/><br/><br/>
              <Row>
                <Col>
                  <h4 style={{color: '#3a92cd', fontWeight: 'bold'}}>Sign In</h4>
                </Col>
              </Row>
              <br/><br/>
              <Row>
                <Col>
                  <InputGroup>
                    <Input  style={{border: 'none', borderBottom: '1px solid #3a92cd', color: 'inherit', backgroundColor: 'inherit'}} placeholder="Email address" type="text" name="email" id="email" 
                    value={this.state.email} onChange={this.HandleChange} />
                  </InputGroup> 
                </Col>
              </Row>
              <br/><br/>
              <Row>
                <Col>
                  <InputGroup>
                    <Input  style={{border: 'none', borderBottom: '1px solid #3a92cd', color: 'inherit', backgroundColor: 'inherit'}} placeholder="Password" type="password" name="password" id="password" 
                    value={this.state.password} onChange={this.HandleChange} />
                  </InputGroup> 
                </Col>
              </Row>
              <br/><br/><br/>
              <Button type="submit" style={{backgroundColor: '#3a92cd', color: '#FFFFFF', border: 'none', borderRadius: '20px', fontWeight: 'bold', width: '120px'}}>SignIn</Button>{' '}
              <Button color="secondary" href="/" style={{backgroundColor: '#3a92cd', color: '#FFFFFF', border: 'none', borderRadius: '20px', fontWeight: 'bold', width: '120px'}}>Cancel</Button>
              <br/><br/>
              Not yet registered? <a href='/signup'>Click here to signup.</a>
              </Container>
              </Form>
            </Col>
            <Col style={{minHeight: '630px'}}>
              <img src={Image} style={{width: '100%'}} />
            </Col>
            </Row>
        </div>
      );
    }

  };
  
  export default withCookies(Signin);