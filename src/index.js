import React, {Component} from 'react';
import ReactDom from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
//eslint-disable-next-line
const API_Key='AIzaSyDWFndYeOgq230ATYCzqBCeVN63k2Y4Rqo';


//Creates a component
class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			videos:[],
			selectedVideo:null
		};
		this.videoSearch('surfboards');
		
	}

	videoSearch(term){
		YTSearch({key:API_Key,term:term},(videos)=>{
			this.setState({ 
				videos:videos,
				selectedVideo:videos[0]
			 })
		})
	}

	render(){
		const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300)
	return (
          <div>
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList
             onVideoSelect={selectedVideo => this.setState({selectedVideo})}
             videos={this.state.videos}/>
          </div>
          );	
		}  
}

//Add a component into the dom
ReactDom.render(<App />, document.querySelector('.root'))