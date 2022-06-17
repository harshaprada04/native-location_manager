import "@testing-library/react-native";
import { render } from "@testing-library/react-native";
import ContextProvider from "./ContextProvider";

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

test("",()=>{
    render(<ContextProvider/>)
})