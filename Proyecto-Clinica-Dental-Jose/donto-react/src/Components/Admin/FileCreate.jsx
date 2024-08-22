
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Textfield from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { TextField,} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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

/* const Options=[
  {id:1, value:'r1', label:'R1'},
  {id:2, value:'r2', label:'R2'},
  {id:3, value:'r3', label:'R3'},
  {id:4, value:'r4', label:'R4'},
  {id:5, value:'r5', label:'R5'},
  {id:6, value:'r6', label:'R6'},
  {id:7, value:'r7', label:'R7'},
  {id:8, value:'r8', label:'R8'},
  {id:9, value:'l1', label:'L1'},
  {id:10, value:'l2', label:'L2'},
  {id:11, value:'l3', label:'L3'},
] */




function CreateFile() {
  const [identification, setIdentification] = useState();
  const [identificationType, setIdentificationType] = useState('');
  const [names, setNames] = useState();
  const [lastName, setLastName] = useState();
  const [teeth, setTeeth] = useState();
  const [description, setDescription] = useState();
  const classes = useStyles();
  let history = useHistory();
  
  const [nameError, setNameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [identificationError, setIdentificationError] = useState('');
  const [identificationTypeError, setIdentificationTypeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const identificationRegex = /^\d+$/;
  const nameRegex = /^[A-Z][a-z]*$/;
  const lastnameRegex = /^[A-Z][a-z]*$/;
  

  

  

 /*  const OptionValue = Options.map((item)=>item.value)
  const OptionsLabel = Options.map((item)=>item.label)
  const [selectValue, setSelectValue] = useState([])
  const [selectLabel, setSelectLabel] = useState([])
  const isAllSelected = Options.length>0 && selectValue.length === Options.length */

/*   const handleValue = (e) =>{
    const value = e.target.value;
    if(value.includes("all")){
      setSelectValue(
        (selectValue && selectValue.length)===(Options && Options.length)
        ?[]
        :OptionValue
      );
        setSelectLabel(
          (selectLabel && selectLabel.length)===(Options && Options.length)
          ?[]
          :OptionsLabel
      );
        return
    }
    setSelectValue(value);
    setSelectLabel(value.map((optionValue)=>{
      const option= Options.find((item)=>item.value===optionValue)
      return option ? option.label:""
    }))
  }; */

  const handleIdentificationTypeChange = (e) => {
    const value = e.target.value;
    setIdentificationType(value);
    if (!value) {
      setIdentificationTypeError('El tipo de identificación es obligatorio');
    } else {
      setIdentificationTypeError('');
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    let isValid = true;
    setIsSubmitting(true);

    if (!identificationType) {
      setIdentificationTypeError('El tipo de identificación es obligatorio');
      isValid = false;
    } else {
      setIdentificationTypeError('');
    }


    if (!identificationRegex.test(identification) || identification.length < 9 || identification.length > 9) {
      setIdentificationError('La identificación no puede contener un mínimo de 9 dígitos ni un máximo 9 dígitos y solo números.');
      isValid = false;
    } else {
      setIdentificationError('');
    }

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
    axios.post("http://localhost:3001/registerFile", {identification, names, lastName, description})
    .then((response) => {
        // Manejar la respuesta o redirigir a una página de éxito
        console.log('Usuario creado:', response.data);
        // Puedes redirigir a una página de éxito o a donde necesites
        history.push('/Admin/DashboardPatient');
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  /* useEffect(()=>{
    if(Array.isArray(selectLabel) && selectLabel.length>0){
      document.querySelector('#multi-select').innerHTML= selectLabel.join(", ");
    }else if(!Array.isArray(selectLabel)){
      document.querySelector('#multi-select').innerHTML= selectLabel;
    }else {
      document.querySelector('#multi-select').innerHTML="";
    }
  },[selectLabel]); */
  return (
    <div>
      <Container component="main" style={{ maxWidth: 600 }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" style={txtBlack}>
            Crear Expediente
          </Typography>

          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControl variant="filled" fullWidth style={tfStyle}>
                  <InputLabel id="identificationType-label">Seleccione tipo de Identificacion</InputLabel>
                  <Select
                    labelId="identificationType-label"
                    id="identificationType"
                    value={identificationType}
                    onChange={handleIdentificationTypeChange}
                    label="IdentificationType"
                  >
                    <MenuItem value="Fisica">Nacional</MenuItem>
                    <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                    <MenuItem value="Documento Migratorio">Documento Migratorio</MenuItem>

                  </Select>
                </FormControl>
                {isSubmitting && !identificationType && (
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
                    {identificationTypeError}
                  </div>
                )}
              </Grid>
              <Grid item xs={12}>
                <Textfield
                  style={tfStyle}
                  variant="filled"
                  fullWidth
                  id="identification"
                  label="Número de Identificación"
                  onChange={(e) => setIdentification(e.target.value)}
                  name="identification"
                />
                {identificationError && (
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
                )} 
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={tfStyle}
                  autoComplete="fname"
                  name="firstName"
                  variant="filled"
                  required
                  fullWidth
                  id="firstName"
                  label="Primer Nombre"
                  onChange={(e) => {
                    const value = e.target.value;
                    setNames(value);
                    if (nameRegex.test(value)) {
                      setNameError(''); // Clear the error message
                    }
                  }}
                  autoFocus
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
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  onChange={(e) => {
                    const value = e.target.value;
                    setLastName(value);
                    if (lastnameRegex.test(value)) {
                      setLastnameError(''); // Clear the error message
                    }
                  }}
                  autoComplete="lname"
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

              {/*<Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="teeth">Dientes</InputLabel>
                  <Select multiple
                    labelId="multi-select"
                    id="multi-select"
                    value={selectValue}
                    label="Dientes"
                    className="dropdown"
                    onChange={handleValue}
                    renderValue={(selected)=>{selected.join(' ')}}
                  >
                    <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox checked={isAllSelected}></Checkbox>
                  </ListItemIcon>
                  <ListItemText primary="Select All"></ListItemText>
                  </MenuItem>
                {Options.map((options)=>(
                  <MenuItem key={options.id} value={options.value}>
                  <ListItemIcon>
                    <Checkbox name="select-checkbox" checked={selectValue.includes(options.value)}></Checkbox>
                  </ListItemIcon>
                    <ListItemText primary={options.label}></ListItemText>
                  </MenuItem>
                ))}
                  </Select>{" "}
                  

                </FormControl>
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
              </Grid>*/}

              <Grid item xs={12}>
                <TextField
                  style={tfStyle}
                  variant="filled"
                  fullWidth
                  id="description"
                  label="Descripción"
                  onChange={(e) => {
                    const value = e.target.value;
                    setDescription(value);
                    if (!description) {
                      setDescriptionError(''); // Clear the error message
                    }
                  }}
                  name="description"
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
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Crear expediente
            </Button>
            
          </form>
        </div>
        <Box mt={6}></Box>
      </Container>
    </div>
  );
}

export default CreateFile;