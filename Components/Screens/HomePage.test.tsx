import "@testing-library/react-native";
import { fireEvent, render } from "@testing-library/react-native";
import { Context } from "../../Context/ContextProvider";
import HomePage from "./HomePage";
import moment from "moment";

describe("location details is empty", () => {
  jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
  const context: any = {
    setTime: jest.fn(),
    setDate: jest.fn(),
    setLocation: jest.fn(),
    setLocationDetails: jest.fn(),
    setCurrentLocation: jest.fn(),
  };
  test("render", () => {
    const test = render(<HomePage />);
  });
  test("render", async () => {
    const test = render(
      <Context.Provider value={context}>
        <HomePage />
      </Context.Provider>
    );
    const getLocation = require("expo-location");

    expect(test.getByTestId("list-current-label")).toBeDefined();
  });
});

describe("location details is not empty", () => {
  jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
  jest.setTimeout(20000);
  const context: any = {
    location: [{ longitude: 72, latitude: 12 }],
    locationDetails: Array.from({ length: 30 }, () =>
      Math.floor(Math.random() * 30)
    ),
    currentLocation: [{ formatted: "India" }],
    date: [moment().format("DD/MM/YYYY"), moment().format("DD/MM/YYYY")],
    time: [moment().format("HH:mm:ss"), moment().format("DD/MM/YYYY")],
    setTime: jest.fn(),
    setDate: jest.fn(),
    setLocation: jest.fn(),
    setLocationDetails: jest.fn(),
    setCurrentLocation: jest.fn(),
  };

  test("render", async () => {
    const test = render(
      <Context.Provider value={context}>
        <HomePage />
      </Context.Provider>
    );
    await new Promise((r) => setTimeout(r, 13000));
    const removeBtn = test.getByTestId("list-previous-remove-0");
    fireEvent.press(removeBtn);

    const removeAllBtn = test.getByTestId("list-clear-all-button");
    fireEvent.press(removeAllBtn);
  });
});
