import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

export default class TabPane extends Component {

	constructor(props) {
		super(props);
	}

	render(){
		if(this.props.option === 1 
			&& this.props.data.raw
			&& this.props.data.raw!==undefined
			&& this.props.data.raw!==null) {
			return(
				<View style={styles.tabPane}>
					<Text>{this.props.data.raw}</Text>
				</View>
			);
		}
		else if(this.props.option === 2 
			&& this.props.data.summary_abs
			&& this.props.data.summary_abs!==undefined
			&& this.props.data.summary_abs!==null) {
			return(
				<View style={styles.tabPane}>
					<Text>{this.props.data.summary_abs}</Text>
				</View>
			);
		}
		else if(this.props.option === 3 
			&& this.props.data.nr
			&& this.props.data.nr!==undefined
			&& this.props.data.nr!==null) {
			return(
				<View style={styles.tabPane}>
					<Text>{this.props.data.nr}</Text>
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