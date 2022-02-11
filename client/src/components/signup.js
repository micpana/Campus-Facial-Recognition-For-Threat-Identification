import React, { Component, useReducer } from 'react';
import {Collapse, SignupToggler,SignupBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
 Button, Input, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, Container, Label, InputGroup} from "reactstrap";
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {Helmet} from 'react-helmet'
import {Backend_Url} from './backend_url'
import Image from '../images/image_2.png'

  class Signup extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) { 
      super(props);
      this.state = {
          firstname: '', 
          lastname: '', 
          email: '', 
          phonenumber: Number, 
          address: '', 
          password: ''
      };
      this.HandleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
      };
      this.Signup = (e) => {
        e.preventDefault()
        const { cookies } = this.props
        var firstname = this.state.firstname
        var lastname = this.state.lastname
        var email = this.state.email
        var phonenumber = this.state.phonenumber
        var address = this.state.address
        var password = this.state.password

        var data = new FormData()
        data.append('firstname', firstname)
        data.append('lastname', lastname)
        data.append('email', email)
        data.append('phonenumber', phonenumber)
        data.append('address', address)
        data.append('password', password)

        axios.post(Backend_Url + 'signup', data)
        .then((res) => {
            let result = res.data
            if(result == 'Email already registered'){
                alert('This email address has already been registered and verified on this platform. Proceed to signin.')
            }else if(result == 'Signup successful'){
                let port = (window.location.port ? ':' + window.location.port : '')
                window.location.href = '//' + window.location.hostname + port + '/'
            }else{
                alert('An network error has occured, please try again.')
            }
        }).catch((error) => {
            alert('An network error has occured, please try again.')
        })
      }
    }

    componentDidMount() {
      const { cookies } = this.props;
      if(cookies.get('token')!=null){
        let port = (window.location.port ? ':' + window.location.port : '');
        window.location.href = '//' + window.location.hostname + port + '/overview';
      }
    }




    render() {
      return (
        <div>
            <Helmet>
              <title>Sign Up</title>
              {/* <meta name="description" content="" /> */}
            </Helmet>
            <Row style={{margin: '0px', minHeight: '630px'}}>
              <Col>
                <img src={Image} style={{width: '100%'}} />
              </Col>
              <Col sm='6'>
                <br/><br/>
                <h4 style={{color: '#3a92cd'}}>
                  Sign Up
                </h4>
                <br/><br/><br/>
                <Form onSubmit={this.Signup}>
                  <Row>
                    <Col style={{paddingLeft: '100px', paddingRight: '100px'}}>
                      <Input style={{border: 'none', borderBottom: '1px solid #3a92cd', color: '#3360A2', backgroundColor: 'inherit'}} placeholder="Firstname" type="text" name="firstname" id="firstname"
                        value={this.state.firstname} onChange={this.HandleChange} />
                    </Col>
                  </Row>
                  <br/><br/>
                  <Row>
                    <Col style={{paddingLeft: '100px', paddingRight: '100px'}}>
                      <Input style={{border: 'none', borderBottom: '1px solid #3a92cd', color: '#3360A2', backgroundColor: 'inherit'}} placeholder="Lastname" type="text" name="lastname" id="lastname"
                        value={this.state.lastname} onChange={this.HandleChange} />
                    </Col>
                  </Row>
                  <br/><br/>
                  <Row>
                    <Col style={{paddingLeft: '100px', paddingRight: '100px'}}>
                      <Input style={{border: 'none', borderBottom: '1px solid #3a92cd', color: '#3360A2', backgroundColor: 'inherit'}} placeholder="Email" type="text" name="email" id="email"
                        value={this.state.email} onChange={this.HandleChange} />
                    </Col>
                  </Row>
                  <br/><br/>
                  <Row>
                    <Col style={{paddingLeft: '100px', paddingRight: '90px'}}>
                      <Input style={{border: 'none', borderBottom: '1px solid #3a92cd', color: '#3360A2', backgroundColor: 'inherit'}} placeholder="Phonenumber" type="number" name="phonenumber" id="phonenumber"
                        value={this.state.phonenumber} onChange={this.HandleChange} />
                    </Col>
                  </Row>
                  <br/><br/>
                  <Row>
                    <Col style={{paddingLeft: '100px', paddingRight: '90px'}}>
                      <Input style={{border: 'none', borderBottom: '1px solid #3a92cd', color: '#3360A2', backgroundColor: 'inherit'}} placeholder="Home address" type="text" name="address" id="address"
                        value={this.state.address} onChange={this.HandleChange} />
                    </Col>
                  </Row>
                  <br/><br/>
                  <Row>
                    <Col style={{paddingLeft: '100px', paddingRight: '100px'}}>
                      <Input style={{border: 'none', borderBottom: '1px solid #3a92cd', color: '#3360A2', backgroundColor: 'inherit'}} placeholder="Password" type="password" name="password" id="password"
                        value={this.state.password} onChange={this.HandleChange} />
                    </Col>
                  </Row>
                  <br/><br/>
                  <Button type='submit' style={{backgroundColor: '#3a92cd', color: '#FFFFFF', border: 'none', borderRadius: '20px', fontWeight: 'bold', width: '120px'}}>
                    Signup
                  </Button>
                </Form>
                <br/><br/><br/>
              </Col>
            </Row>
        </div>
      );
    }

  };
  
  export default withCookies(Signup);