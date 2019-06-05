import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {
  const classes = useStyles();
  var [emailNull, SetemailNull] = useState(0);
  var [passwordNull, SetpasswordNull] = useState(0);

  function changingOnChange(e) {
    if (e.target.id === "password") {
      SetpasswordNull((passwordNull = 0));
    } else {
      console.log("changing email start");
      SetemailNull((emailNull = 0));
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={emailNull}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={changingOnChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={passwordNull}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={changingOnChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={async () => {
              console.log(window.location);
              if (document.getElementById("email").value === "")
                SetemailNull(prevState => ({
                  emailNull: 1
                }));
              if (document.getElementById("password").value === "")
                SetpasswordNull(prevState => ({
                  passwordNull: 1
                }));
              if (
                document.getElementById("password").value === "" ||
                document.getElementById("email").value === ""
              )
                return;

              console.log("password : " + emailNull);
              var result = await axios.post(
                "https://frozen-shelf-75821.herokuapp.com/acc/login ",
                {
                  userName: document.getElementById("email").value,
                  password: document.getElementById("password").value
                }
              );
              console.log("The result value is : " + result.data);
              if (result.data === true) {
                window.location.href = window.location + "stocks/";
              } else {
                swal(
                  "Authentication Error",
                  "Please enter the valid Credentials",
                  "error"
                );
              }
            }}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5} />
    </Container>
  );
}
