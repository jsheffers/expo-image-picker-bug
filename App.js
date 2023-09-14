import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useState } from "react";

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [image, setImage] = useState("");

  const getMediaLibraryPermission = async () => {
    console.log("Library Status", status);

    // if (status.accessPrivileges === "none") {
    const permission = await requestPermission();
    if (!permission.canAskAgain) {
      console.log("Trigger something to prompt a settings update");
      Alert.alert(
        "Needs Permissions",
        "The app needs access to your atleast one photo in order to use this feature",
        [{ text: "Go To Settings", onPress: () => Linking.openSettings() }]
      );
    }
    // }
  };

  const handlePress = async () => {
    await getMediaLibraryPermission();

    try {
      let allimages = await ImagePicker.launchImageLibraryAsync();
      if (!allimages.canceled) {
        console.log("Image result", allimages.assets[0].uri);
        setImage(allimages.assets[0].uri);
      }
    } catch (errors) {
      setImage(errors.message);
      console.error(errors);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <TouchableOpacity onPress={() => handlePress()}>
        <Text>Pick Image</Text>
      </TouchableOpacity>
      <Text>{image}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
