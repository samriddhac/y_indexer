import React, { Component } from 'react';
import {Text, View, StatusBar, AppState} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { MenuContext } from 'react-native-popup-menu';
import ViewStateManager from './view-state-manager';

export default class Base extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<MenuContext>
				<View style={styles.container}>
					<StatusBar
				     backgroundColor="#bc0909"
				     barStyle="dark-content"
				   />
					<ViewStateManager />
				</View>
			</MenuContext>
		);
	}
}
