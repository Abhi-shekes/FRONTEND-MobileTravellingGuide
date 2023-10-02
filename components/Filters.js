import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

class Filters extends React.Component {
  state = {
    pressedButtonIndex: null,
  };

  handleButtonPress = (index) => {
    this.setState({ pressedButtonIndex: index });
  };

  renderButton1 = ({ item, index }) => {
    const { pressedButtonIndex } = this.state;
    const isPressed = pressedButtonIndex === index;

    return (
      <TouchableOpacity
        style={[styles.container1, isPressed && styles.container1Pressed]}
        onPress={() => this.handleButtonPress(index)}
        activeOpacity={0.6}>
        <Image source={item.image} style={styles.image} />
        <Text style={[styles.text, isPressed && styles.textPressed]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const data = [
      { title: 'Recommended', key: '1' },
      { title: 'Historical', key: '2' },
      { title: 'Religious', key: '3' },
      { title: 'Beaches', key: '4' },
      { title: 'Hill Stations', key: '5' },
      { title: 'Landmarks', key: '6' },
      { title: 'Wonders', key: '7' },
      { title: 'Architectural', key: '8' },
      { title: 'Scenic Beauty', key: '9' },
      { title: 'Sanctuaries', key: '10' },
      { title: 'Parks', key: '11' },
    ];

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this.renderButton1}
          keyExtractor={(item) => item.key} // Use the unique key as the keyExtractor
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    paddingTop: 5,
    paddingHorizontal: 20,
    margin: 2,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingVertical: 8,
    elevation: 3,
  },
  container1Pressed: {
    borderColor: '#8c9cbc',
    backgroundColor: '#a9a9a9',
  },

  text: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgb(0, 0, 0)',
    textAlign: 'center',
  },
  textPressed: {
    color: '#fff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Filters;
