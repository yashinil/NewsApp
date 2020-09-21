import React, { Component } from 'react'
import { Container, Row, Col, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon } from 'react-share'; 
import { connect } from 'react-redux';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentBox from './CommentBox';
import { Link } from 'react-scroll';

class BigCard extends Component{
  constructor(props){
    super(props);
    this.state={
      bookmarkSet:false,
      cardExpanded:false,
      title:'',
      imageUrl:'',
      section:'',
      date:'',
      expanded: false,
      url:'',
      description:'',
      big_date:''
    }
  }
  checkIfInBookmark = () => {
    let existing= this.props.current_listOfBookmarks;
    //console.log(existing);
    for(let i=0;i < existing.length; i++){
      if(existing[i].bigcardUrl === this.props.current_bigCard[1]){
        this.setState({bookmarkSet:true});
      }
    }
  }
  addToBookmark = () => {
    this.props.dispatch({
      type: 'ADD_TO_BOOKMARK',
      payload: {
        url: this.state.url,
        source: this.props.current_bigCard[0],
        bigcardUrl:this.props.current_bigCard[1],
        title:this.state.title,
        image:this.state.imageUrl,
        section:this.state.section,
        date:this.state.date
      }
    });
  }
  removeBookmark = () => {
    this.props.dispatch({
      type: 'REMOVE_FROM_BOOKMARK',
      payload: this.props.current_bigCard[1]
    })
  }
  toggleBookmark = () => {
    if(this.state.bookmarkSet===false){
      this.addNotify.call();
      this.addToBookmark.call();
      this.setState({
        bookmarkSet: true
      });
    }
    else{
      this.removeNotify.call();
      this.removeBookmark.call();
      this.setState({
        bookmarkSet: false
      });
    }
  }
  toggleCard = () => {
    this.setState({
      cardExpanded: !this.state.cardExpanded
    });
  }
  addNotify = () =>toast("Saving - "+this.state.title, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  removeNotify = () =>toast("Removing - "+this.state.title, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  changeExpandedState = () => {
    this.setState({
      expanded: !this.state.expanded,
    })
  }
  componentDidMount(){
    this.checkIfInBookmark.call()

    let article = JSON.parse(this.props.current_data);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let imageFolder;
    let description;
    let websiteUrl;
    let date;
    let imageUrl;
    let title;
    let section;
    let date1;
    if ( this.props.current_bigCard[0] === "guardian" ){
      const news=article.data.response.content;
      //console.log(news);
      
      if(news.blocks !== undefined && news.blocks.main !== undefined && news.blocks.main.elements !== undefined && news.blocks.main.elements[0].assets !== undefined && news.blocks.main.elements[0].assets[0] !== undefined){
        imageFolder=news.blocks.main.elements[0].assets;
        imageUrl=imageFolder[imageFolder.length-1].file;
      }
      else{
        imageUrl="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
      }
      if( imageUrl===undefined || imageUrl==="" || imageUrl===null){
        imageUrl="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
      }
      
      date1= news.webPublicationDate
      date = date1.substring(8,10)+" "+months[parseInt(date1.substring(5,7))-1]+" "+date1.substring(0,4);
      description = news.blocks.body[0].bodyTextSummary;
      websiteUrl = news.webUrl;
      title= news.webTitle;
      section = news.sectionId;
    }
    else {
      const news = article.data.response;
      //console.log(news);
      title = news.docs[0].headline.main;
      if(news.docs !== undefined && news.docs[0].multimedia !== undefined){
        imageFolder = news.docs[0].multimedia;
        for( let i=0; i<imageFolder.length; i++ ){
          if( imageFolder[i].width >= 2000 ){
            imageUrl=imageFolder[i].url;
            break;
          }
        }
      }
      else{
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
      }
      if( imageUrl===undefined || imageUrl==="" || imageUrl===null){
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
      }
      if(imageUrl.substring(0,4) === "imag"){
        imageUrl="https://static01.nyt.com/"+imageUrl;
      }
      date1 = news.docs[0].pub_date;
      date = date1.substring(8,10)+" "+months[parseInt(date1.substring(5,7))-1]+" "+date1.substring(0,4);
      description = news.docs[0].abstract;
      section = news.docs[0].section_name;
      websiteUrl = news.docs[0].web_url;
    }
    this.setState({
      title:title,
      url:websiteUrl,
      imageUrl:imageUrl,
      date:date1,
      section:section,
      description:description,
      big_date:date
    });
  }
  render(){
    let bookmarkIcon;
    if(this.state.bookmarkSet===true){
      bookmarkIcon=<FaBookmark size={25}/>;
    }
    else{
      bookmarkIcon=<FaRegBookmark size={25} />;
    }
    
    let count=0;
    let index=0;
    let description=this.state.description
    //console.log(description.length);
    for(let i=0;i<description.length;i++){
      if(count===4){
        break;
      }
      if(description.charAt(i)==='.' || description.charAt(i)==='!' || description.charAt(i)==='?'){
        if(i<description.length-1){
          if(description.charAt(i+1)===' '){
            count+=1;
          }
        }
        else{
          count+=1;
        }
        index=i;
      }
    }
    
    let showDescription;
    let expandedButton;
    if(index === description.length-1){
       showDescription=description;
       expandedButton='';
    }
    else if(this.state.expanded===false){
      showDescription=<div>
        <p>{description.substring(0,index+1)}</p>
        <p id="secondPara"></p>
      </div>; 
      expandedButton=<Link to="secondPara" smooth={true} onClick={this.changeExpandedState} ><IoIosArrowDown /></Link>
    }
    else{
      showDescription=<div>
        <p>{description.substring(0,index+1)}</p>
        <p id="secondPara">{description.substring(index+1,description.length)}</p>
      </div>; 
      expandedButton=<Link to="startPage" smooth={true} onClick={this.changeExpandedState} ><IoIosArrowUp /></Link>
    }
    //console.log(this.props);
    return(
      <Container fluid>
        <Container fluid className="big-card">
          <h4>{this.state.title}</h4>

          <Row className="big-card-info">
            <Col className='col-5 col-xs-5 col-sm-4 col-md-7 col-lg-8 col-xl-8'>{this.state.big_date}</Col>
            <Col className='col-5 col-xs-5 col-sm-6 col-md-4 col-lg-3 col-xl-3 big-card-info-buttons'>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Facebook</Tooltip>}>
                <span className="d-inline-block">
                  <FacebookShareButton 
                    url={this.state.url}
                    hashtag={"#CSCI_571_NewsApp"}
                  >
                    <FacebookIcon size={30} round={true} />
                  </FacebookShareButton>
                </span>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Twitter</Tooltip>}>
                <span className="d-inline-block">
                  <TwitterShareButton
                    url={this.state.url}
                    hashtags={["CSCI_571_NewsApp"]}
                  >
                    <TwitterIcon size={30} round={true} />
                  </TwitterShareButton>
                </span>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Email</Tooltip>}>
                <span className="d-inline-block">
                  <EmailShareButton
                    url={this.state.url}
                    subject={"#CSCI_571_NewsApp"}
                  >
                    <EmailIcon size={30} round={true} />
                  </EmailShareButton>
                </span>
              </OverlayTrigger>
            </Col>
            <Col className='col-2 col-xs-2 col-sm-2 col-md-1 col-lg-1 col-xl-1 big-card-bookmark'>
              <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Bookmark</Tooltip>}>
                <span className="d-inline-block" onClick={this.toggleBookmark}>
                  {bookmarkIcon}
                </span>
              </OverlayTrigger>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
                transition={Zoom}
                className= "notification"
              />
            </Col>
          </Row>

          <Row className="big-card-image">
            <Col xs={12}>
              <Image 
                src={this.state.imageUrl}
              />
            </Col>
          </Row>
          <Row className="big-card-description">
            <Col xs={12}>
              <div>{showDescription}</div>
            </Col>
          </Row>
          <Row className="big-card-expand">
            <Col xs={1}>
              {expandedButton}
            </Col>
          </Row>
        </Container>
        <Container fluid className="comment-section">
          <CommentBox
          id={this.props.current_bigCard[1]}
          />
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    current_bigCard: state.displayDetails.bigCard,
    current_data: state.displayDetails.data,
    current_listOfBookmarks: state.displayDetails.listOfBookmarks
  };
};

export default connect(mapStateToProps)(BigCard);