import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'
import OverflowScrolling from 'react-overflow-scrolling'
import PropTypes from 'prop-types';
//videoClickFunction photoClickFunction
const ThumbNails =styled.img`
height:71px;
width:85px;
`;
const Bar = styled.div`
overflow:auto;
white-space:nowrap;
opacity:1;
`;

class Gallery extends React.Component{
constructor(props){
  super(props);
  this.state={
  }
}
componentDidMount(){
}
render(){
  var thumburls = this.props.thumbnailUrls.map((val,index)=><ThumbNails src={val} onClick={this.props.videoClickFunction.bind(null, index)}/>);

  var photourls = this.props.photoUrls.map((val, index)=><ThumbNails src = {val} onClick={this.props.photoClickFunction.bind(null, index)}/>);

  return (<OverflowScrolling >
    <Bar className="gallery-bar overflow-scrolling" >{thumburls}{photourls}{thumburls}{photourls}</Bar>
    </OverflowScrolling>);
}
}

export default Gallery;