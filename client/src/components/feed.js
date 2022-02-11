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

  class Feed extends Component{
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    constructor(props) { 
      super(props);
      this.state = {
        cameras: [],
        main_link: '',
        main_name: '',
        loading: true
      };

      this.HandleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value});
      };
    }

    componentDidMount() {
      const { cookies } = this.props

      var data = new FormData() 
      data.append('user_access_token', cookies.get('token'))
      
      axios.post(Backend_Url + 'cameras', data)
      .then((res) => {
          let result = res.data
          var item = result[0]
          console.log(item.ip_address + '/videofeed?username='+item.username+'&password='+item.password)
          this.setState({
            cameras: result,
            main_link: item.ip_address + '/videofeed?username='+item.username+'&password='+item.password,
            main_name: item.name
          })
          this.setState({loading: false})
      }).catch((error) => {
          console.log(error)
          this.setState({loading: false})
      })

      this.SwitchCam = (item) => {
        var link = item.ip_address + '/videofeed?username='+item.username+'&password='+item.password
        this.setState({main_link: link, main_name: item.name})
      }
    }




    render() {
      var cameras = this.state.cameras
      var cameras_map = cameras.map((item, index) => {
        var link = item.ip_address + '/videofeed?username='+item.username+'&password='+item.password
        return<Row onClick={() => this.SwitchCam(item)} style={{height: '130px', overflow: 'hidden', margin: '2px'}}>
          <Col>
          <img src={link} style={{width: '100%'}}/>
          <h5 style={{fontWeight: 'bold', top: '30px', position: 'absolute'}}>
            {item.name}
          </h5>
          </Col>
        </Row>
      })

      if(this.state.loading==true){
        return(
          <div>
            <br/><br/><br/><br/>
            <h5>Loading...</h5>
          </div>
        )
      }
      return (
        <div>
            <Helmet>
              <title>Dashboard - Feed</title>
              {/* <meta name="description" content="" /> */}
            </Helmet>
            <br/>
            <h6 style={{fontWeight: 'bold'}}>Feed</h6>
            <br/>
            <Row>
              <Col sm='9'>
                <img src={this.state.main_link} style={{width: '100%', height: '500px'}}/>
                <h5 style={{fontWeight: 'bold', top: '30px', position: 'absolute'}}>
                  {this.state.main_name}
                </h5>
              </Col>
              <Col>
                <h6 style={{fontWeight: 'bold'}}>Cameras</h6>
                <br/>
                <div style={{height: '500px', overflow: 'scroll'}}>
                  {cameras_map}
                </div>
              </Col>
            </Row>
        </div>
      );
    }

  };
  
  export default withCookies(Feed);