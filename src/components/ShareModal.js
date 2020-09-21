import React, { Component } from 'react'
import { Modal, Row, Col } from 'react-bootstrap'
import { FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon } from 'react-share'; 
import { connect } from 'react-redux';

class ShareModal extends Component{
  closeModal = (e) =>{
    e.stopPropagation();
    this.props.dispatch({
      type: 'SET_MODAL_STATE',
      payload: "",
    });
  }
  render(){
    let title;
    if(this.props.current_modal_state.type==="medium-card" || this.props.current_modal_state.type==="results"){
      title=this.props.current_modal_state.title;
    }
    else{
      title=<div><p className="modal-bookmark-title">{(this.props.current_modal_state.source === "guardian")?"GUARDIAN":"NYTimes"}</p><p>{this.props.current_modal_state.title}</p></div>;
    }
    if(this.props.current_modal_state !== ""){
      return(
      <Modal show={true} onClick={e=>{ e.stopPropagation(); }}>
        <Modal.Header>
          {/* 
          onClick={this.props.onHide} */}
          <Modal.Title>{title}</Modal.Title>
        <div className="modal-button" onClick={this.closeModal}>&times;</div>
        </Modal.Header>
        <Modal.Body>
          <div className="share-modal-sharevia">Share via</div>
          <Row>
            <Col xs={4} className="share-modal-icons">
              <FacebookShareButton 
                url={this.props.current_modal_state.url}
                hashtag={"#CSCI_571_NewsApp"}
              >
                <FacebookIcon size={64} round={true} />
              </FacebookShareButton>
            </Col>
            <Col xs={4} className="share-modal-icons">
              <TwitterShareButton
                url={this.props.current_modal_state.url}
                hashtags={["CSCI_571_NewsApp"]}
              >
                <TwitterIcon size={64} round={true} />
              </TwitterShareButton>
            </Col>
            <Col xs={4} className="share-modal-icons">
              <EmailShareButton
                url={this.props.current_modal_state.url}
                subject={"#CSCI_571_NewsApp"}
              >
                <EmailIcon size={64} round={true} />
              </EmailShareButton>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
    }
    else{
      return null
    }
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    current_modal_state: state.displayDetails.isModalOpen,
  };
};

export default connect( mapStateToProps )(ShareModal);