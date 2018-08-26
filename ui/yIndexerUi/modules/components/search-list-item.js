import React from 'react';
import {Image,
	View, 
	Text,
	TouchableHighlight,
	TouchableNativeFeedback} from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import Spinner from 'react-native-spinkit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { STATUS_PENDING,
	STATUS_READY} from '../common/constants';
import styles from '../styles/styles';

export default class SearchListItem extends React.PureComponent {

	constructor(props) {
		super(props);
	}

	_onPressRow() {
		console.log('this.props ',this.props.onRowPressed);
		let data = this.props.data.item;
		this.props._onRowPressed(data);
	}

	_download(){
		let data = this.props.data.item;
		data.status = STATUS_PENDING;
		this.props._download(data);
	}

	_deletedownload(){
		let data = this.props.data.item;
		this.props._deletedownload(data.id);
	}

	_renderStatus() {
		let data = this.props.data.item;
		if (data.status == STATUS_READY) {
			return (
				<View style={[styles.subRightContainer, styles.buttonSpace]}>
					<View style={styles.subRightBtnContainer}>
						<TouchableNativeFeedback onPress={()=>{
								this._deletedownload();
							}}
							background={TouchableNativeFeedback.Ripple('#CC39C4', true)}>
							<MaterialCommunityIcons name="delete" size={30} 
								style={[styles.mapButton]} />
						</TouchableNativeFeedback>
					</View>
				</View>
			);
		}
		else if(data.status === STATUS_PENDING) {
			return (
				<View style={[styles.subRightContainer, styles.buttonSpace]}>
					<View style={styles.subRightBtnContainer}>
						<MaterialCommunityIcons name="play-pause" size={30} 
								style={[styles.mapButton]} />
					</View>
				</View>
			);
		}
		else {
			return (
				<View style={[styles.subRightContainer, styles.buttonSpace]}>
					<View style={styles.subRightBtnContainer}>
						<TouchableNativeFeedback onPress={()=>{
								this._download();
							}}
							background={TouchableNativeFeedback.Ripple('#CC39C4', true)}>
							<MaterialCommunityIcons name="briefcase-download" size={30} 
								style={[styles.mapButton]} />
						</TouchableNativeFeedback>
					</View>
				</View>
			);
		}
		return null;
	}

	render() {
		let maxlimit = 60;
		let data = this.props.data.item;
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
		let decription = '';
		if(data.description!==undefined && data.description!==null 
			&& data.description!=='') {
			description = data.description;
		}
		let datePublish = '';
		if(data.publishedAt!==undefined && data.publishedAt!==null 
			&& data.publishedAt!=='') {
			datePublish = new Date(data.publishedAt);
			datePublish = moment(datePublish).format('HH:mm YYYY-DD-MM')
		}
		return (
			<TouchableHighlight onPress={() => {this._onPressRow();}} 
			underlayColor='#d6d5f2'>
				<View style={styles.row}>
					<View style={[styles.searchResultContainer]}>
						<Image style={[styles.thumb]} source={thumbnail}
		            	defaultSource={require('../../modules/images/default.png')} />
			            <View style={[styles.rowText]}>
				            <Text style={[styles.defaultFont]}>
				              {((title).length > maxlimit) ? 
							    (((title).substring(0,maxlimit-3)) + '...') : 
							    title}
				            </Text>
				            <Text>
				            	{((description).length > maxlimit) ? 
							    (((description).substring(0,maxlimit-3)) + '...') : 
							    description}
				            </Text>
				            <Text>
				            	{datePublish}
				            </Text>
			            </View>
					</View>
					{this._renderStatus()}
				</View>
          	</TouchableHighlight>
		);
	}

}