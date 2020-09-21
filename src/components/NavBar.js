import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';
import Switch from 'react-switch';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import _ from "lodash";
import ReactTooltip from 'react-tooltip'

class NavBar extends Component {
  constructor(props){
    super(props);
    this.state={
      checked: true,
      bookmark: false,
      results:[],
      //selectedResult: null,
      temp: '',
      navExpanded: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange=_.debounce(this.handleSearchChange.bind(this), 1050, {
      leading: true
    })
  }
  handleSearchChange = async ( value ) => {
    try {
      const response = await fetch("https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-Fr&q="+value,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "5cc5233f7dfc4cd583963190c9fea5e6"
          }
        }
      );
      const data = await response.json();
      const resultsRaw = data.suggestionGroups[0].searchSuggestions;
      const results = resultsRaw.map(result => ({ label: result.displayText, value: result.displayText }));
      this.setState({ results });
      return results;
      //console.log(results);
    } catch (error) {
      console.error("Error fetching search "+value);
    }
  };

  handleResultSelect = (result) => {
    //console.log(result.label);
    // this.setState({ selectedResult: result });
    this.props.dispatch({
      type: 'SET_QUERY',
      payload: result.label,
    });
    this.props.dispatch({
      type: 'SET_LOADING_STATE',
      payload: false,
    });
    this.props.dispatch({
      type: 'CALL_DETAIL_CARD',
      payload: [],
    });
    this.props.dispatch({
      type: 'DISPLAY_BOOKMARK',
      payload: false,
    });
    this.props.dispatch({
      type: 'SET_CATEGORY',
      payload: "nothing",
    });
  }
  handleInputChange = ( value ) => {
    this.setState({
      temp: value,
    })
    return value;
  }
  // changeQuery = () =>{
  //   this.props.dispatch({
  //     type: 'SET_QUERY',
  //     payload: this.state.selectedResult.label,
  //   });
  //   this.props.dispatch({
  //     type: 'SET_LOADING_STATE',
  //     payload: false,
  //   });
  //   this.props.dispatch({
  //     type: 'CALL_DETAIL_CARD',
  //     payload: [],
  //   });
  //   this.props.dispatch({
  //     type: 'DISPLAY_BOOKMARK',
  //     payload: false,
  //   });
  // }
  
  // getResult(opt){
  //   console.log("hiiiiiiiiiii");
  //   console.log(opt.label);
  // }
  resetState = () =>{
    this.setState({ bookmark: false});
    this.props.dispatch({
      type: 'SET_LOADING_STATE',
      payload: false,
    });
    this.props.dispatch({
      type: 'CALL_DETAIL_CARD',
      payload: [],
    });
    this.props.dispatch({
      type: 'DISPLAY_BOOKMARK',
      payload: false,
    });
    this.props.dispatch({
      type: 'SET_QUERY',
      payload: "",
    });
  }
  handleChange(checked) {
    this.closeNav.call();
    this.setState({ checked });
    //alert(checked);
    if (checked){
      this.resetState.call();
      this.props.dispatch({
        type: 'SET_NEWS_SOURCE',
        payload: "guardian",
      });
    }
    else{
      this.resetState.call();
      this.props.dispatch({
        type: 'SET_NEWS_SOURCE',
        payload: "nytimes",
      });
    }
  }
  callBookmark = () => {
    this.closeNav.call();
    this.props.dispatch({
      type: 'DISPLAY_BOOKMARK',
      payload: true,
    });
    this.props.dispatch({
      type: 'CALL_DETAIL_CARD',
      payload: [],
    });
    this.props.dispatch({
      type: 'SET_QUERY',
      payload: ""
    });
    this.props.dispatch({
      type: 'SET_CATEGORY',
      payload: "nothing",
    });

    this.setBookmarkColor.call();
    ReactTooltip.hide() 
  }
  setBookmarkColor = () =>{
    if(this.state.bookmark === false){
      this.setState({ bookmark: !this.state.bookmark});
    }
  }
  callHome = () => {
    this.resetState.call();
    this.closeNav.call();
    // onCategoryChange("home"); 
    this.props.dispatch({
      type: 'SET_CATEGORY',
      payload: "home",
    });
  }
  callWorld = () => {
    this.resetState.call();
    this.closeNav.call();
    // onCategoryChange("world");
    this.props.dispatch({
      type: 'SET_CATEGORY',
      payload: "world",
    });
  }
  callPolitics = () => {
    this.closeNav.call();
    // onCategoryChange("politics");
    this.resetState.call();
    this.props.dispatch({
      type: 'SET_CATEGORY',
      payload: "politics",
    });
  }
  callBusiness = () => {
    this.closeNav.call();
    // onCategoryChange("business");
    this.resetState.call();
    this.props.dispatch({
      type: 'SET_CATEGORY',
      payload: "business",
    });
  }
  callTechnology = () => {
    this.closeNav.call();
    // onCategoryChange("technology");
    this.resetState.call();
    this.props.dispatch({
      type: 'SET_CATEGORY',
      payload: "technology",
    });
  }
  callSports = () => {
    this.closeNav.call();
    // onCategoryChange("sports");
    this.resetState.call();
    this.props.dispatch({
      type: 'SET_CATEGORY',
      payload: "sports",
    });
  }
  setNavExpanded = (expanded) => {
    this.setState({ navExpanded: expanded });
  }

  closeNav = () => {
    this.setState({ navExpanded: false });
  }

  
  render(){
    // if(this.state.selectedResult !== null){
    //   this.changeQuery.call();
    // }
    //console.log(this.props);
    //console.log(this.state.selectedResult);
    let navitems;
    let toggleSwitch;
    let bookmarkIcon;
    if(this.state.bookmark === true && this.props.current_bigCard.length === 0){
      bookmarkIcon=<FaBookmark />
    }
    else{
      bookmarkIcon=< FaRegBookmark />
    }
    //console.log(this.props.current_bigCard);
    if(this.props.current_bookmark === false && this.props.current_query === "" && this.props.current_bigCard.length === 0){
      toggleSwitch=<Nav>
      <Nav.Item className="justify-content-end">NYTimes</Nav.Item>
      <Nav.Item className="justify-content-end">
        <Switch
          onChange={this.handleChange} 
          checked={this.state.checked}
          className="toggle-switch"
          height={20}
          width={40}
          uncheckedIcon={false}
          checkedIcon={false}
          offColor='#DCDCDC'
          onColor='#0b8af3'
        />
      </Nav.Item>
      <Nav.Item className="justify-content-end">Guardian</Nav.Item>
      </Nav>;
    }
    else{
      toggleSwitch='';
    }

    if( this.props.current_category === 'home' ){
      navitems=<Nav className="mr-auto"> 
        <Nav.Item><Nav.Link active onClick={this.callHome}>Home</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callWorld}>World</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callPolitics}>Politics</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callBusiness}>Business</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callTechnology}>Technology</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callSports}>Sports</Nav.Link></Nav.Item>
      </Nav>;
    }
    else if( this.props.current_category === 'world' ){
      navitems=<Nav className="mr-auto">
        <Nav.Item><Nav.Link onClick={this.callHome}>Home</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link active onClick={this.callWorld}>World</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callPolitics}>Politics</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callBusiness}>Business</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callTechnology}>Technology</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callSports}>Sports</Nav.Link></Nav.Item>
      </Nav>;
    }
    else if( this.props.current_category === 'politics' ){
      navitems=<Nav className="mr-auto">
        <Nav.Item><Nav.Link onClick={this.callHome}>Home</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callWorld}>World</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link active onClick={this.callPolitics}>Politics</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callBusiness}>Business</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callTechnology}>Technology</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callSports}>Sports</Nav.Link></Nav.Item>
      </Nav>;
    }
    else if( this.props.current_category === 'business' ){
      navitems=<Nav className="mr-auto">
        <Nav.Item><Nav.Link onClick={this.callHome}>Home</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callWorld}>World</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callPolitics}>Politics</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link active onClick={this.callBusiness}>Business</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callTechnology}>Technology</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callSports}>Sports</Nav.Link></Nav.Item>
      </Nav>;
    }
    else if( this.props.current_category === 'technology' ){
      navitems=<Nav className="mr-auto">
        <Nav.Item><Nav.Link onClick={this.callHome}>Home</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callWorld}>World</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callPolitics}>Politics</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callBusiness}>Business</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link active onClick={this.callTechnology}>Technology</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callSports}>Sports</Nav.Link></Nav.Item>
      </Nav>;
    }
    else if( this.props.current_category === 'sports' ){
      navitems=<Nav className="mr-auto">
        <Nav.Item><Nav.Link onClick={this.callHome}>Home</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callWorld}>World</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callPolitics}>Politics</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callBusiness}>Business</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callTechnology}>Technology</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link active onClick={this.callSports}>Sports</Nav.Link></Nav.Item>
      </Nav>;
    }
    else{
      navitems=<Nav className="mr-auto">
        <Nav.Item><Nav.Link onClick={this.callHome}>Home</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callWorld}>World</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callPolitics}>Politics</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callBusiness}>Business</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callTechnology}>Technology</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link onClick={this.callSports}>Sports</Nav.Link></Nav.Item>
      </Nav>;
    }
    var temp="";
    if(this.props.current_query !== ""){
      temp={label: this.props.current_query, value: this.props.current_query};
    }
    return(
       <Navbar expand="lg" className="navbar-dark" id="startPage" onToggle={this.setNavExpanded} expanded={this.state.navExpanded}>
         <div>
         <AsyncSelect
          className="auto-suggest col-9 col-sm-9 col-md-6 col-lg-3"
          //cacheOptions
          //defaultOptions
          // loadOptions={loadOptions}
          //onInputChange={this.handleInputChange}
          //autoFocus={true}
          loadOptions={this.handleSearchChange}
          //results = {this.state.results}
          onChange = {this.handleResultSelect.bind(this)}
          onInputChange = {this.handleInputChange}
          // onChange = {opt => this.getResult(opt)}
          value = {temp}
          placeholder="Enter Keyword .."
        />
         </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {navitems}
          
          <Nav.Item className="justify-content-end">
            <div data-tip="Bookmark"><span className="d-inline-block navbar-bookmark" onClick={this.callBookmark}>
                {bookmarkIcon}
              </span></div>
            <ReactTooltip />
            {/* <OverlayTrigger placement='bottom' overlay={<Tooltip id="tooltip">Bookmark</Tooltip>}>
              <span className="d-inline-block navbar-bookmark" onClick={this.callBookmark}>
                {bookmarkIcon}
              </span>
            </OverlayTrigger> */}
          </Nav.Item>
          {toggleSwitch}
        </Navbar.Collapse>
       </Navbar>
     );
  }
}

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    current_category: state.displayDetails.category,
    current_query: state.displayDetails.query,
    current_source: state.displayDetails.source,
    current_bookmark: state.displayDetails.bookmark,
    current_bigCard: state.displayDetails.bigCard,
  };
};

// const mapDispatchToProps = (dispatch) =>{
//   console.log(dispatch);
//   return{
//     onCategoryChange: category => dispatch(setCategory(category)),
//     onQueryChange: query => dispatch(setQuery(query)),
//     onNewsSourceChange: source => dispatch(setNewsSource(source)),
//     onBookmarkChange: bookmark => dispatch(displayBookmark(bookmark)),
//   };
// };

export default connect( mapStateToProps )(NavBar);

