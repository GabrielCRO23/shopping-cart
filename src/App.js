import "./App.css";
import "@fontsource/roboto/400.css";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Header from "./components/Header";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

let theme = createTheme({
  palette: {
    primary: {
      main: "#76b900",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1850,
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  const [cart, setCart] = useState(0);
  const [price, setPrice] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [animation, setAnimation] = useState(0);
  const [models, setModels] = useState([]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header
            cart={cart}
            toggle={toggle}
            setToggle={setToggle}
            animation={animation}
            setAnimation={setAnimation}
          />

          <Routes>
            <Route
              path="/shopping-cart"
              element={<Home toggle={toggle} setToggle={setToggle} />}
            />
            <Route
              path="/products"
              element={
                <Shop
                  models={models}
                  setModels={setModels}
                  animation={animation}
                  setAnimation={setAnimation}
                  cart={cart}
                  setCart={setCart}
                  price={price}
                  setPrice={setPrice}
                  toggle={toggle}
                  setToggle={setToggle}
                />
              }
            />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
