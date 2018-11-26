import React from 'react';
import { ListItem, ListItemText, List, Drawer, Divider } from '@material-ui/core';
import { NavLink } from 'react-router-dom'

export const Menu = (props) =>
  <Drawer open={props.drawerOpen} onClose={props.handleToggle}>
    <div
      tabIndex={0}
      role="button"
      onTouchTap={props.handleToggle}
      onKeyDown={props.handleToggle}
    >
      <List>
        <ListItem button component={NavLink} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={NavLink} to="/todos">
          <ListItemText primary="Todos Graficos" />
        </ListItem>
        <Divider />
        {/* <ListItem button component={NavLink} to="/grafico1">
          <ListItemText primary="Por presidente" />
        </ListItem>
        <ListItem button component={NavLink} to="/grafico2">
          <ListItemText primary="Partidos mais votados" />
        </ListItem>
        <ListItem button component={NavLink} to="/grafico3">
          <ListItemText primary="Votos por partidos" />
        </ListItem> */}
      </List>
    </div>
  </Drawer>
  ;
