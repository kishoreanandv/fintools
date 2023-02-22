import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import Draggable from "react-draggable";
import "./Lumpsum.css";

const Lumpsum = () => {
  const [amount, setAmount] = useState("");
  const [intrest, setIntrest] = useState("");
  const [years, setYears] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [showValues, setShowValues] = useState(false);

  const handleLumpSumForm = (e) => {
    e.preventDefault();
    setFinalValue(lumpsumcalc());
    setShowValues(true);
  };

  const handleResetLumpSumForm = () => {
    setAmount("");
    setIntrest("");
    setYears("");
    setShowValues(false);
  };

  const lumpsumcalc = () =>
    (amount * Math.pow(1 + intrest / 100, years)).toFixed(2);

  return (
    <Draggable>

    <Box
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
        LumpSum Calculator
      </Typography>
      <TextField
        margin="dense"
        size="small"
        label="LumpSum Amount"
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
      />
      <Stack
      marginTop={2}  
        spacing={2}
        direction="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <Button variant="contained" onClick={handleLumpSumForm}>
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

      {/* <label>Enter LumpSum Amount: 
          <input onChange={(e) => setAmount(e.target.value)} value={amount}  />
        </label>
        <label>Enter Expected  Intrest Rate : 
          <input onChange={(e)=>setIntrest(e.target.value) } value={intrest}/>
        </label>        
        <label>No Of Years: 
          <input onChange={(e)=>setYears(e.target.value) } value={years}/>
        </label>
        <button>Check</button>
        {showValues ?
          <>          
        <p>AMount Entered: {amount}</p>
        <p>Total Value: {finalValue}</p>
            <p>Intrest value: {(finalValue - amount).toFixed(2)}</p>
            </> : null} */}
      </Box>
      </Draggable>

  );
};

export default Lumpsum;
