import React from "react";
import Lumpsum from "../lumpsum/Lumpsum";
import Sip from "../sip/Sip";
import Stocks from "../stocks/Stocks";
import { Grid, Box, Stack, Button,Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useAuth0 } from "@auth0/auth0-react";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Home = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  return (
    <Box>   

      {isAuthenticated ? (
        <> <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
        
         
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt={user.name} src={user.picture} />
          </StyledBadge>
          <Button variant="outlined" onClick={() => logout()}>
            Logout
          </Button>
      
        </Stack>
          <Grid container>
            <Grid item xs={12} sm={12} md={6}>
              <Lumpsum />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Sip />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Stocks />
            </Grid>
          </Grid>    </>
      ) : <Box
        display='flex'
        flexDirection={'column'}
        minHeight={'100vh'}
        alignItems="center"
          justifyContent={"center"}
        >
          <Typography variant="h2" padding={2} textAlign="center">
          WELCOME, TO FINTOOLS
        </Typography>
          <Button variant="contained" onClick={() => loginWithRedirect()}>
            Login
          </Button>
        </Box>}
    </Box>
  );
};

export default Home;
