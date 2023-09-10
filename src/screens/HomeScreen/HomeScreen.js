import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor, editColor, deleteColor } from "../../../store/colorSlice";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icon library
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const HomeScreen = () => {
  const color = useSelector((state) => state.color.value);
  const dispatch = useDispatch();

  const numColumns = 3;
  const itemPadding = 0;
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = ((screenWidth - (numColumns - 1) * itemPadding) / numColumns)-10;

  const randomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
  
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');
  
    // const color = `rgb(${red}, ${green}, ${blue})`
    const hexColor = `#${redHex}${greenHex}${blueHex}`
    return (hexColor);
  };

  function ContrastText(backgroundColor) {
    function isLightColor(hexColor) {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128;
    }

    const textColor = isLightColor(backgroundColor) ? "black" : "white";

    return textColor;
  }

  const renderItem = ({ item }) => {
    return (
      <View id='colorBase'
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: itemWidth,
          marginBottom: itemPadding,
          marginRight: itemPadding,
        }}
      >
          <View
          id='colorSwatch'
            style={{
              backgroundColor: item[0],
              height: itemWidth,
              width: '100%',
              alignSelf: "center",
              // borderRadius: 5,
            }}
          >
            <View id='colourInfo' style={{ padding: 10 }}>
              <Text style={{ color: ContrastText(item[0]) }}>{!item[2] ? 'close match to ' : ''}</Text>
              <Text style={{ color: ContrastText(item[0]) }}>{item[1]}</Text>
            </View>
            <View id='bottomBar' style={{flexDirection:'row',position: "absolute",bottom: 5, width:'100%'}}>
              <TouchableHighlight
               id="DeleteBtn"
                style={{
                  backgroundColor: " ",
                  paddingVertical: 5,
                  borderRadius: 5,
                  alignItems: 'center',
                  width:30,
                  left:5,
                }}
                onPress={() => dispatch(deleteColor(item))}
              >
                <Icon name="trash" size={20} color={ContrastText(item[0])}  />
              </TouchableHighlight>
              <TouchableHighlight
               id="Refresh"
                style={{
                  backgroundColor: " ",
                  paddingVertical: 5,
                  borderRadius: 5,
                  alignItems: 'center',
                  width:30,
                  position: "absolute",
                  right:5,
                }}
                onPress={() => dispatch(editColor([item, randomColor()]))}
              >
                <MaterialIcon name="autorenew" size={20} color={ContrastText(item[0])} />
              </TouchableHighlight>
            </View>
          </View>



      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        keyExtractor={(item, index) => item}
        data={color}
        // style={{ marginTop: 15 }}
        numColumns={numColumns}
        renderItem={renderItem}
        // columnWrapperStyle={{justifyContent: 'space-between'}}
    
      />
      <View style={{position:"absolute",bottom:5, backgroundColor:'rgba(208, 223, 226, 0.71)', width:'100%', alignItems:'center', padding:5}}>
      <Text style={styles.text}>Add more colors</Text>
      <TouchableOpacity onPress={() => dispatch(setColor())} style={styles.button}>
        <Text style={styles.buttonText}>Generate Color</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    alignSelf:"center",
    justifyContent: "center",
    fontSize: 18,
    marginBottom: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width:250,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

export default HomeScreen;
