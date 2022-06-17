import React, { useContext } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { Context } from "../../Context/ContextProvider";

function Map() {
  const context: any = useContext(Context);

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

  return (
    <View style={styles.container} testID="Map View">
      <View>
        <Text style={styles.current}>Location History</Text>
      </View>
      <View style={styles.location_list}>
        <FlatList
          data={context.locationDetails}
          renderItem={(itemdata) => {
            return (
              <View style={styles.location_data}>
                <View style={styles.location_line}>
                  <Text style={styles.location_name} numberOfLines={1}>
                    {itemdata.item.formatted}
                  </Text>
                  <Text style={styles.time}>
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
  current: {
    color: "#111",
    fontSize: 20,
    marginTop: 20,
    marginLeft: "-50%",
    fontWeight: "bold",
  },
});

export default Map;
