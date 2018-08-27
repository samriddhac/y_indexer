import React, { Component } from 'react';
import {View, 
		Text,
		} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/styles';
import Header from './header';
import ContentResult from './content-result';

export default class Content extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<Header backToSearch={true}/>
				<ContentResult />
			</View>
		);
	}
}
