import React, { Component } from 'react';
import { connect } from 'react-redux';
import {KeyboardAvoidingView,
	Image,
	TouchableHighlight,
	TouchableNativeFeedback,
	} from 'react-native';
import { createAnimatableComponent, View, Text } from 'react-native-animatable';
import styles from '../styles/styles';
import {download,
		deletedownload,
		gettext
	} from '../actions/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { STATUS_PENDING,
	STATUS_READY} from '../common/constants';

class ContentResult extends Component {

	constructor(props) {
		super(props);

		this._renderMetadata = this._renderMetadata.bind(this);
		this._renderStatus = this._renderStatus.bind(this);
	}

	_renderStatus() {
		let data = this.props.metadata;
		if (data.status == STATUS_READY) {
			return (
				<View style={styles.contentBtn}>
					<TouchableNativeFeedback onPress={()=>{
							this.props.deletedownload(data.id);
						}}
						background={TouchableNativeFeedback.Ripple('#CC39C4', true)}>
						<MaterialCommunityIcons name="delete" size={30} 
							style={[styles.mapButton]} />
					</TouchableNativeFeedback>
				</View>
			);
		}
		else if(data.status === STATUS_PENDING) {
			return (
				<View style={styles.contentBtn}>
					<TouchableNativeFeedback onPress={()=>{
							this.props.gettext(data);
						}}
						background={TouchableNativeFeedback.Ripple('#CC39C4', true)}>
						<MaterialCommunityIcons name="refresh" size={30} 
							style={[styles.mapButton]} />
					</TouchableNativeFeedback>
				</View>
			);
		}
		else {
			return (
				<View style={styles.contentBtn}>
					<TouchableNativeFeedback onPress={()=>{
							this.props.download(data);
						}}
						background={TouchableNativeFeedback.Ripple('#CC39C4', true)}>
						<MaterialCommunityIcons name="briefcase-download" size={30} 
							style={[styles.mapButton]} />
					</TouchableNativeFeedback>
				</View>
			);
		}
		return null;
	}

	_renderMetadata(){
		let data = this.props.metadata;
		let thumbnail = require('../../modules/images/default.png');
		if(data.thumbnails!==undefined && data.thumbnails!==null 
			&& data.thumbnails.url!==undefined && data.thumbnails.url!== null
			&& data.thumbnails.url!=='') {
			thumbnail = {uri:data.thumbnails.url};
		}
		let title = 'No Title';
		if(data.title!==undefined && data.title!==null 
			&& data.title!=='') {
			title = data.title;
		}
		return (
			<View style={styles.contentMetadata}>
				<Image style={[styles.contentThumb]} source={thumbnail}
		            	defaultSource={require('../../modules/images/default.png')} />
		        <View style={styles.contentText}>
			        <Text style={[styles.defaultFont]}>
		              {title}
		            </Text>
	            </View>
	            {this._renderStatus()}
			</View>
		);
	}

	render() {
		return(
			<View animation="fadeInRight" delay={100} style={styles.resultContainer}>
				{this._renderMetadata()}
			</View>
		);
	}

}

function mapStateToProps(state) {
	let metadata = {};
	let text = {};
	if(state.contentState!==undefined && state.contentState!==null) {
		metadata = state.contentState.metadata;
		text = state.contentState.text;
	}
	return { 
		metadata: metadata,
		text:text
	};
}
export default connect(mapStateToProps, 
	{download, deletedownload, gettext})(ContentResult);