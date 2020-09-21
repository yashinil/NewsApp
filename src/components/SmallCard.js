import React, { Component } from 'react'
import { Container, Image, Badge } from 'react-bootstrap'
import { IoMdShare } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import ShareModal from './ShareModal';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SmallCard extends Component{
  constructor(props){
    super(props);
    this.state={isOpen:false}
  }
  // toggleModal = (e) => {
  //   e.stopPropagation();
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // }
  removeNotify = () =>toast("Removing - "+this.props.title, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  deleteBookmark = (e) => {
    e.stopPropagation();
    this.removeNotify.call();
    this.props.dispatch({
      type: 'REMOVE_FROM_BOOKMARK',
      payload: this.props.bigCardId
    });
  }
  callBigCard = () => {
    this.props.dispatch({
      type: 'SET_LOADING_STATE',
      payload: false,
    });
    this.props.dispatch({
      type: 'CALL_DETAIL_CARD',
      payload: [this.props.source, this.props.bigCardId],
    });
    this.props.dispatch({
      type: 'DISPLAY_BOOKMARK',
      payload: false,
    });
    this.props.dispatch({
      type: 'SET_QUERY',
      payload: "",
    });
    this.props.dispatch({
      type: 'SET_CATEGORY',
      payload: "nothing",
    });
  }
  openModal = (e) =>{
    e.stopPropagation();
    let type;
    if(this.props.current_query !== ""){
      type="results";
    }
    else{
      type="bookmark"
    }
    this.props.dispatch({
      type: 'SET_MODAL_STATE',
      payload: {
        title:this.props.title,
        url:this.props.webUrl,
        type:type,
        source:this.props.source
      },
    });
  }
  render(){
    //console.log(this.props);
    let sectionBadge;
    let sourceBadge;
    var badgeStyle;
    if ( this.props.section.toUpperCase() === 'WORLD' ){
      badgeStyle={
        color: 'white',
        backgroundColor: '#7c4eff',
      };
      sectionBadge=<Badge style={badgeStyle}>WORLD</Badge>;
    }
    else if ( this.props.section.toUpperCase() === 'POLITICS' ){
      badgeStyle={
        color: 'white',
        backgroundColor: '#419488',
      };
      sectionBadge=<Badge style={badgeStyle}>POLITICS</Badge>;
    }
    else if ( this.props.section.toUpperCase() === 'BUSINESS' ){
      badgeStyle={
        color: 'white',
        backgroundColor: '#4696ec',
      };
      sectionBadge=<Badge style={badgeStyle}>BUSINESS</Badge>;
    }
    else if ( this.props.section.toUpperCase() === 'TECHNOLOGY' ){
      badgeStyle={
        color: 'black',
        backgroundColor: '#cedc39',
      };
      sectionBadge=<Badge style={badgeStyle}>TECHNOLOGY</Badge>;
    }
    else if ( this.props.section.toUpperCase() === 'SPORT' || this.props.section.toUpperCase() === 'SPORTS'){
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
      sectionBadge=<Badge style={badgeStyle}>{(this.props.section).toUpperCase()}</Badge>;
    }

    if ( this.props.source.toUpperCase() === 'GUARDIAN' ){
      badgeStyle={
        color: 'white',
        backgroundColor: '#14284a',
      };
      sourceBadge=<Badge style={badgeStyle}>GUARDIAN</Badge>;
    }
    else if ( this.props.source.toUpperCase() === 'NYTIMES' ){
      badgeStyle={
        color: 'black',
        backgroundColor: '#dddddd',
      };
      sourceBadge=<Badge style={badgeStyle}>NYTIMES</Badge>;
    }

    let deleteButton;
    let sourceButton;
    if(this.props.current_query !== ""){
      deleteButton='';
      sourceButton='';
    }
    else{
      deleteButton=<MdDelete
        className="small-card-delete"
        onClick={this.deleteBookmark}
      />;
      sourceButton=<div className="small-card-badge">{sourceBadge}</div>;
    }

    return(
      <Container fluid className="small-card" onClick={this.callBigCard}>
        <h5>
          {this.props.title}
          <IoMdShare 
            className="small-card-share"
            onClick={this.openModal}
          />
          <ShareModal/>
          {deleteButton}
          </h5>
        <Image src={this.props.imageUrl} thumbnail />
        <div className="small-card-info">
          <div className="small-card-date">{this.props.date.substring(0,10)}</div>
          {sourceButton}
          <div className="small-card-badge">{sectionBadge}</div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    current_query: state.displayDetails.query,
    current_modal_state: state.displayDetails.isModalOpen
  };
};

export default connect( mapStateToProps )(SmallCard);