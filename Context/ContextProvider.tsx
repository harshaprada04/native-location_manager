import React, { createContext, useState } from "react";
import { View } from "react-native";

export const Context = createContext({
  location: [],
  locationDetails: [],
  time: [],
  date: [],
  currentLocation: [],
  setLocationDetails: (a: any) => {},
  setTime: (a: any) => {},
  setDate: (a: any) => {},
  setLocation: (a: any) => {},
  setCurrentLocation: (a: any) => {},
});

function ContextProvider({ children }: any) {
  const [location, setLocation] = useState([]);
  const [locationDetails, setLocationDetails] = useState<any>([]);
  const [time, setTime] = useState<any>([]);
  const [date, setDate] = useState<any>([]);
  const [currentLocation, setCurrentLocation] = useState<any>([]);

  const context: any = {
    location,
    locationDetails,
    time,
    date,
    currentLocation,
    setLocationDetails,
    setTime,
    setDate,
    setCurrentLocation,
    setLocation,
  };

  return (
    <View style={{ flex: 1 }}>
      <Context.Provider value={context}>{children}</Context.Provider>
    </View>
  );
}

export default ContextProvider;
