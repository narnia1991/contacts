import { Paper } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { createTheme, ThemeOptions } from "@mui/system";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddContact from "./components/pages/AddContact";
import ContactList from "./components/pages/ContactList";
import EditContact from "./components/pages/EditContact";
import Todo from "./components/pages/Todo";
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
      <Paper className="bg-sky-800 m-0 p-4 rounded-none h-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/populate" element={<Populate />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/" element={<ContactList />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/:dataId/edit" element={<EditContact />} />
          </Routes>
        </BrowserRouter>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
