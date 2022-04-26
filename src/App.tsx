import { ThemeProvider } from "@mui/styles";
import { createTheme, ThemeOptions } from "@mui/system";
import ContactForm from "./components/pages/ContactForm";
import ContactList from "./components/pages/ContactList";
import Populate from "./seed/Populate";
import { primary } from "./variables";

export const themeOptions: ThemeOptions = {
  spacing: 4,
  palette: {
    type: "light",
    primary: {
      main: primary,
    },
  },
  shadows: Array(25).fill("none"),
};

const theme = createTheme(themeOptions);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ContactList />
    </ThemeProvider>
  );
};

export default App;
