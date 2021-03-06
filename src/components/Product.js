import React from "react";
import Typography from "@mui/material/Typography";

function Product({ price, model, source }) {
  return (
    <div>
      <img
        style={{
          display: "flex",
          margin: "auto",
          height: "200px",
          width: "auto",
        }}
        src={source}
      ></img>
      <Typography align="center" color="white">
        {model}
      </Typography>
      <Typography align="center" color="white">
        ${price}.
        <span style={{ fontSize: "12px", verticalAlign: "3px" }}>00</span>
      </Typography>
    </div>
  );
}

export default Product;
