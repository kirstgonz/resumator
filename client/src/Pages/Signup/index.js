import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container } from '@mui/material';
import { Card } from 'react-bootstrap';

export default function Signup() {

  // Handle sign up form submit
	const handleSubmit = async (event) => {
		event.preventDefault();
	};

  //Signup JSX starts here
  return (
    <>
      <div className="background-img">
        <div className="d-flex justify-content-center my-auto">

          {/* Sign up form card */}
          <Card
            className="shadow z-depth-8 card-border mx-2 mb-3" style={{ width: '30rem' }}>
            <Card.Body>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div>
                  <Avatar></Avatar>
                  <Typography component="h1" variant="h5">Sign Up</Typography>

                  {/* Add Validation code here */}

                  <form onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        {/* Firstname input */}
                        <TextField
                          autoComplete="fname"
                          name="firstname"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        {/* Lastname input */}
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastname"
                          autoComplete="lname"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {/* Email Input */}
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {/* Password Input */}
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {/* Confirm Password input */}
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          id="confirmPassword"
                          autoComplete="current-password"
                        />
                      </Grid>
                    </Grid>
                    {/* Submit button */}
                    <Button type="submit" fullWidth variant="contained" color="primary">Sign Up</Button>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link href="/login" variant="body2">
                          Resumator User? Login
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