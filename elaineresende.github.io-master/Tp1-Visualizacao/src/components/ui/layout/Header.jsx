import React from 'react';
/*import { white } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { MenuIcon } from '@material-ui/icons/Menu';*/
import { white } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/icons/Menu';
import red from '@material-ui/core/colors/red';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  appBar: {
    backgroundColor: theme.palette.primary[800],
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12)',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: 'white',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
});

function Header(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        /*style={{ backgroundColor: 'transparent' }}*/
        position="static">
        <Toolbar>
          {props.iconLeft === true ?
            <IconButton
              onClick={props.handleToggle}
              className={classes.menuButton}
              aria-label="Menu"
            >
              <Menu color={white} />
            </IconButton> : <div />}
          <Typography type="title" color="inherit" className={classes.flex}>
            {props.title}
          </Typography>
          <div className="userInfoNew">
          ?
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Header);
