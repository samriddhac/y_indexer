import React, { Component } from 'react';
import {Text, View, StatusBar, AppState, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import styles from '../styles/styles';
import { MenuContext } from 'react-native-popup-menu';
import ViewStateManager from './view-state-manager';
import {filterByStatus, listToString} from '../common/utils';
import {STATUS_PENDING} from '../common/constants';
import {checktext} from '../actions/index';
import BackgroundTask from 'react-native-background-task';

class Base extends Component {
	
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		this.timer = setInterval(()=> this._runStatus(), 10000)
	}

	componentWillUnmount() {
        if(this.timer!==undefined && this.timer!==null){
        	clearInterval(this.timer);
        }
    }

	async _runStatus() {
		param = listToString(filterByStatus(this.props.savedresults,STATUS_PENDING));
		if(param!==undefined && param!==null && param!==''){
			this.props.checktext(param);
		}
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

function mapStateToProps(state) {
	let savedresults = [];
	if(state.searchState!==undefined && state.searchState!==null) {
		savedresults = state.searchState.saved_download;
	}
	return { 
		savedresults:savedresults
	};
}

export default connect(mapStateToProps, 
	{checktext})(Base);
