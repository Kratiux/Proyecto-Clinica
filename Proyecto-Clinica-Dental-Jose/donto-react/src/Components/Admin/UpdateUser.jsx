
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

function UpdateUser() {
    const { id } = useParams();
    const history = useHistory();
    const [identification, setIdentification] = useState();
    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [birthday, setBirthday] = useState();
    const [gender, setGender] = useState();
    const [province, setProvince] = useState('');
    const [canton, setCanton] = useState('');
    const [distrit, setDistrit] = useState('');
    const classes = useStyles();

    useEffect(() => {
        axios.get(`http://localhost:3001/getUser/${id}`)
            .then(result => {console.log(result)
                setIdentification(result.data.identification);
                setName(result.data.name);
                setLastName(result.data.lastName);
                setEmail(result.data.email);
                setPhone(result.data.phone);
                setBirthday(result.data.birthday);
                setGender(result.data.gender);
                setProvince(result.data.province);
                setCanton(result.data.canton);
                setDistrit(result.data.distrit);


            })
            .catch(error => console.error(error));

    }, [id]);


    const Update = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/updateUser/${id}`, { identification, name, lastName, email, phone, birthday, gender, province, canton, distrit})
            .then(result => {
                history.push('/Admin/Dashboard');
                // Manejar la respuesta o redirigir a una página de éxito
                console.log(result);
                // Puedes redirigir a una página de éxito o a donde necesites
                
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
        <Container component="main" style={{ maxWidth: 600 }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" style={txtBlack}>
            Editar Usuario
          </Typography>

          <form onSubmit={Update} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Textfield
                  style={tfStyle}
                  variant="filled"
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
                  value={name} onChange={(e) => setName(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                  
                />
                {/* {nameError && (
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
                )} */}
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
                {/* {lastnameError && (
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
                )} */}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  style={tfStyle}
                  variant="filled"
                  fullWidth
                  id="email"
                  label="Correo"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                {/* {phoneError && (
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
                    {phoneError}
                  </div>
                )} */}
              </Grid>

             
              <Grid item xs={12}>
                <TextField
                  style={tfStyle}
                  variant="filled"
                  fullWidth
                  id="phone"
                  label="Teléfono"
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  name="phone"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                {/* {phoneError && (
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
                    {phoneError}
                  </div>
                )} */}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  style={tfStyle}
                  variant="filled"
                  fullWidth
                  id="birthday"
                  label="Fecha de nacimiento"
                  value={birthday} onChange={(e) => setBirthday(e.target.value)}
                  name="birthday"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                {/* {phoneError && (
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
                    {phoneError}
                  </div>
                )} */}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  style={tfStyle}
                  variant="filled"
                  fullWidth
                  id="gender"
                  label="Género"
                  value={gender} onChange={(e) => setGender(e.target.value)}
                  name="gender"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                {/* {phoneError && (
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
                    {phoneError}
                  </div>
                )} */}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  style={tfStyle}
                  variant="filled"
                  fullWidth
                  id="province"
                  label="Provincia"
                  value={province} onChange={(e) => setProvince(e.target.value)}
                  name="province"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                {/* {phoneError && (
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
                    {phoneError}
                  </div>
                )} */}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  style={tfStyle}
                  variant="filled"
                  fullWidth
                  id="canton"
                  label="Cantón"
                  value={canton} onChange={(e) => setCanton(e.target.value)}
                  name="canton"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                {/* {phoneError && (
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
                    {phoneError}
                  </div>
                )} */}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  style={tfStyle}
                  variant="filled"
                  fullWidth
                  id="distrit"
                  label="Distrito"
                  value={distrit} onChange={(e) => setDistrit(e.target.value)}
                  name="distrit"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
                {/* {phoneError && (
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
                    {phoneError}
                  </div>
                )} */}
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

export default UpdateUser;