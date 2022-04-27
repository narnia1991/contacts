import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { createTheme, ThemeOptions } from "@mui/system";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddContact from "./components/pages/AddContact";
import ContactList from "./components/pages/ContactList";
import EditContact from "./components/pages/EditContact";
import Todo from "./components/pages/Todo";
import ViewContact from "./components/pages/ViewContact";
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
      <Box className="m-0 p-4 rounded-none h-max bg-sky-800">
        <BrowserRouter>
          <Routes>
            <Route path="/populate" element={<Populate />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/" element={<ContactList />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/:dataId" element={<ViewContact />} />
            <Route path="/:dataId/edit" element={<EditContact />} />
            <Route path="/:dataId/delete" element={<EditContact />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
