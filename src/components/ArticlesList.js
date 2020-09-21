import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediumCard from './MediumCard';

class ArticlesList extends Component{
  render(){
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
          //console.log(imageFolder[imageFolder.length-1]);
          return (
            <div key={key}>
              <MediumCard
              mcUrl = {value.webUrl}
              mcSource = "guardian"
              mcId = {value.id}
              mcImage = {imageUrl}
              mcTitle = {value.webTitle}
              mcDescription = {value.blocks.body[0].bodyTextSummary}
              mcDate = {value.webPublicationDate.substring(0,10)}
              mcSection = {value.sectionId}
            />
            </div>
          )
        }).slice(0,10)
        // }).slice(Math.min(10,Object.entries(news).length))
      );
    }
    else {
      const news=articles.data.results;
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
          return (
            <div key={key}>
              <MediumCard
              mcUrl = {value.url}
              mcSource = "nytimes"
              mcId = {value.url}
              mcImage = {imageUrl}
              mcTitle = {value.title}
              mcDescription = {value.abstract}
              mcDate = {value.published_date.substring(0,10)}
              mcSection = {value.section}  
            />
            </div>
          )
        }).slice(0,10)
      );
    }
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    current_source: state.displayDetails.source,
    current_data: state.displayDetails.data,
  };
};

export default connect( mapStateToProps )(ArticlesList);