import React, { Component } from 'react';
import {View, 
		Text,
		} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/styles';
import Header from './header';

export default class Home extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				<Header />
				<View style={styles.baseContainer}>
					<Text>(No search results)</Text>
				</View>
			</View>
		);
	}
}