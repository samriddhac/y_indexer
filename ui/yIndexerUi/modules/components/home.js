import React, { Component } from 'react';
import {TextInput,
		KeyboardAvoidingView,
		TouchableNativeFeedback} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createAnimatableComponent, View, Text } from 'react-native-animatable';
import { connect } from 'react-redux';
import styles from '../styles/styles';

export default class Home extends Component {
	
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
		if (query === '') {
		  
	    }
	    else {
	    	this.setState({...this.state, text:query});
	    }
	}

	renderHeader() {
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
						<TextInput onChangeText={(text) => this._filterData(text)}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder='Search Contacts...'
							style={[styles.TextInputStyle]} />
					</KeyboardAvoidingView>
				</View>
			);
		}
		else {
			return (
				<View style={styles.headerContainer}>
					<Text style={[styles.defaultFont, styles.headerText]}>YouText</Text>
					<MaterialCommunityIcons name="search" size={30} onPress={()=>{this._showSearch(true)}}
							style={[styles.searchBack]}/>
				</View>
			);
		}
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				{this.renderHeader();}
				<View style={styles.baseContainer}>
					<Text>(No search results)</Text>
				</View>
			</View>
		);
	}
}