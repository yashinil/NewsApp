import React, { Component } from 'react'
import { Container, Row, Col, Image, Badge } from 'react-bootstrap'
import { IoMdShare } from 'react-icons/io';
import { connect } from 'react-redux';
import ShareModal from './ShareModal';

class MediumCard extends Component {
  constructor(props){
    super(props);
    this.state={showModal:false}
    //this.toggleModal=this.toggleModal.bind(this);
  }
  // toggleModal(e){
  //   this.setState({
  //     showModal: !this.state.showModal
  //   });
  // }
  callBigCard = () => {
    this.props.dispatch({
      type: 'SET_LOADING_STATE',
      payload: false,
    });
    this.props.dispatch({
      type: 'CALL_DETAIL_CARD',
      payload: [this.props.mcSource, this.props.mcId],
    });
    this.props.dispatch({
      type: 'SET_CATEGORY',
      payload: "nothing",
    });
  }

  openModal = (e) =>{
    e.stopPropagation();
    this.props.dispatch({
      type: 'SET_MODAL_STATE',
      payload: {
        title:this.props.mcTitle,
        url:this.props.mcUrl,
        type:"medium-card"
      },
    });
  }

  // shareClicked(e){
  //   console.log(e);
  //   this.setState({showModal:!this.state.showModal});
  //   e.stopPropagation();
  // }

  render(){
    let sectionBadge;
    var badgeStyle;
    if ( this.props.mcSection.toUpperCase() === 'WORLD' ){
      badgeStyle={
        color: 'white',
        backgroundColor: '#7c4eff',
      };
      sectionBadge=<Badge style={badgeStyle}>WORLD</Badge>;
    }
    else if ( this.props.mcSection.toUpperCase() === 'POLITICS' ){
      badgeStyle={
        color: 'white',
        backgroundColor: '#419488',
      };
      sectionBadge=<Badge style={badgeStyle}>POLITICS</Badge>;
    }
    else if ( this.props.mcSection.toUpperCase() === 'BUSINESS' ){
      badgeStyle={
        color: 'white',
        backgroundColor: '#4696ec',
      };
      sectionBadge=<Badge style={badgeStyle}>BUSINESS</Badge>;
    }
    else if ( this.props.mcSection.toUpperCase() === 'TECHNOLOGY' ){
      badgeStyle={
        color: 'black',
        backgroundColor: '#cedc39',
      };
      sectionBadge=<Badge style={badgeStyle}>TECHNOLOGY</Badge>;
    }
    else if ( this.props.mcSection.toUpperCase() === 'SPORT' || this.props.mcSection.toUpperCase() === 'SPORTS'){
      badgeStyle={
        color: 'black',
        backgroundColor: '#f5c144',
      };
      sectionBadge=<Badge style={badgeStyle}>SPORTS</Badge>;
    }
    else{
      badgeStyle={
        color: 'white',
        backgroundColor: '#6e757c',
      };
      sectionBadge=<Badge style={badgeStyle}>{(this.props.mcSection).toUpperCase()}</Badge>;
    }
    
    return(
      <Container fluid>
        <Row className="medium-card" onClick={this.callBigCard}>
          <Col sm={3}>
            <Image src={this.props.mcImage} thumbnail />
          </Col>
          <Col sm={9}>
            <h4>
              {this.props.mcTitle}
              <IoMdShare 
                className="medium-card-share"
                onClick={this.openModal}
              />
              <ShareModal/>
              </h4>
              <p className="medium-card-text">{this.props.mcDescription}</p>
              <div className="medium-card-info">
                <div className="medium-card-date">{this.props.mcDate}</div>
                <div className="medium-card-badge">{sectionBadge}</div>
              </div>
            </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  //console.log(state);
  return {
    current_modal_state: state.displayDetails.isModalOpen
  };
};

export default connect( mapStateToProps )(MediumCard);