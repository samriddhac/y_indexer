import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/styles';

export default class TabPane extends Component {

	constructor(props) {
		super(props);
	}

	render(){
		if(this.props.option === 1 
			&& this.props.data
			&& this.props.data.data
			&& this.props.data.data.raw
			&& this.props.data.data.raw!==undefined
			&& this.props.data.data.raw!==null) {
			return(
				<View style={{flex:1}}>
					<ScrollView style={styles.tabPane}>
						<Text>{this.props.data.data.raw}</Text>
					</ScrollView>
				</View>
			);
		}
		else if(this.props.option === 2 
			&& this.props.data
			&& this.props.data.data
			&& this.props.data.data.summary_abs
			&& this.props.data.data.summary_abs!==undefined
			&& this.props.data.data.summary_abs!==null) {
			return(
				<View style={{flex:1}}>
					<ScrollView style={styles.tabPane}>
						<Text>{this.props.data.data.summary_abs}</Text>
					</ScrollView>
				</View>
			);
		}
		else if(this.props.option === 3 
			&& this.props.data
			&& this.props.data.data
			&& this.props.data.data.nr
			&& this.props.data.data.nr!==undefined
			&& this.props.data.data.nr!==null) {
			return(
				<View style={{flex:1}}>
					<ScrollView style={styles.tabPane}>
						<Text>{this.props.data.data.nr}</Text>
					</ScrollView>
				</View>
			);
		}
		else {
			return(
				<View style={styles.tabPane}>
					<Text>Text content is not prepared</Text>
				</View>
			);
		}
	}

}