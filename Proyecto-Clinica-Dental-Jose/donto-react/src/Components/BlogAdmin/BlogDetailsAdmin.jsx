import React, { useState, useEffect, useRef } from 'react';
import { TextField, TextareaAutosize} from '@mui/material';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';



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

const BlogDetailsAdmin = ({ blogId }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const classes = useStyles();
  let history = useHistory();

  const [imagenError, setImagenError] = useState('');
  const [blogTitleError, setBlogTitleError] = useState('');
  const [blogDescriptionError, setBlogDescriptionError] = useState('');



  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleBlogTitleChange = (e) => {
    setBlogTitle(e.target.value);
  }

  const handleBlogDescriptionChange = (e) => {
    setBlogDescription(e.target.value);
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  }

  const handleAddComment = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blogs/${blogId}`);
      // Puedes redirigir al usuario a la lista de blogs o realizar otras acciones después de eliminar
    } catch (error) {
      console.error('Error al eliminar el blog:', error);
      alert('Error al eliminar el blog.');
    }
  }


  const form = useRef();
  const handlePublish =  (e) => {
    e.preventDefault();
    let isValid = true;
    

    if (!imageUrl) {
      setImagenError('El título del blog es obligatoria');
      isValid = false;
    } else {
      setImagenError(''); // Reinicia el mensaje de error si el campo es válido
    }

    if (!blogTitle) {
      setBlogTitleError('El título del blog es obligatoria');
      isValid = false;
    } else {
      setBlogTitleError(''); // Reinicia el mensaje de error si el campo es válido
    }

    if (!blogDescription) {
      setBlogDescriptionError('La descripción del blog es obligatoria');
      isValid = false;
    } else {
      setBlogDescriptionError(''); // Reinicia el mensaje de error si el campo es válido
    }
    
    if(isValid){
      try {
         axios.post('https://api.clinicadentalsofiacastro.com/api/blogs/Create', {
          imageUrl,
          blogTitle,
          blogDescription,
        });
        alert('Blog publicado correctamente.');
        form.current.reset();
      } catch (error) {
        console.error('Error al publicar el blog:', error);
        alert('Error al publicar el blog.');
      }
    }
    
  }

  return (
    <React.Fragment>
      <div>
      <Container component="main" style={{ maxWidth: 600 }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" style={txtBlack}>
            Crear Blog
          </Typography>

          <form ref={form} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <div ref={form} className="form-group">
                    <label htmlFor="image">Imagen para el blog: </label>
                    <hr />
                    <img className="featured-thumbnail" src={imageUrl}/>
                    <input type="file" id="image" accept='image/png, image/jpeg' onChange={handleImageChange} />
                  </div>
                 {imagenError && (
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
                    {imagenError}
                  </div>
                )} 
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  style={tfStyle}
                  autoComplete="fname"
                  name="blogTitle"
                  variant="filled"
                  required
                  fullWidth
                  id="blogTitle"
                  label="Nombre del título"
                  onChange={(e) => setBlogTitle(e.target.value)}
                  autoFocus
                />
                 {blogTitleError && (
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
                    {blogTitleError}
                  </div>
                )} 
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextareaAutosize
                  style={tfStyle}
                  variant="filled"
                  required
                  rows="10" cols="58"
                  id="blogDescription"
                  label="Descripcion del blog"
                  name="blogDescription"
                  onChange={(e) => setBlogDescription(e.target.value)}
                  autoComplete="lname"
                />
                 {blogDescriptionError && (
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
                    {blogDescriptionError}
                  </div>
                )} 
              </Grid>

            </Grid>  
            <Button
              onClick={handlePublish}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Publicar Blog
            </Button>
            
          </form>
        </div>
        <Box mt={6}></Box>
      </Container>
    </div>
    </React.Fragment>
  );
}

export default BlogDetailsAdmin;





