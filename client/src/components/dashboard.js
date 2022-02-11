import React, { Component, useReducer } from 'react';
import {Collapse, DashboardToggler,DashboardBrand,Nav,NavItem,NavLink,UncontrolledDropdown,
 Button, Input, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, Container, Label, InputGroup} from "reactstrap";
import axios from 'axios';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import {Helmet} from 'react-helmet'
import {Backend_Url} from './backend_url'
import Logo from '../images/logos/logo.jpg'
import {CgImport} from 'react-icons/cg'
import {AiFillVideoCamera, AiOutlineLineChart, AiOutlineUserSwitch} from 'react-icons/ai'
import {CgNotes} from 'react-icons/cg'
import {BiUserCircle} from 'react-icons/bi'
import Feed from './feed'
import AddCamera from './add_camera'
import Individuals from './individuals'
import AddIndividuals from './add_individuals'
import Individual from './individual'
import {HiCamera, HiUsers} from 'react-icons/hi'
import {FaUserAlt} from 'react-icons/fa'

  class Dashboard extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) { 
      super(props);
      this.state = {
        user_details: {},
        current_view: 'feed',
        dropdownOpen: false,
        individual: {}
      };

      this.Signout = () =>{
        const { cookies } = this.props;

        axios.get(Backend_Url + 'deactivateAccessToken/' + cookies.get('token'))
        .then(res => {
          cookies.remove('token', { path: '/' });
          let port = (window.location.port ? ':' + window.location.port : '');
          window.location.href = '//' + window.location.hostname + port + '/';
        })
        .catch((error) => {
          alert('A network error occured while trying to sign you out, please try again.')
        });
      };

      this.dtoggle = () => {
        this.setState(prevState => ({
          dropdownOpen2: !prevState.dropdownOpen
        }));
      }

      this.onMouseEnter = () => {
        this.setState({dropdownOpen: true});
      };
    
      this.onMouseLeave = () => {
        this.setState({dropdownOpen: false});
      };

      this.HandleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
      };

      this.ChangeView = (selected_view) => {
        if(this.state.current_view!='individual'){
          document.getElementById(this.state.current_view).style.color = '#ffffff'
          document.getElementById(selected_view).style.color = 'gold'
        }

        this.setState({current_view: selected_view})
      }

      this.ChangeView2 = (selected_view, individual) => {
        this.setState({current_view: selected_view, individual: individual})
      }

      this.CurrentView = () => {
        var current_view = this.state.current_view

        if(current_view == 'feed'){
            return <Feed/>
        }else if(current_view == 'individuals'){
            return <Individuals ChangeView2={this.ChangeView2}/>
        }else if(current_view == 'add_individuals'){
            return <AddIndividuals/>
        }else if(current_view == 'individual'){
          return <Individual ChangeView={this.ChangeView} individual={this.state.individual}/>
        }else if(current_view == 'add_camera'){
          return <AddCamera/>
        }else{
              return<div>
                  <br/><br/>
                  Something went wrong, please try again or reload the web page.
              </div>
          }
      }
    }

    componentDidMount() {
      document.getElementById(this.state.current_view).style.color = 'gold'

      const { cookies } = this.props;
      if(cookies.get('token')==null){
        let port = (window.location.port ? ':' + window.location.port : '');
        window.location.href = '//' + window.location.hostname + port + '/';
      }else{

        axios.get(Backend_Url + 'getUserDetailsByAccessToken/' + cookies.get('token'), { headers: { 'Bypass-Tunnel-Reminder': 'A&E-Client' }  })
        .then(res => {
          this.setState({
            user_details: res.data
          });
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }




    render() {
      return (
        <div>
            <Helmet>
              <title>Dashboard</title>
              {/* <meta name="description" content="" /> */}
            </Helmet>
            <div>
                <Row style={{marginRight: '0px'}}>
                    <Col sm='2' style={{minHeight: '630px', backgroundColor: '#333333', color: '#ffffff', textAlign: 'left'}}>
                        <Container style={{textAlign: 'left'}}>
                            <br/>
                            <Row style={{marginLeft: '1px'}}>
                              {/* <div style={{backgroundColor: 'inherit', borderRadius: '50%', height: '30px', width: '30px'}}> */}
                                <img src={Logo} style={{width: '15%',margin: '0px'}}/>
                              {/* </div>  */}
                              <div style={{marginLeft: '5px'}}>FRHBV</div>
                            </Row>
                            <div style={{border: '1px solid gold', marginTop: '5px'}}></div>
                            <br/>
                        </Container>
                        <Button id='feed' onClick={() => this.ChangeView('feed')} style={{textAlign: 'left', width: '100%', border: 'none', backgroundColor: 'inherit', color: 'inherit', outline: 'none', boxShadow: 'none'}}>
                            <AiFillVideoCamera color='inherit'/> Camera Feed
                        </Button>
                        <br/>
                        <Button id='add_camera' onClick={() => this.ChangeView('add_camera')} style={{textAlign: 'left', width: '100%', border: 'none', backgroundColor: 'inherit', color: 'inherit', outline: 'none', boxShadow: 'none'}}>
                            <HiCamera color='inherit'/> Add Camera
                        </Button>
                        <br/>
                        <Button id='individuals' onClick={() => this.ChangeView('individuals')} style={{textAlign: 'left', width: '100%', border: 'none', backgroundColor: 'inherit', color: 'inherit', outline: 'none', boxShadow: 'none'}}>
                            <HiUsers color='inherit'/> Individuals
                        </Button>
                        <br/>
                        <Button id='add_individuals' onClick={() => this.ChangeView('add_individuals')} style={{textAlign: 'left', width: '100%', border: 'none', backgroundColor: 'inherit', color: 'inherit', outline: 'none', boxShadow: 'none'}}>
                            <FaUserAlt color='inherit'/> Add Individual
                        </Button>
                        <br/>
                    </Col>
                    <Col>
                        <Row style={{textAlign: 'right', marginRight: '0px', backgroundColor: '#453F3D', height: '60px'}}>
                            <Container style={{textAlign: 'right'}}>
                                <Dropdown className="d-inline-block" onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.dtoggle}>
                                    <DropdownToggle  style={{marginTop: '', backgroundColor:  'inherit', border: 'none', fontSize: '10px', color: '#ffffff'}}>
                                        <BiUserCircle size='25px'/>
                                        <br/>
                                        <span style={{fontWeight: 'bold'}}>
                                          {this.state.user_details.firstname} {this.state.user_details.lastname}
                                        </span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem  onClick={this.Signout}>
                                            <NavLink style={{color: '#333333', backgoundColor: 'inherit'}} >
                                                Signout
                                            </NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Container>
                        </Row>
                        <Row style={{marginRight: '0px'}}>
                            <Container>
                                <this.CurrentView/>
                            </Container>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
      );
    }

  };
  
  export default withCookies(Dashboard);