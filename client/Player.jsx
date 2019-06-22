import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import PerfectScrollbar from 'react-perfect-scrollbar'
import styled from 'styled-components'
import Gallery from './Gallery.jsx'
import PropTypes from 'prop-types';
//const request = require('request');
const MediaContainer = styled.div`
width:600px;
height:450px;
`;
const Photo = styled.img`
width:600px;
height:360px;
display:block;
`;
class Player extends React.Component {
  constructor(props){
    super(props);
    this.state={
      currentlyPlaying:'',
      currentPhoto:'',
      showPhoto:false,
      playing:true
    };
    this.videoClicked = this.videoClicked.bind(this);
    this.photoClicked = this.photoClicked.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  videoClicked(index){

    this.setState((state,props)=>(
      {
      currentlyPlaying:this.props.videoUrls[index],
      showVideoThumbnail:true,
      showPhoto:false,
      playing:true

    }))
  }
  photoClicked(index){
    this.setState((state,props)=>(
      {
      showPhoto:true,
      currentPhoto:this.props.photoUrls[index],
      playing:false
    }))
  }
    componentDidMount(){
      this.setState((state,props)=>(
        {
        currentlyPlaying:this.props.videoUrls[0],
        showPhoto:false,
        playing:true
      }))
    }
  render(){
    if(this.state.showPhoto){
      return(<MediaContainer><Photo 
      src={this.state.currentPhoto} />
      <Gallery 
      thumbnailUrls={this.props.thumbnailUrls} 
      photoUrls={this.props.photoUrls} 
      videoClickFunction={this.videoClicked} 
      photoClickFunction = {this.photoClicked}/>
      </MediaContainer>)
    }else
    return (<MediaContainer>
     <ReactPlayer style={{backgroundColor:'#182937'}}width="600px" url={this.state.currentlyPlaying} controls={true} volume={0.15} playing={this.state.playing} muted={true} file={{forceVideo:true}}/>
    <Gallery thumbnailUrls={this.props.thumbnailUrls} photoUrls={this.props.photoUrls} videoClickFunction={this.videoClicked} photoClickFunction = {this.photoClicked}/>
    </MediaContainer>)
    }
}
// Player.propTypes={
// currentVideo:Proptypes.string,
// photoUrls:Proptypes.array,
// videoUrls:Proptypes.array,
// thumbnailUrls:Proptypes.array,
// videoWasClicked:Proptypes.function,
// photoWasClicked:Proptypes.function
// }
// ReactDOM.render(<Player />, document.getElementById("player"));
export default Player