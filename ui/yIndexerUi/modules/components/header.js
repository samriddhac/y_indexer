import React, { Component } from 'react';
import {TextInput,
		KeyboardAvoidingView,
		TouchableNativeFeedback} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createAnimatableComponent, View, Text } from 'react-native-animatable';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import {search} from '../actions/index';
import _ from 'lodash';


class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text:'',
			showsearch: false
		}
	}

	_showSearch(value) {
		this.setState({...this.state, showsearch:value});
	}

	_searchData(query) {
		if (query && query!==undefined
			&& query!== null && query !== '') {
		  	this.setState({...this.state, text:query});
		  	this.props.search(query);
	    }
	}

	render() {
		const videoSearh = _.debounce(term => this._searchData(term), 2000);
		if(this.state.showsearch === true) {
			return (
				<View animation="fadeInRight" delay={100} style={styles.searchBoxContainer}>
					<KeyboardAvoidingView style={styles.searchTextBox} behavior={this.state.behavior} >
						<TouchableNativeFeedback onPress={()=>{this._showSearch(false)}}
						background={TouchableNativeFeedback.Ripple('#CC39C4', true)}>
							<View style={[styles.backContainer]}>
								<MaterialCommunityIcons name="arrow-left" size={30} 
								style={[styles.searchBack]}/>
							</View>
						</TouchableNativeFeedback>
						<TextInput onChangeText={videoSearh}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder='Search'
							style={[styles.TextInputStyle]} />
					</KeyboardAvoidingView>
				</View>
			);
		}
		else {
			return (
				<View animation="fadeInLeft" delay={100} style={styles.headerContainer}>
					<Text style={[styles.defaultFont, styles.headerText]}>YouText</Text>
					<MaterialCommunityIcons name="magnify" 
						size={30} onPress={()=>{this._showSearch(true)}}
						style={[styles.headerIcon,styles.headerIconSearch]}/>
				</View>
			);
		}
	}
}

export default connect(null, {search})(Header);