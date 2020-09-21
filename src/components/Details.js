import React, { Component } from 'react'
// import { createStore } from 'redux';
// import { displayDetails } from '../reducers'
import { Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import ArticlesList from './ArticlesList';
import BigCard from './BigCard';
import SmallCardList from './SmallCardList';

//const store = createStore(displayDetails, window.STATE_FROM_SERVER)

let data;
class Details extends Component{
  // componentDidMount(){
  //   // console.log("FIRST");
  //   // console.log(this.props)
  // }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.current_loading_state !== this.props.current_loading_state) {
  //     //alert("loading");
  //     // console.log("NEW");
  //     // console.log(this.props)
  //   }
  // }

  render(){
    if(this.props.current_bookmark === true){
      let heading;
      if(this.props.current_listOfBookmarks.length === 0){
        heading=<p className="page-title-nothing">You have no saved Articles</p>
      }
      else{
        heading=<h4 className="page-title">Favorites</h4>
      }
      data=<Container fluid>
          {heading}
          <SmallCardList />
      </Container>;
    }
    else if(this.props.current_bigCard.length > 0){
      data=<BigCard />;
    }
    else if(this.props.current_query !== ""){
      let heading;
      let articles = JSON.parse(this.props.current_data);
      if(articles.data.response.results.length === 0){
        heading=<p className="page-title-nothing">No Results Found</p>
      }
      else{
        heading=<h4 className="page-title">Results</h4>
      }
      data=<Container fluid>
        {heading}
        <Row>
          <SmallCardList />
        </Row>
      </Container>;
    }
    //else if(query is not null then show query page)
    else {
      data=<ArticlesList />;
    }
    //console.log("data in render in details");
    //console.log(this.props);
    return(
      <div>
      {data}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    current_loading_state: state.displayDetails.isLoaded,
    current_bookmark: state.displayDetails.bookmark,
    current_listOfBookmarks: state.displayDetails.listOfBookmarks,
    current_bigCard: state.displayDetails.bigCard,
    current_data: state.displayDetails.data,
    current_query: state.displayDetails.query,
  };
};

export default connect( mapStateToProps )(Details);