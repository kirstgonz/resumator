import * as React from 'react';
import { Card } from 'react-bootstrap';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container } from '@mui/material';

export default function Login() {

  // Handle login button submit
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  //Login Jsx
  return (

    <>
      <div className="background-img">
        {/* Login Form starts here*/}
        <div className="d-flex justify-content-center my-auto">

          <Card className="shadow z-depth-8 card-border" style={{ width: '25rem' }} >
            <Card.Body>
              <Container component="main-body" maxWidth="xs">
                <CssBaseline />
                <div >
                  <Avatar ></Avatar>
                  <Typography component="h1" variant="h5">Login</Typography>

                  {/* Need to add Validation alert */}

                  <form onSubmit={handleSubmit} noValidate>

                    {/* Email Input */}
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                    />

                    {/* Password input */}
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />

                    {/* Login Button */}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"

                    >Login</Button>

                    <Grid container>
                      <Grid item xs></Grid>
                      <Grid item>
                        <Link href="/signup" variant="body2">
                          {
                            "New to Resumator? Sign Up"
                          }
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Container>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}