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
  baseContainer: {
  	flex: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  defaultFont: {
    fontWeight: 'bold',
    fontFamily: 'notoserif'
  },
  headerText: {
    flex:3,
    fontSize: 20,
    color: '#ffffff',
    paddingTop: 20,
    paddingLeft:20
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
    paddingTop: 20,
  },
  searchBack: {
    color: '#4A44F2',
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