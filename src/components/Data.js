import React from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';

class Data extends React.Component{
  constructor(props){
    super(props);
    this.state={
      error: null, 
      isLoaded: false,
      apiResponse: ''
    };
  }

  // updateData = () => {
  //   this.props.dispatch({
  //     type: 'DISPLAY_DATA',
  //     payload: this.state.apiResponse,
  //   });
  // }

  // updateError = () => {
  //   this.props.dispatch({
  //     type: 'DISPLAY_ERROR',
  //     payload: this.state.error,
  //   });
  // }

  // updateLoadingState = () => {
  //   this.props.dispatch({
  //     type: 'SET_LOADING_STATE',
  //     payload: this.state.isLoaded
  //   });
  // }

  // getTenValues = () =>{
  //   let data=this.state.apiResponse;
  //   let articles = JSON.parse(data);
  //   count=0
  //   for(let i=0;i<articles.length; i++){
  //     if()
  //   } 
  // }

  //url:-https://webtechassignment-273804.wl.r.appspot.com
  //http://localhost:9000/
 

  componentDidMount(){
    let url;
    if (this.props.current_query !== ""){
      //console.log(this.props.current_query)
      if(this.props.current_source === "guardian"){
        url="https://webtechassignment-273804.wl.r.appspot.com/searchQuery?api=true&query="+this.props.current_query;
      }
      else{
        url="https://webtechassignment-273804.wl.r.appspot.com/searchQuery?api=false&query="+this.props.current_query;
      }
      fetch(url)
      .then(res => res.text())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            apiResponse: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
      this.props.dispatch({
        type: 'SET_LOADING_STATE',
        payload: this.state.isLoaded
      });
    }
    else if (this.props.current_bigCard.length>0) {
      if (this.props.current_bigCard[0] === "guardian"){
        url="https://webtechassignment-273804.wl.r.appspot.com/bigCard?identification="+this.props.current_bigCard[1]+"&api=true";
      }
      else{
        //console.log("NYTimes bigcard called");
        url="https://webtechassignment-273804.wl.r.appspot.com/bigCard?identification="+this.props.current_bigCard[1]+"&api=false";
      }
      fetch(url)
      .then(res => res.text())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            apiResponse: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
      this.props.dispatch({
        type: 'SET_LOADING_STATE',
        payload: this.state.isLoaded
      });
      //console.log("NEW");
      //console.log(this.props)
    }
    else {
      if (this.props.current_source === "guardian"){
        url="https://webtechassignment-273804.wl.r.appspot.com/"+this.props.current_category+"?api=true";
      }
      else{
        //console.log("NYTimes called")
        url="https://webtechassignment-273804.wl.r.appspot.com/"+this.props.current_category+"?api=false";
      }
      fetch(url)
      .then(res => res.text())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            apiResponse: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
      this.props.dispatch({
        type: 'SET_LOADING_STATE',
        payload: this.state.isLoaded
      });
      //console.log("NEW");
      //console.log(this.props)
    } 
  }
  componentDidUpdate(prevprops){
    if(prevprops !== this.props){
      let url;
      if (this.props.current_query !== ""){
        //console.log(this.props.current_query)
        if(this.props.current_source === "guardian"){
          url="https://webtechassignment-273804.wl.r.appspot.com/searchQuery?api=true&query="+this.props.current_query;
        }
        else{
          url="https://webtechassignment-273804.wl.r.appspot.com/searchQuery?api=false&query="+this.props.current_query;
        }
        fetch(url)
        .then(res => res.text())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              apiResponse: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
        this.props.dispatch({
          type: 'SET_LOADING_STATE',
          payload: this.state.isLoaded
        });
      }
    }
  }
  render(){
    //console.log(this.props);
    const { error, isLoaded, apiResponse } = this.state;
    if ( error ){
      this.props.dispatch({
        type: 'DISPLAY_ERROR',
        payload: this.state.error,
      });
      this.props.dispatch({
        type: 'SET_LOADING_STATE',
        payload: true,
      });
    }
    else if (!isLoaded){
      return(
        <div>
          <Spinner />
        </div>
      );
    }
    else{
      this.props.dispatch({
        type: 'DISPLAY_DATA',
        payload: apiResponse,
      });
      this.props.dispatch({
        type: 'SET_LOADING_STATE',
        payload: true,
      });
      //console.log(apiResponse);
    }
    return null;
  }
}

//enter the props that are required to be accessed in our component
//then the values can be used as props in the component
const mapStateToProps = (state) => {
  //console.log(state);
  return {
    current_category: state.displayDetails.category,
    current_query: state.displayDetails.query,
    current_source: state.displayDetails.source,
    current_bookmark: state.displayDetails.bookmark,
    current_bigCard: state.displayDetails.bigCard,
    current_data: state.displayDetails.data
  };
};

// const mapDispatchToProps = dispatch =>({
//   onCategoryChange: category => dispatch(setCategory(category)),
//   onQueryChange: query => dispatch(setQuery(query)),
//   onNewsSourceChange: source => dispatch(setNewsSource(source)),
//   onBookmarkChange: bookmark => dispatch(displayBookmark(bookmark)),
// });

export default connect( mapStateToProps )(Data);


// // Every time the state changes, log it
// // Note that subscribe() returns a function for unregistering the listener
// const unsubscribe = store.subscribe(() => console.log(store.getState()))