import { Box, Button, FilledInput, FormControl, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ResumatorRedux } from './resumatorRedux';
export function ContactInfo() {
    const dispatch = useDispatch();
    const dispatchTitle = React.useCallback(
        () => {
            dispatch(ResumatorRedux.actions.setCurrentPageTitle('Contact Information'));
        }, [dispatch])

    const values = useSelector(ResumatorRedux.selectors.selectCandidate);
    console.log(values);
    React.useEffect(dispatchTitle, []);
    const handleChange = () => { };
    return (
        <div>

            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <div>
                    <TextField value={values.firstName} label="First Name" id="firstName" sx={{ m: 1, width: '25ch' }} variant="filled" />
                    <TextField value={values.middleName} label="Middle Name" id="middleName" sx={{ m: 1, width: '25ch' }} variant="filled" />
                    <TextField value={values.lastName} label="Last Name" id="lastName" sx={{ m: 1, width: '25ch' }} variant="filled" />

                </div>
                <div>

                    <TextField
                        label="Phone Number"
                        id="phoneNumber"
                        value={values.phoneNumber}
                        sx={{ m: 1, width: '25ch' }}
                        variant="filled"
                    />
                    <TextField
                        label="Location"
                        id="location"
                        value={values.location}
                        sx={{ m: 1, width: '50ch' }}
                        variant="filled"
                    />
                </div>
                <div>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="email">email</InputLabel>
                        <FilledInput
                            id="email"
                            value={values.email}
                            onChange={handleChange('email')}
                            label="Email"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="linkedIn">LinkedIn</InputLabel>
                        <FilledInput
                            id="linkedIn"
                            value={values.linkedIn}
                            onChange={handleChange('linkedIn')}
                            label="LinkedIn Url"
                            startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="gitHub">GitHub</InputLabel>
                        <FilledInput
                            id="gitHub"
                            value={values.gitHub}
                            onChange={handleChange('gitHub')}
                            label="GitHub Url"
                            startAdornment={<InputAdornment position="start">https://</InputAdornment>}
                        />
                    </FormControl>
                </div>

            </Box>
            <div>
                <Button variant="contained">Save</Button>
            </div>
        </div>
    )
}