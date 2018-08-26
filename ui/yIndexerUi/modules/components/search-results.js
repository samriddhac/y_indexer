import React, { Component } from 'react';
import { connect } from 'react-redux';
import {KeyboardAvoidingView,
	FlatList,
	TouchableHighlight,
	TouchableNativeFeedback,
	} from 'react-native';
import { createAnimatableComponent, View, Text } from 'react-native-animatable';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {search, 
		changeView, 
		download,
		deletedownload,
		loaddownload,
		gettext
	} from '../actions/index';
import SearchListItem from './search-list-item';
import styles from '../styles/styles';
import {VIEW_CONTENT} from '../common/constants';

class SearchResults extends Component {

	constructor(props) {
		super(props);
		this.state = {
			results:[]
		}

		this._emptyView = this._emptyView.bind(this);
		this._renderSeparator = this._renderSeparator.bind(this);
		this._renderRows = this._renderRows.bind(this);
		this._renderRow = this._renderRow.bind(this);
		this._renderList = this._renderList.bind(this);
		this._onRowPressed = this._onRowPressed.bind(this);
		this._download = this._download.bind(this);
		this._deletedownload = this._deletedownload.bind(this);
	}

	componentDidMount() {
		this.props.loaddownload();
	}

	_emptyView(){
		return (
			<View style={styles.baseContainer}>
				<Text>(No search results)</Text>
			</View>
		);
	}

	_renderSeparator() {
		return (
		  <View
		    style={styles.separator}
		  />
		);
	}

	_renderRow(data) {
		return(
			<SearchListItem data={data} 
			_onRowPressed={this._onRowPressed}
			_download={this._download}
			_deletedownload={this._deletedownload}
			/>
		);
	}

	_download(data){
		if(data.id !== undefined) {
			this.props.download(data);
		}
	}

	_deletedownload(data){
		if(data.id !== undefined) {
			this.props.deletedownload(data.id);
		}
	}

	_renderRows() {
		results = this.props.savedresults;
		if(this.props.context === 2) {
			results = this.props.results;
		}
		else {
			results = this.props.savedresults;
		}
		return (
			<FlatList
			  data={results}
	          renderItem={this._renderRow}
	          pagingEnabled={true}
	          ItemSeparatorComponent={this.renderSeparator}
	          keyExtractor={(item, index) => item.id}
			/>
		);
	}

	_renderList(options) {
		return this._renderRows();
		
	}

	_onRowPressed(data){
		console.log(data);
		this.props.gettext(data);
		this.props.changeView(VIEW_CONTENT);
	}

	_onSwipeUp(state){
		if(this.props.context === 2) {
			this.props.search(this.props.text, this.props.token);
		}
	}

	render() {
		results = this.props.savedresults;
		if(this.props.context === 2) {
			results = this.props.results;
		}
		else {
			results = this.props.savedresults;
		}
		if(results && results.length>0) {
			let {options} = this.props;
			const config = {
		      velocityThreshold: 0.3,
		      directionalOffsetThreshold: 80
		    };
			return(
				<View animation="fadeInRight" delay={100} style={styles.resultContainer}>
					<GestureRecognizer
						onSwipeUp={(state) => this._onSwipeUp(state)}
						config={config}
					>
						{this._renderList(options)}
					</GestureRecognizer>
				</View>
			);
		}
		else {
			return this._emptyView();
		}
		
	}
}

function mapStateToProps(state) {
	let savedresults = [];
	let results = [];
	let token = '';
	let text ='';
	let context =1;
	if(state.searchState!==undefined && state.searchState!==null) {
		results = state.searchState.search_results;
		savedresults = state.searchState.saved_download;
		token = state.searchState.next_page_token;
		text = state.searchState.text;
		context = state.searchState.context;
	}
	return { 
		results: results,
		savedresults:savedresults,
		token:token,
		text:text,
		context:context
	};
}
export default connect(mapStateToProps, 
	{changeView, search, download, loaddownload,
	deletedownload, gettext})(SearchResults);