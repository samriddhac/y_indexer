import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#ffffff'
  },
  headerContainer: {
  	flex: 1,
    backgroundColor: '#bc0909',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  headerIcon: {
    width:40,
    color:'#ffffff'
  },
  headerIconSearch: {
    justifyContent:'flex-end',
    paddingLeft:5,
    paddingRight:10
  },
  headerText: {
    flex:3,
    fontSize: 20,
    color: '#ffffff',
    paddingLeft:20
  },
  baseContainer: {
  	flex: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  resultContainer: {
    flex: 12,
    alignItems: 'stretch'
  },
  defaultFont: {
    fontWeight: 'bold',
    fontFamily: 'notoserif'
  },
  searchBoxContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  searchTextBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  searchBack: {
    color: '#bc0909',
    flex: 1
  },
  TextInputStyle: {
    flex:7,
    alignItems: 'stretch',
    fontSize: 20,
    marginRight:10,
    fontFamily: 'notoserif',
    height: 44,
    paddingHorizontal: 10,
  },
  backContainer: {
    backgroundColor: 'transparent',
    width: 44,
    height: 44,
    borderRadius: 44
  },
  searchResultContainer:{
    flex:7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10
  },
  row: {
    flex:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  thumb:{
    width:100,
    height:80
  },
  rowText: {
    marginLeft: 10
  },
  subRightContainer: {
    flex:1,
    backgroundColor: 'transparent'
  },
  subRightBtnContainer: {
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  selected: {
    backgroundColor: '#d6d5f2'
  },
  unselected: {
    backgroundColor: '#ffffff'
  },
  mapButton: {
    flex:1,
    paddingRight:6,
    backgroundColor:'transparent',
    color: '#bc0909'
  },
  contentMetadata: {
    flex:2,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'stretch',
    paddingLeft:10,
    paddingRight:10
  },
  contentThumb: {
    flex:1,
    width:50,
    height:50,
    padding:10
  },
  contentText: {
    flex:7,
    padding:5
  },
  contentBtn: {
    flex:2,
    padding:5,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    padding:5
  }
});
export default styles;