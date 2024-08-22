import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
/* import DashboardIcon from '@mui/icons-material/Dashboard'; */
import PeopleIcon from '@mui/icons-material/People';
import WebIcon from '@mui/icons-material/Web';
import LogoutIcon from '@mui/icons-material/Logout';
/* 
import ArticleIcon from '@mui/icons-material/Article'; */
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from '@material-ui/core/Link';

export const mainListItems = (
  <div>
    <Link href='./DashboardScheduler'>
      <ListItem button>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Citas" />
      </ListItem>
    </Link>
    <Link href='./Dashboard'>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Pacientes" />
      </ListItem>
    </Link>
    <Link href='./DashboardPatient'>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Expedientes" />
      </ListItem>
    </Link>
    <Link href='./DashboardBlog'>
      <ListItem button>
        <ListItemIcon>
          <WebIcon />
        </ListItemIcon>
        <ListItemText primary="Blog" />
      </ListItem>
    </Link>
    <Link href='/'>
      <ListItem button>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Cerrar Sesión" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Expedientes Recientes</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Carlos Mora" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Fernanda Castillo" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Alejandro Solis" />
    </ListItem>
  </div>
);