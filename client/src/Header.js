import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { ResumatorRedux } from './resumatorRedux';
import Auth from "../src/utils/auth";
import { Button } from '@mui/material';

const lightColor = 'rgba(255, 255, 255, 0.7)';

function Header(props) {
  const { onDrawerToggle } = props;

  const title = useSelector(ResumatorRedux.selectors.selectPageTitle);

  return (
    <React.Fragment>

      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <div>
                <div>
                  <Typography color="inherit" variant="h5" component="h1">
                    {title}
                  </Typography>
                </div>
                <div>
                  <Button onClick={() => Auth.logout()} variant="contained" sx={{ float: 'right' }}>Logout</Button>
                </div>
              </div>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;