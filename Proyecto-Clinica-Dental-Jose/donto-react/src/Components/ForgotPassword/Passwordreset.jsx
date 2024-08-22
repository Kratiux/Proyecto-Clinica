import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import Snackbar from '@mui/material/Snackbar';
// import Slide, { SlideProps } from '@mui/material/Slide';
// import Fade from '@mui/material/Fade';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


// function SlideTransition(props) {
//   return <Slide {...props} direction="up" />;
// }


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



function ResetPassword() {
  const classes = useStyles();
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // const [state, setState] = React.useState({
  //   open: false,
  //   Transition: Fade,
  // });

  // const handleClick = (Transition) => () => {
  //   setState({
  //     open: true,
  //     Transition,
  //   });
  // };
  
  // const handleClose = () => {
  //   setState({
  //     ...state,
  //     open: false,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Llamar a la ruta en tu servidor para cambiar la contraseña
    axios.post('https://api.clinicadentalsofiacastro.com/change-password', { newPassword: password })
      .then(response => {
        // Manejar la respuesta del servidor
        history.push('/Signin/signin'); // Redirige a la página de inicio de sesión
        Swal.fire({
          title: 'Contraseña actualizada',
          text: 'Tu contraseña se ha actualizado correctamente.',
          icon: 'success',
        });
      })
      .catch(error => {
        // Manejar errores
        console.error('Error al cambiar la contraseña:', error);
        history.push('/Signin/signin');
        Swal.fire({
          title: 'Contraseña actualizada',
          text: 'Tu contraseña se ha actualizado correctamente.',
          icon: 'success',
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Cambiar Contraseña
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error !== ''}
            helperText={error}
          />
          <Button
            // href="/SignIn/signIn"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={handleClick(SlideTransition)}
          >
            Cambiar Contraseña
          </Button>
          {/* <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message="La contraseña se actualizó correctamente"
        key={state.Transition.name}
        autoHideDuration={1200}
      /> */}
        </form>
      </div>
      <Box mt={8}>
        {/* Footer */}
      </Box>
    </Container>
  );
}

export default ResetPassword;