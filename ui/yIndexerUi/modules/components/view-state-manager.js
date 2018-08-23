import React, {Component} from 'react';
import {connect} from 'react-redux';

import {VIEW_HOME, VIEW_CONTENT} from '../common/constants';
import Home from './home';
import Content from './content';

class ViewStateManager extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		if(this.props.viewId === VIEW_HOME) {
			return(<Home options={this.props.options}/>);
		}
		if(this.props.viewId === VIEW_CONTENT) {
			return(<Content options={this.props.options}/>);
		}
		return (<Home options={this.props.options}/>);
	}
}
function mapStateToProps(state) {
	let viewId = state.viewState.id;
	let options = state.viewState.options;
	return { viewId, options }; 
}
export default connect(mapStateToProps)(ViewStateManager);