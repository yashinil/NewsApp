import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import Details from './components/Details';
import Data from './components/Data';
import { connect } from 'react-redux';

class App extends React.Component{
  render() {
    let data;
    if (this.props.current_loading_state === false){
      data=<Data />;
    }
    else{
      data=<Details />;
    }
    return (
      <div>
        <NavBar />
        {data}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    current_loading_state: state.displayDetails.isLoaded
  };
};

export default connect( mapStateToProps )(App);