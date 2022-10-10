import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { Card } from 'react-bootstrap';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container } from '@mui/material';

export default function Login() {

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  // Handle login button submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
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
                      value={formState.email}
                      onChange={handleChange}
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
                      value={formState.password}
                      onChange={handleChange}
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
                  {error && <div>Login failed</div>}
                </div>
              </Container>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}