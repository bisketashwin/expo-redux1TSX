import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Counter = () => {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>EXPO REDUX</Text>
        <View >
          <View style={styles.smallcontainer}><Text id='Total' style={styles.totalText}>0</Text></View>
          <View id='ButtonsContainer' style={styles.buttonContainer}><TouchableHighlight id='add' style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableHighlight>
            <TouchableHighlight id='remove' style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableHighlight>
          </View>

        </View>

      </View>
  )
}

export default Counter

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  smallcontainer: {
    backgroundColor: 'gray',
    // rowGap:40,
    // height:150,
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    columnGap: 40,
    alignContent: 'center',
    justifyContent: 'center',

  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 5,
    paddingHorizontal: 40,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
    height: 70,
  },
  buttonText: {
    fontSize: 32,
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
  },
  totalText: {
    fontSize: 60,
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
  }
});