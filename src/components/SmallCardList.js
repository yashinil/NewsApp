import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SmallCard from './SmallCard';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SmallCardList extends Component{
  render(){
    if(this.props.current_query !== ""){
      let articles = JSON.parse(this.props.current_data);
      if ( this.props.current_source === "guardian" ){
        const news=articles.data.response.results;
        //console.log(news);
        return(
          Object.entries(news).map( ([key, value], i) => {
            let imageFolder;
            let imageUrl;
            if(value.blocks !== undefined && value.blocks.main !== undefined && value.blocks.main.elements !== undefined && value.blocks.main.elements[0].assets !== undefined && value.blocks.main.elements[0].assets[0] !== undefined){
              imageFolder=value.blocks.main.elements[0].assets;
              imageUrl=imageFolder[imageFolder.length-1].file;
            }
            else{
              imageUrl="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
            }
            if( imageUrl===undefined || imageUrl==="" || imageUrl===null){
              imageUrl="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
            }
            //console.log("data returned",value);
            return (
              <Col md={6} lg={3} key={key}>
                <SmallCard
                  webUrl={value.webUrl}
                  source={this.props.current_source}
                  bigCardId={value.id}
                  title={value.webTitle}
                  imageUrl= {imageUrl}
                  section={value.sectionId}
                  date={value.webPublicationDate}
                />
              </Col>
            ) 
          })
        );
      }
      else {
        const news=articles.data.response.docs;
        //console.log(news);
        return(
          Object.entries(news).map( ([key, value], i) => {
            let imageFolder;
            let imageUrl;
          if(value !== undefined && value.multimedia !== undefined && value.multimedia !== null){
            imageFolder=value.multimedia;
            for( let i=0; i<imageFolder.length; i++ ){
              if( imageFolder[i].width >= 2000 ){
                imageUrl=imageFolder[i].url;
                break;
              }
            }
          }
          else{
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
          }
          if( imageUrl===undefined || imageUrl==="" || imageUrl===null){
            imageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
          }
          if(imageUrl.substring(0,4) === "imag"){
            imageUrl="https://static01.nyt.com/"+imageUrl;
          }
          return (
            <Col md={6} lg={3} key={key}>
              <SmallCard
                webUrl={value.web_url}
                source={this.props.current_source}
                bigCardId={value.web_url}
                title={value.headline.main}
                imageUrl= {imageUrl}
                section={value.news_desk}
                date={value.pub_date}
              />
            </Col>
          ) 
        })
      );
    }
  }
    else{
      let articlesList = this.props.current_listOfBookmarks;
      //console.log("Article list is:")
      //console.log(articlesList);
      const articles = articlesList.map((article, index) => 
        <Col md={6} lg={3} key={index}>
          <SmallCard
            webUrl={article.url}
            source={article.source}
            bigCardId={article.bigcardUrl}
            title={article.title}
            imageUrl={article.image}
            section={article.section}
            date={article.date}
          />
        </Col>
      );
      return(
        <Container fluid>
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
          <Row>
            {articles}
          </Row>       
        </Container>
      );
    }
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    current_listOfBookmarks: state.displayDetails.listOfBookmarks,
    current_query: state.displayDetails.query,
    current_data: state.displayDetails.data,
    current_source: state.displayDetails.source,
  };
};

export default connect( mapStateToProps )(SmallCardList);