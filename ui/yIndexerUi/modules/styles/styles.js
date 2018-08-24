import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#ffffff',
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
  }
});
export default styles;