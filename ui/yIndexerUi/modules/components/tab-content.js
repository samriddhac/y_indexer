import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import styles from '../styles/styles';
import TabPane from './tab-pane';

export default class TabContent extends Component {

	constructor(props) {
		super(props);

		this.state = {
		    index: 0,
		    routes: [
		      { key: 'first', title: 'Table of Content' },
		      { key: 'second', title: 'Content' },
		      { key: 'third', title: 'Summary' }
		    ],
		  };

		  this._handleIndexChange = this._handleIndexChange.bind(this);
		  this._renderTabBar = this._renderTabBar.bind(this);
	}

	_handleIndexChange(index){
		this.setState({ index });
	}
	_renderTabBar(props){
	    const inputRange = props.navigationState.routes.map((x, i) => i);
	    return (
	      <View style={styles.tabBar}>
	        {props.navigationState.routes.map((route, i) => {
	          const color = props.position.interpolate({
	            inputRange,
	            outputRange: inputRange.map(
	              inputIndex => (inputIndex === i ? '#ff0000' : '#bc0909')
	            ),
	          });
	          return (
	            <TouchableOpacity
	              style={styles.tabItem}
	              onPress={() => this.setState({ index: i })}>
	              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
	            </TouchableOpacity>
	          );
	        })}
	      </View>
	    );
  	}

	_renderScene = ({ route }) => {
		switch (route.key) {
			case 'first':
				return <TabPane option={3} data={this.props.data} />;
			case 'second':
				return <TabPane option={1} data={this.props.data} />;
			case 'third':
				return <TabPane option={2} data={this.props.data} />;
			default:
				return null;
		}
	};

	render() {
		return(
		  <TabView
		    navigationState={this.state}
		    renderScene={this._renderScene}
		    renderTabBar={this._renderTabBar}
		    onIndexChange={this._handleIndexChange}
		  />
		);
	}
}