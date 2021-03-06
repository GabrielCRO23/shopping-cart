import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ProductsList from "../data/ProductsList";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function ShoppingCart({
  cart,
  setCart,
  price,
  setPrice,
  models,
  setModels,
  animation,
  setAnimation,
  items,
  setItems,
}) {
  function addQuantity(index) {
    setAnimation(0);
    const values = [...models];
    values[index].quantity += 1;
    setModels(values);
    setCart(cart + 1);
    setPrice(price + values[index].price);
  }

  function checkOut() {
    alert(`You have checked out! Your total is $${price}.0`);
  }

  const renderButton = () => {
    if (models.length > 0) {
      return (
        <Button
          animation={animation}
          onClick={checkOut}
          style={{
            color: "white",
            marginTop: "5rem",
          }}
        >
          Proceed to Checkout
        </Button>
      );
    }
  };

  // takes the index of the quantity value in "models" and removes 1 to it as long as it's greater than 1. Also sets cart and price state accordingly.
  function removeQuantity(index) {
    setAnimation(0);
    const values = [...models];
    if (values[index].quantity > 1) {
      values[index].quantity -= 1;
      setModels(values);
      setCart(cart - 1);
      setPrice(price - values[index].price);
    }
  }

  function removeCartItem(index) {
    setAnimation(0);
    const values = [...models];
    setCart(cart - 1 * values[index].quantity);
    setPrice(price - values[index].price * values[index].quantity);
    values[index].quantity = 0;
    values.splice(index, 1);
    setModels(values);
  }

  // got this from stackoverflow - compares all the values of a property, sorts the lowest ones to the top and highest ones to the bottom of the list
  function sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;
      return 0;
    };
  }

  // sort the products by price lowest to highest

  function sortProducts() {
    setItems([...ProductsList], ProductsList.sort(sortByProperty("price")));
  }
  // sort the products by price highest to lowest
  function sortProductsReverse() {
    setItems(
      [...ProductsList],
      ProductsList.sort(sortByProperty("price")).reverse()
    );
  }
  return (
    <Drawer
      sx={{
        display: { xs: "none", md: "none", lg: "none", xl: "flex" },
        zIndex: 0,
        position: "relative",
        width: "20%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          backgroundColor: "black",
          color: "white",
          width: "20%",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
          gap: "1rem",
        }}
      >
        <Typography
          align="center"
          sx={{ marginTop: "5rem", fontWeight: "700" }}
        >
          Sort By Price:
        </Typography>
        <button className="drawer-button" onClick={sortProducts}>
          Lowest to Highest
        </button>
        <button className="drawer-button" onClick={sortProductsReverse}>
          Highest to Lowest
        </button>
      </Box>
      <Divider color="white" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        <Typography sx={{ fontWeight: "700", textAlign: "center" }}>
          Cart
        </Typography>
        <Typography
          className={"drawer-cart"}
          animation={animation}
          sx={{
            display: "flex",

            fontWeight: "700",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        >
          {cart}
        </Typography>
        <Divider
          className={"drawer-cart"}
          animation={animation}
          orientation="vertical"
          color="white"
          flexItem
        ></Divider>
        <Typography
          className={"drawer-cart"}
          animation={animation}
          sx={{ marginLeft: "1rem" }}
        >
          ${price.toFixed(2)}
        </Typography>
      </Box>
      <Divider color="white" />
      {models.map((model, index) => (
        <React.Fragment key={index}>
          <Box sx={{ display: "flex" }}>
            <Button
              onClick={(event) => removeCartItem(index)}
              startIcon={<HighlightOffIcon />}
            ></Button>
            <li style={{ marginLeft: "auto" }}>
              {model.model}
              <Button
                onClick={(event) => addQuantity(index)}
                sx={{ color: "#fff" }}
                startIcon={<AddIcon />}
              ></Button>
              <Button
                onClick={(event) => removeQuantity(index)}
                sx={{ color: "#fff", width: "20px" }}
                startIcon={<RemoveIcon />}
              ></Button>
              Quantity: {model.quantity}
            </li>
          </Box>
          <Divider color="white" />
        </React.Fragment>
      ))}
      {renderButton()}
    </Drawer>
  );
}

export default ShoppingCart;
