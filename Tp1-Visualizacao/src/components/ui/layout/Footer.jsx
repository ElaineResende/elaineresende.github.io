import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, } from '@material-ui/core';
import { Grid, Row, Col } from 'react-flexbox-grid';

const styles = theme => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  appBar: {
    backgroundColor: '#bebebe',
    boxShadow: '0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12)',
  },
  footer: {
    width: '100%',
    color: '#000000',
  }
});

function FooterFunction(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        position="static"
      >
        <Toolbar>
          <Grid fluid className={classes.footer}>
            <Row around="sm">
              <Col sm>
                
              </Col>
              <Col sm>
                Todos os direitos reservados
              </Col>
              <Col sm>
                
              </Col>
            </Row>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export const Footer = withStyles(styles)(FooterFunction);
