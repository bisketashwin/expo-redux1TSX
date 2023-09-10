import React, { useEffect, useState } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { isLightColor, randomColor } from "../../../plugIns/colorUtils";
import { generateColorName } from "../../../plugIns/colorNameFinder";

const ColorItem: React.FC<{ item: [string, string, boolean]; itemWidth: number; itemPadding: number }> = ({ item, itemWidth, itemPadding }) => {
  const dispatch = useDispatch();
  const [backgroundColor, setBackgroundColor] = useState<string>(item[0]);
  const styles = getStyles(itemWidth, itemPadding);

  useEffect(() => {
    setBackgroundColor(item[0]);
  }, [item[0]]);

  const handleDelete = () => {
    dispatch(deleteColor(item));
  };

  const handleRefresh = () => {
    dispatch(editColor([item, generateColorName()]));
  };


  return (
    <View id='colorBase' style={styles.colorItem}>
      <View id='colorSwatch' style={{ backgroundColor: backgroundColor, ...styles.colorSwatch }}>
        <View id='colourInfo' style={styles.colorInfo}>
          <Text style={{ color: isLightColor(backgroundColor) ? "black" : "white" }}>
            {!item[2] ? "close match to " : ""}
          </Text>
          <Text style={{ color: isLightColor(backgroundColor) ? "black" : "white" }}>{item[1]}</Text>
        </View>
        <View id='bottomBar' style={styles.bottomBar}>
          <TouchableHighlight
            id="DeleteBtn"
            style={{ ...styles.buttonIcon, ...styles.leftBottom }}
            onPress={handleDelete}
          >
            <Icon name="trash" size={20} color={isLightColor(backgroundColor) ? "black" : "white"} />
          </TouchableHighlight>
          <TouchableHighlight
            id="Refresh"
            style={{ ...styles.buttonIcon, ...styles.rightBottom }}
            onPress={handleRefresh}
          >
            <MaterialIcon name="autorenew" size={20} color={isLightColor(backgroundColor) ? "black" : "white"} />
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const color = useSelector((state: any) => state.color.value);
  const dispatch = useDispatch();

  const numColumns = 3;
  const itemPadding = 0;
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = ((screenWidth - (numColumns - 1) * itemPadding) / numColumns) - 10;
  const styles = getStyles(itemWidth, itemPadding);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <FlatList
        keyExtractor={(item, index) => item}
        data={color}
        numColumns={numColumns}
        renderItem={({ item }) => <ColorItem item={item} itemWidth={itemWidth} itemPadding={itemPadding} />}
      />
      <View style={styles.addButtonContainer}>
        <Text style={styles.text}>Add more colors</Text>
        <TouchableOpacity onPress={() => dispatch(setColor())} style={styles.button}>
          <Text style={styles.buttonText}>Generate Color</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (itemWidth: number, itemPadding: number) => {
  return StyleSheet.create({
    colorItem: {
      alignItems: "center",
      justifyContent: "center",
      width: itemWidth,
      marginBottom: itemPadding,
      marginRight: itemPadding,
    },
    colorSwatch: {
      height: itemWidth,
      width: '100%',
      alignSelf: "center",
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      alignSelf: "center",
      justifyContent: "center",
      fontSize: 18,
      marginBottom: 5,
    },
    addButtonContainer: {
      position: "absolute",
      bottom: 5,
      backgroundColor: 'rgba(208, 223, 226, 0.71)',
      width: '100%',
      alignItems: 'center',
      padding: 5,
    },
    button: {
      alignItems: "center",
      backgroundColor: "#007AFF",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      width: 250,
    },
    buttonText: {
      color: "white",
      fontSize: 20,
    },
    colorInfo: {
      padding: 10,
    },
    bottomBar: {
      flexDirection: 'row',
      position: "absolute",
      bottom: 5,
      width: '100%',
    },
    buttonIcon: {
      backgroundColor: " ",
      paddingVertical: 5,
      borderRadius: 5,
      alignItems: 'center',
      width: 30,

    },
    leftBottom: {
      left: 5,
    },
    rightBottom: {
      position: "absolute",
      right: 5,
    },
  });
};

export default HomeScreen;
