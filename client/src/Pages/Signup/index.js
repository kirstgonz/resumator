import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Container } from '@mui/material';
import { Card } from 'react-bootstrap';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

export default function Signup() {

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle sign up form submit
	const handleSubmit = async (event) => {
		event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
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
                          name="username"
                          variant="outlined"
                          required
                          fullWidth
                          id="username"
                          label="Your Username"
                          autoFocus
                          value={formState.username}
                          onChange={handleChange}
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
                          value={formState.email}
                          onChange={handleChange}
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
                          value={formState.password}
                          onChange={handleChange}
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