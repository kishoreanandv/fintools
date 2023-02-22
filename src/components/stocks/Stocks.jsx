import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import Draggable from "react-draggable";

const Stocks = () => {
  const [symbol, setSymbol] = useState("");
  const [stockXvalues, setStockXvalues] = useState([]);
  const [stockYvalues, setStockYvalues] = useState([]);
  const [showGraph, setShowGraph] = useState(false);

  const key = process.env.REACT_APP_API_KEY;

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${key}`
    )
      .then((response) => response.json())
      .then((response) => {
        let keyValue = [];
        console.log(response);
        setStockXvalues(Object.keys(response["Time Series (Daily)"]));
        for (let key in response["Time Series (Daily)"]) {
          keyValue.push(response["Time Series (Daily)"][key]["1. open"]);
        }
        setStockYvalues([...keyValue]);
      })
      .catch((err) => console.error(err));
    setShowGraph(true);
  };

  const resetHandler = () => {
    setSymbol("");
    setShowGraph(false);
  };

  // useEffect(() => {
  //   fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AMZN&outputsize=compact&apikey=${key}`)
  //     .then(response => response.json())
  //     .then((response) => {
  //       let keyValue = [];
  //       setStockXvalues(Object.keys(response["Time Series (Daily)"]));
  //       for (let key in response["Time Series (Daily)"]) {
  //         keyValue.push(response["Time Series (Daily)"][key]["1. open"]);
  //       }
  //       setStockYvalues([...keyValue]);
  //     })
  //     .catch(err => console.error(err))
  //     setShowGraph(true);
  // },[])

  return (
    <Draggable>
      <Box display="flex"
      flexDirection={"column"}
      maxWidth={700}
      maxHeight={700}
      alignItems="center"
      justifyContent={"center"}
      margin="auto"
      marginTop={5}
      padding={3}
      borderRadius={5}
      boxShadow={"5px 5px 10px #ccc"}
      sx={{
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
        }}>
        <Typography variant="h5" padding={2} textAlign="center">
            Stocks Price Chart
          </Typography>
        <Stack
          marginTop={2}
          spacing={2}
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          
          <TextField
            margin="dense"
            size="small"
            label="Stock Symbol"
            variant="outlined"
            onChange={(e) => setSymbol(e.target.value)}
            value={symbol}
            required
          />
          <Button variant="contained" onClick={submitHandler}>
            Submit
          </Button>
          <Button variant="contained" onClick={resetHandler}>
            Reset
          </Button>
        </Stack>
        <Box >
          {showGraph && (
            <Plot
              data={[
                {
                  x: stockXvalues,
                  y: stockYvalues,
                  type: "scatter",
                  mode: "lines+markers",
                  marker: { color: "#1976D2" },
                },
              ]}
              layout={{
                width: 700,
                height: 500,
                title: `Showing Graph for ${symbol}`,
              }}
            />
          )}
        </Box>
      </Box>
    </Draggable>
  );
};

export default Stocks;
