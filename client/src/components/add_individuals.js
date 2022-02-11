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

  class AddIndividuals extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) { 
      super(props);
      this.state = {
        firstname: '',
        lastname: '',
        individual_type: '',
        national_id_number: '',
        registration_number: '',
        degree: '',
        designation: '',
        department: '',
        image: null,
        threat_level: ''
      };

      this.HandleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
      };

      this.UploadFile = (e) => {
        this.setState({image: e.target.files[0]})
      }

      this.RenderByIndividualType = () => {
        var individual_type = this.state.individual_type
        if((individual_type == 'Student') || (individual_type == '')){
          return<div>
            <Row>
              <Col>
                <Input name='registration_number' value={this.state.registration_number} type='text' onChange={this.HandleChange} placeholder='Registration Number'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
              <Col>
              
              </Col>
            </Row>
            <br/><br/>
            <Row>
              <Col>
                <Input name='degree' value={this.state.degree} type='text' onChange={this.HandleChange} placeholder='Degree'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
              <Col>
                <Input name='department' value={this.state.department} type='text' onChange={this.HandleChange} placeholder='School'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
            </Row>
            <br/><br/>
            <Row>
              <Col style={{textAlign: 'left', color: 'grey'}}>
                Image <br/><br/>
                <Input type='file' onChange={this.UploadFile}
                style={{border: 'none'}}/>
              </Col>
              <Col>
              
              </Col>
            </Row>
            <br/><br/>
          </div>
        }else if(individual_type == 'Staff'){
          return<div>
            <Row>
              <Col>
                <Input name='designation' value={this.state.designation} type='text' onChange={this.HandleChange} placeholder='Designation'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
              <Col>
                <Input name='department' value={this.state.department} type='text' onChange={this.HandleChange} placeholder='Department'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
            </Row>
            <br/><br/>
            <Row>
              <Col style={{textAlign: 'left', color: 'grey'}}>
                Image <br/><br/>
                <Input type='file' onChange={this.UploadFile}
                style={{border: 'none'}}/>
              </Col>
              <Col>
                <Input name='registration_number' value={this.state.registration_number} type='text' onChange={this.HandleChange} placeholder='Work Number'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
            </Row>
            <br/><br/>
          </div>
        }else if(individual_type == 'Outsider'){
          return<div>
          <Row>
            <Col style={{textAlign: 'left', color: 'grey'}}>
              Image <br/><br/>
              <Input type='file' onChange={this.UploadFile}
              style={{border: 'none'}}/>
            </Col>
            <Col>

            </Col>
          </Row>
          <br/><br/>
          </div>
        }
      }

      this.AddIndividual = () => {
      const { cookies } = this.props

      var data = new FormData() 
      data.append('user_access_token', cookies.get('token'))
      data.append('firstname', this.state.firstname)
      data.append('lastname', this.state.lastname)
      data.append('individual_type', this.state.individual_type)
      data.append('national_id_number', this.state.national_id_number)
      data.append('degree', this.state.degree)
      data.append('designation', this.state.designation)
      data.append('department', this.state.department)
      data.append('image', this.state.image)
      data.append('threat_level', this.state.threat_level)
      
      axios.post(Backend_Url + 'addIndividual', data)
      .then((res) => {
          let result = res.data
          if(result == 'Successful'){
            alert(this.state.firstname + ' added successfully.')
            window.location.reload()
          }else if(result == 'Exists'){
            alert('An individual with this identity has already been registered.')
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
              <title>Dashboard - Add Individual</title>
              {/* <meta name="description" content="" /> */}
            </Helmet>
            <br/>
            <h6 style={{fontWeight: 'bold'}}>Add Individual</h6>
            <br/><br/>
            <Row>
              <Col>
                <Input name='firstname' value={this.state.firstname} type='text' onChange={this.HandleChange} placeholder='Firstname'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
              <Col>
                <Input name='lastname' value={this.state.lastname} type='text' onChange={this.HandleChange} placeholder='Product price'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
            </Row>
            <br/><br/>
            <Row>
              <Col>
                <select name='individual_type' value={this.state.individual_type} onChange={this.HandleChange}
                style={{border: 'none', borderBottom: '1px solid silver', width: '100%', backgroundColor: 'inherit', color: 'grey'}}>
                  <option value=''>Select Individual Type</option>
                  <option value='Student'>Student</option>
                  <option value='Staff'>Staff</option>
                  <option value='Outsider'>Outsider</option>
                </select>
              </Col>
              <Col>
                <Input name='national_id_number' value={this.state.national_id_number} type='text' onChange={this.HandleChange} placeholder='National ID Number'
                style={{border: 'none', borderBottom: '1px solid silver'}}/>
              </Col>
            </Row>
            <br/><br/>
            <this.RenderByIndividualType/>
            <Row>
              <Col>
                <select name='threat_level' value={this.state.threat_level} onChange={this.HandleChange}
                style={{border: 'none', borderBottom: '1px solid silver', width: '100%', backgroundColor: 'inherit', color: 'grey'}}>
                  <option value=''>Select Threat Level</option>
                  <option value='None'>None</option>
                  <option value='Low'>Low</option>
                  <option value='Medium'>Medium</option>
                  <option value='High'>High</option>
                </select>
              </Col>
              <Col>
              
              </Col>
            </Row>
            <br/><br/>
            <Button onClick={this.AddIndividual} style={{backgroundColor: '#3a92cd', color: '#FFFFFF', border: 'none', borderRadius: '20px', fontWeight: 'bold', width: '240px'}}>
              Add Individual
            </Button>
            <br/><br/><br/>
  </div>
      );
    }

  };
  
  export default withCookies(AddIndividuals);