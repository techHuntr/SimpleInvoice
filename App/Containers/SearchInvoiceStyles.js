import {StyleSheet, Dimensions} from 'react-native';
import {Colors, Metrics} from '../Theme';
import {Helpers} from '../Theme';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  searchBarStyle: {
    flex: 1,
    height: height / 12,
  },
  dateWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: height / 20,
  },
  searchWrap: {
    height: height / 11,
  },
});
