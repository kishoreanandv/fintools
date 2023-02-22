import "./Sip.css";
import React, { useState } from "react";
import Draggable from "react-draggable";

import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";

const Sip = () => {
  const [amount, setAmount] = useState("");
  const [intrest, setIntrest] = useState("");
  const [years, setYears] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [showValues, setShowValues] = useState(false);




   const months = years * 12;
   const monthlyIntrestRate = years / 12 / 100;
    

 
  

  //if given years then change to months and use
  //if given months directly no chnage

  const handleSipForm = (e) => {
    e.preventDefault();
    setFinalValue(sipcalc());
    setShowValues(true);
  };

  const handleResetLumpSumForm = () => {
    setAmount("");
    setIntrest("");
    setYears("");
    setShowValues(false);
  };

  const sipcalc = () =>
    (
      (amount *
        (1 + monthlyIntrestRate) *
        (Math.pow(1 + monthlyIntrestRate, months) - 1)) /
      monthlyIntrestRate
    ).toFixed(2);

  return (
    <Draggable>
    <Box
      backGround="red"
      display="flex"
      flexDirection={"column"}
      maxWidth={300}
      maxHeight={350}
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
      }}
    >
      <Typography variant="h5" padding={2} textAlign="center">
        SIP Calculator
      </Typography>

      <TextField
        margin="dense"
        size="small"
        label="SIP Amount"
        variant="outlined"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        required
      />
      <TextField
        margin="dense"
        size="small"
        label="Intrest Rate"
        variant="outlined"
        onChange={(e) => setIntrest(e.target.value)}
        value={intrest}
        required
      />

      <TextField
        margin="dense"
        size="small"
        label="Years"
        variant="outlined"
        onChange={(e) => setYears(e.target.value)}
        value={years}
        required
        helperText='Enter in Years and In Integers'
      />

      <Stack
        marginTop={2}
        spacing={2}
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Button variant="contained" onClick={handleSipForm}>
          Submit
        </Button>
        <Button variant="outlined" onClick={handleResetLumpSumForm}>
          Reset
        </Button>
      </Stack>

      {showValues ? (
        <Box marginTop={2}>
          <Typography variant="subtitle1" textAlign="center">
            Amount: {amount}
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            Total Value: {finalValue}
          </Typography>
          <Typography variant="subtitle1" textAlign="center">
            Intrest value: {(finalValue - amount).toFixed(2)}
          </Typography>
        </Box>
      ) : null}
      </Box>
    </Draggable>
      
  );
};

export default Sip;
