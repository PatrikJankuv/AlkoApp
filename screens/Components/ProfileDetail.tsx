import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../src/components/Button";
import { Containers } from "../../src/components/styles/containers";
import DividerVertical from "../../src/components/layout/DividerVertical";

const windowWidth = Dimensions.get("window").width;
const cameraHeight = windowWidth * 1.333;

let camera: Camera;

export function ProfileDetails({ logout }) {
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState<any>(null);
  const [cameraType, setCameraType] = React.useState(
    Camera.Constants.Type.back
  );

  React.useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const url = await AsyncStorage.getItem("@photo_uri");
      const album = await MediaLibrary.getAlbumAsync("AlkoApp");
      const image = await MediaLibrary.getAssetsAsync({
        album: album,
        sortBy: ["creationTime"],
      });
      setCapturedImage(image.assets[0]);
    } else {
      alert("Permision denied");
    }
  };

  const __savePhoto = () => {
    setStartCamera(false);
  };
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      await MediaLibrary.createAlbumAsync("AlkoApp", asset);
    } else {
      alert("Oh no permission denied");
    }
  };

  const __switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };

  return (
    <View>
      {startCamera ? (
        <View
          style={{
            width: "100%",
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={__savePhoto}
              retakePicture={__retakePicture}
            />
          ) : (
            <Camera
              type={cameraType}
              style={{ width: windowWidth, height: cameraHeight }}
              ref={(r) => {
                camera = r;
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  padding: 20,
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={__switchCamera}
                  style={{
                    marginTop: 20,

                    height: 25,
                    width: 25,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                    }}
                  >
                    {cameraType === "front" ? "🤳" : "📷"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={__savePhoto}
                  style={{
                    marginTop: 20,

                    height: 25,
                    width: 100,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View style={Containers.ContainerCenter}>
          {capturedImage === null ? null : (
            <Image
              source={{
                uri: capturedImage.uri,
              }}
              style={styles.preview}
            />
          )}
          <DividerVertical space={40} />
          <TouchableOpacity>
            <Button
              title="Vyfotit profilový obrázek"
              onPress={__startCamera}
              variant="primary"
            />
          </TouchableOpacity>
          <DividerVertical space={70} />
          <TouchableOpacity>
            <Button title="Odhlásit" onPress={logout} variant="default" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    marginLeft: "20%",
    width: "60%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    width: "60%",
    marginLeft: "20%",
    padding: 10,
    margin: 10,
  },
  validation: {
    color: "#ff0000",
    fontWeight: "bold",
    textAlign: "center",
  },
  preview: {
    alignItems: "center",
    marginLeft: "25%",
    height: "50%",
    width: "50%",
  },
});

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  return (
    <View
      style={{
        // backgroundColor: "transparent",
        width: windowWidth,
        height: cameraHeight,
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
