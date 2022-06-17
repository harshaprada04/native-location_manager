import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import moment from "moment";
import { Button } from "react-native-paper";
import { Context } from "../../Context/ContextProvider";
import { getLocationDetails } from "../../action/locationDetails";
import { postLocation } from "../../action/postLocation";

function HomePage() {
  const [errorMsg, setErrorMsg] = useState("");
  const context: any = useContext(Context);

  const locationFetecher = async () => {
    let longitude;
    let latitude;
    context.setTime((prevRes: any) => {
      return [...prevRes, moment().format("HH:mm:ss")];
    });
    context.setDate((prevRes: any) => {
      return [...prevRes, moment().format("MM/DD/YYYY")];
    });
    if (context.location?.length > 0) {
      let response = await getLocationDetails(
        context.location.latitude,
        context.location.longitude
      );
      await context.setLocationDetails(response.data.results);
      await context.setCurrentLocation(response.data.results);
      postLocation(response.data.results, moment().format("HH:mm:ss"));
    } else {
      const getLocation = require("expo-location");

      let { status } = await getLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location: any = await getLocation.getCurrentPositionAsync({});
      longitude = await location.coords.longitude;
      latitude = await location.coords.latitude;
    }
    context.setCurrentLocation([]);
    getLocationDetails(longitude, latitude).then((response: any) => {
      context.setLocationDetails((prevRes: any) => {
        return [...prevRes, ...response.data.results];
      });
      context.setCurrentLocation(response.data.results);
      postLocation(
        response.data.results[0].formatted,
        moment().format("HH:mm:ss")
      );
    });
  };

  const locationUpdater = async () => {
    if (context.locationDetails?.length > 29) {
      await context.locationDetails?.shift();
      await context.time.shift();
      locationFetecher();
    } else {
      locationFetecher();
    }
  };

  const removeAllHandler = () => {
    context.setLocationDetails([]);
    context.setCurrentLocation([]);
    context.setTime([]);
    context.setDate([]);
  };

  const removeLocationHandler = (id: number) => {
    context.setCurrentLocation();
    context.setLocationDetails(
      context.locationDetails?.filter((data: any, index: number) => {
        return index !== id;
      })
    );
    context.setTime(
      context.time?.filter((data: any, index: number) => {
        return index !== id;
      })
    );
    context.setDate(
      context.date?.filter((data: any, index: number) => {
        return index !== id;
      })
    );
  };

  useEffect(() => {
    if (context.locationDetails?.length === 0) {
      locationUpdater();
    } else {
      const timer = setInterval(() => {
        locationUpdater();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [context.locationDetails]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Location Manager</Text>
        </View>
        <View>
          <Text testID="list-current-label" style={styles.current}>
            Current Location
          </Text>
        </View>
        <View style={styles.box_alignment} testID="list-current-item">
          <View style={styles.box} testID="list-current-icon">
            <Text style={styles.box_text}>NA</Text>
          </View>
          <View style={styles.location}>
            <View>
              <Text
                testID="list-current-name"
                style={styles.location_text}
                numberOfLines={1}
              >
                {context.currentLocation?.length > 0
                  ? context.currentLocation[0]?.formatted
                  : "Wait location is loading.."}
              </Text>
            </View>
            <View>
              <Text style={styles.time} testID="list-current-time">
                {moment().format("MM/DD/YYYY")}, {moment().format("HH:mm:ss")}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.current}>Previous Location</Text>
        </View>
        <View style={styles.location_list}>
          <FlatList
            data={context.locationDetails}
            renderItem={(itemdata) => {
              return (
                <View style={styles.location_data}>
                  <View style={styles.location_line}>
                    <Text
                      testID={`List-previous-name-${itemdata.index}`}
                      style={styles.location_name}
                      numberOfLines={1}
                    >
                      {itemdata.item.formatted}
                    </Text>
                    <Text
                      testID={`List-previous-time-${itemdata.index}`}
                      style={styles.time}
                    >
                      {context.date[itemdata.index]},
                      {context.time[itemdata.index]}
                    </Text>
                  </View>
                  <View>
                    <Button
                      testID={`list-previous-remove-${itemdata.index}`}
                      labelStyle={{ fontSize: 12 }}
                      style={styles.remove_btn}
                      uppercase={false}
                      mode="outlined"
                      onPress={() => {
                        removeLocationHandler(itemdata.index);
                      }}
                    >
                      Remove
                    </Button>
                  </View>
                </View>
              );
            }}
            keyExtractor={() => Math.random().toString(36).slice(2, 7)}
          />
        </View>
      </View>
      <View style={styles.removeAll_btn}>
        <Button
          testID="list-clear-all-button"
          uppercase={false}
          mode="contained"
          onPress={() => {
            removeAllHandler();
          }}
        >
          Clear All
        </Button>
      </View>
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
  header: {
    flex: 2,
  },
  heading: {
    color: "#111",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  current: {
    color: "#555",
    fontSize: 16,
    marginTop: 20,
  },
  box_alignment: {
    display: "flex",
    flexDirection: "row",
  },
  box: {
    backgroundColor: "orange",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  box_text: {
    color: "white",
    fontSize: 18,
  },
  location_list: {
    flex: 5,
    marginTop: 15,
  },
  location: {
    marginTop: 15,
    marginLeft: 5,
  },
  location_text: {
    color: "#444",
    fontWeight: "bold",
    fontSize: 16,
    width: 250,
  },
  time: {
    color: "#555",
    fontSize: 14,
  },
  previous: {
    marginTop: 10,
  },
  location_data: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  location_name: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 16,
    width: 200,
  },
  location_line: {
    display: "flex",
    flexDirection: "column",
  },
  remove_btn: {
    marginLeft: 10,
    width: 100,
  },
  removeAll_btn: {
    zIndex: 1,
    marginBottom: 15,
    width: 120,
  },
});
export default HomePage;
