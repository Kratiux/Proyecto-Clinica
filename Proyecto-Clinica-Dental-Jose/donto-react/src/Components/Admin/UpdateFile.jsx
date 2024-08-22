
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Textfield from '@material-ui/core/TextField';
/* import Link from '@material-ui/core/Link'; */
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { TextField} from '@mui/material';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from '@mui/material/InputAdornment';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      marginTop: theme.spacing(8),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(5)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    }
  }));
  
  const tfStyle = {
    background: 'white',
    color: 'black',
    borderRadius: '10px',
  };
  
  const txtBlack = {
    color: 'black'
  };



function UpdateFile() {


    const { id } = useParams();
    const history = useHistory();
    const [identification, setIdentification] = useState();
    const [names, setNames] = useState();
    const [lastName, setLastName] = useState();
    const [description, setDescription] = useState();
    const classes = useStyles();

    const [nameError, setNameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
  
    const nameRegex = /^[A-Z][a-z]*$/;
    const lastnameRegex = /^[A-Z][a-z]*$/;

    useEffect(() => {
        axios.get(`http://localhost:3001/getFile/${id}`)
            .then(result => {console.log(result)
                setIdentification(result.data.identification);
                setNames(result.data.names);
                setLastName(result.data.lastName);
                setDescription(result.data.description);


            })
            .catch(error => console.error(error));

    }, [id]);


    const Update = (e) => {
        e.preventDefault();
        let isValid = true;

        if (!nameRegex.test(names)) {
          setNameError('El nombre debe comenzar con una letra mayúscula y contener solo letras minúsculas.');
          isValid = false;
        } else {
          setNameError('');
        }
    
        if (!lastnameRegex.test(lastName)) {
          setLastnameError('El apellido debe comenzar con una letra mayúscula y contener solo letras minúsculas.');
          isValid = false;
        } else {
          setLastnameError('');
        }
    
        if (!description) {
          setDescriptionError('La descripción es obligatoria');
          isValid = false;
        } else {
          setDescriptionError(''); // Reinicia el mensaje de error si el campo es válido
        }

        if(isValid){
        axios.put(`http://localhost:3001/updateFile/${id}`, { identification, names, lastName, description })
            .then(result => {
                history.push('/Admin/DashboardPatient');
                // Manejar la respuesta o redirigir a una página de éxito
                console.log(result);
                // Puedes redirigir a una página de éxito o a donde necesites
                
            })
            .catch(error => console.error(error));
          }
    };

    return (
        <div>
        <Container component="main" style={{ maxWidth: 600 }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" style={txtBlack}>
            Editar Expediente
          </Typography>

          <form onSubmit={Update} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Textfield
                  style={tfStyle}
                  variant="filled"
                  disabled
                  fullWidth
                  id="identification"
                  label="Número de Identificación"
                  value={identification} onChange={(e) => setIdentification(e.target.value)}
                  name="identification"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                {/* {identificationError && (
                  <div style={{
                    textAlign: 'left',
                    color: '#f2a4a4',
                    fontSize: '15px',
                    fontWeight: 'normal',
                    borderRadius: '5px',
                    marginTop: '4px',
                    marginBottom: '4px',
                  }}>
                    <img src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png" style={{
                      paddingTop: '1px',
                      paddingRight: '4px',
                      width: '15px',
                    }} />
                    {identificationError}
                  </div>
                )} */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={tfStyle}
                  autoComplete="fname"
                  name="firstName"
                  variant="filled"
                  
                  fullWidth
                  id="firstName"
                  label="Primer Nombre"
                  value={names} onChange={(e) => setNames(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                  
                />
                {nameError && (
                  <div style={{
                    textAlign: 'left',
                    color: '#f2a4a4',
                    fontSize: '15px',
                    fontWeight: 'normal',
                    borderRadius: '5px',
                    marginTop: '4px',
                    marginBottom: '4px',
                  }}>
                    <img src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png" style={{
                      paddingTop: '1px',
                      paddingRight: '4px',
                      width: '15px',
                    }} />
                    {nameError}
                  </div>
                )} 
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  style={tfStyle}
                  variant="filled"
                  
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  value={lastName} onChange={(e) => setLastName(e.target.value)}
                  autoComplete="lname"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                 {lastnameError && (
                  <div style={{
                    textAlign: 'left',
                    color: '#f2a4a4',
                    fontSize: '15px',
                    fontWeight: 'normal',
                    borderRadius: '5px',
                    marginTop: '4px',
                    marginBottom: '4px',
                  }}>
                    <img src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png" style={{
                      paddingTop: '1px',
                      paddingRight: '4px',
                      width: '15px',
                    }} />
                    {lastnameError}
                  </div>
                )} 
              </Grid>

              <Grid item xs={12}>
                <TextField
                  style={tfStyle}
                  variant="filled"
                  fullWidth
                  id="description"
                  label="Descripción"
                  value={description} onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                 {descriptionError && (
                  <div style={{
                    textAlign: 'left',
                    color: '#f2a4a4',
                    fontSize: '15px',
                    fontWeight: 'normal',
                    borderRadius: '5px',
                    marginTop: '4px',
                    marginBottom: '4px',
                  }}>
                    <img src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png" style={{
                      paddingTop: '1px',
                      paddingRight: '4px',
                      width: '15px',
                    }} />
                    {descriptionError}
                  </div>
                )} 
              </Grid>


            </Grid>
            {/* {error && <div className={styles.error_msg}>{error}</div>} */}
            <Button
              onClick={Update}
              type="put"
              fullWidth
              variant="contained"
              color="primary"
              
            >
              Actualizar
            </Button>
            
          </form>
        </div>
        <Box mt={6}></Box>
      </Container>
    </div>
    );
}

export default UpdateFile;