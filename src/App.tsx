import { ThemeProvider } from "@mui/styles";
import { createTheme, ThemeOptions } from "@mui/system";
import IButton from "./components/common/button/Button";
import IInput from "./components/common/textInput/TextInput";
import { primary } from "./variables";

export const themeOptions: ThemeOptions = {
  spacing: 4,
  palette: {
    type: "light",
    primary: {
      main: primary,
    },
  },
};

const theme = createTheme(themeOptions);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <IButton text="Click me" />
        <IInput name="name" value="value" label="label" error="Invalid Input" />
      </div>
    </ThemeProvider>
  );
};

export default App;
