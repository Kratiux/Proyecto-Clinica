const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser')
require('dotenv').config();
const UserModel = require('./models/users.model');
const FileModel = require('./models/file.model');
const Blog  = require('./models/blogModel');
const SchedulerEvent  = require('./models/SchedulerModel');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const UserRoute = require('./routes/users.route');
const LoginRoute = require('./routes/login.route');

const Cita = require('./models/SchedulerModel');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
/* const cors_whitelist = ["http://localhost:21000", "https://www.clinicadentalsofiacastro.com" ,"https://clinicadentalsofiacastro.com", "https://api.clinicadentalsofiacastro.com"]

app.use(cors({

  origin: function (origin, callback, abc) {
    if (cors_whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS' + JSON.stringify(abc)))
    }
  },    //allow the frontend
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true

})) */

app.use(cors());


app.use(cookieParser())



app.use('/', UserRoute);
app.use('/', LoginRoute);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://www.clinicadentalsofiacastro.com' ,'https://clinicadentalsofiacastro.com', 'https://api.clinicadentalsofiacastro.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); // Si necesitas enviar cookies o autenticación

  // Opcional: Configura las cabeceras máximas permitidas en la respuesta
  res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization');

  next();
}); */


// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'clinicadontoreact@gmail.com', // Your Gmail address
      pass: 'wgrckolurigfyfrq', // Your Gmail password
  },
});


// Route to handle form submission
app.post('/send-email', (req, res) => {
  const { email } = req.body;
  UserModel.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.send({Status: "User not existed"})
        }

  // Email options
  const mailOptions = {
      from: '', // Sender's email address
      to: 'yousafdonto@gmail.com', // Receiver's email address
      subject: "Reiniciar contraseña",
      html: `<!DOCTYPE html>
      <html lang="en" >
      <head>
        <meta charset="UTF-8">
        <title>Reiniciar contraseña</title>
        
      
      </head>
      <body>
      <!-- partial:index.partial.html -->
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Clinica Dental Sofia Castro</a>
          </div>
          <p style="font-size:1.1em">Hola,</p>
          <p>Gracias por escoger los servicios de la Clinica Sofia Castro. Con el siguiente link cambie la contraseña</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">https://api.clinicadentalsofiacastro.com/ForgotPassword/Passwordreset</h2>
          <p style="font-size:0.9em;">Les saluda,<br />Clinica Dental Sofia Castro</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Clinica Sofia Castro R</p>
            <p>Moravia, San Jose, Costa Rica</p>
          </div>
        </div>
      </div>
      <!-- partial -->
        
      </body>
      </html>`,
  };


 // Send email
 transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return res.status(500).send(error.toString());
  }
  return res.send({ Status: "Success" });
});

    });

});




app.post('/registerFile', (req, res) => {

  FileModel.create(req.body)
    .then(files => res.json(files))
    .catch(err => res.json(err))
});

app.get('/fileGet', (req, res) => {

  FileModel.find({})
    .then(files => res.json(files))
    .catch(err => res.json(err))


})

app.get('/getFile/:id', (req, res) => {
  const id = req.params.id; // Usar la variable id en lugar de _id

  FileModel.findById({ _id: id })
    .then(files => res.json(files))
    .catch(err => res.json(err))
});

app.put('/updateFile/:id', (req, res) => {
  const id = req.params.id;
  FileModel.findByIdAndUpdate({ _id: id }, {
    identification: req.body.identification,
    names: req.body.names,
    lastName: req.body.lastName,
    description: req.body.description
  })
    .then(files => res.json(files))
    .catch(err => res.json(err))
});

app.post('/change-password', async (req, res) => {
  const { newPassword } = req.body; // Obtiene la nueva contraseña del cuerpo de la solicitud

  try {
    // Hash (cifra) la nueva contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualiza la contraseña del usuario en la base de datos
    await User.updateOne({ _id: req.user._id }, { password: hashedPassword });

    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ message: 'Error al cambiar la contraseña. Por favor, inténtalo de nuevo más tarde.' });
  }
});

app.delete('/deleteFile/:id', (req, res) => {
  const id = req.params.id;

  FileModel.findByIdAndDelete(id) // No necesitas { _id: id } aquí
    .then((deletedFile) => {
      if (!deletedFile) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.json({ message: "Usuario eliminado con éxito", deletedFile });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});


app.get('/', (req, res) => {

  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))


})


app.get('/getUser/:id', (req, res) => {
  const id = req.params.id; // Usar la variable id en lugar de _id

  UserModel.findById({ _id: id })
    .then(files => res.json(files))
    .catch(err => res.json(err))
});


app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;

  UserModel.findByIdAndDelete(id) // No necesitas { _id: id } aquí
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.json({ message: "Usuario eliminado con éxito", deletedUser });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});




app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({ _id: id }, {
    names: req.body.names,
    lastName: req.body.lastName,
    phone: req.body.phone,
    birthday: req.body.birthday,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    province: req.body.province,
    canton: req.body.canton,
    distrit: req.body.distrit,
    role: req.body.role
  })
    .then(files => res.json(files))
    .catch(err => res.json(err))
});


app.post('/api/blogs/Create', async (req, res) => {
  try {
    const { imageUrl, blogTitle, blogDescription, comments } = req.body;
    const newBlog = new Blog({ imageUrl, blogTitle, blogDescription, comments });
    await newBlog.save();
    res.json({ message: 'Blog publicado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al publicar el blog.' });
  }
});

app.delete('/api/blogs/delete/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params;
    await Blog.findByIdAndDelete(blogId);
    res.json({ message: 'Blog eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el blog.' });
  }
});


app.get('/api/blogs', (req, res) => {

  Blog.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))


})


app.get('/api/blogs/find/:id', (req, res) => {
  const id = req.params.id; // Usar la variable id en lugar de _id

  Blog.findById({ _id: id })
    .then(blog => res.json(blog))
    .catch(err => res.json(err))
});





// Actualizar un blog por ID


app.put('/api/blogs/update/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndUpdate({ _id: id }, {
    
    imageUrl: req.body.imageUrl,
  blogTitle: req.body.blogTitle ,
  blogDescription: req.body.blogDescription ,
  
  })
    .then(blogs => res.json(blogs))
    .catch(err => res.json(err))
});


//----------------------------------------------------------------------------------------Apointments -----------------------------------------------------------------------



app.post('/citas', async (req, res) => {
  try {
    const nuevaCita = new Cita(req.body);
    await nuevaCita.save();
    res.status(201).json(nuevaCita);
  } catch (error) {
    console.error('Error al guardar la cita:', error);
    res.status(500).json({ error: 'Error al guardar la cita' });
  }
});


app.get('/citas', async (req, res) => {
  try {
    const citas = await Cita.find();
    res.json(citas);
  } catch (error) {
    console.error('Error al obtener las citas:', error);
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
});


app.get('/citas/:id', async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    res.json(cita);
  } catch (error) {
    console.error('Error al obtener la cita:', error);
    res.status(500).json({ error: 'Error al obtener la cita' });
  }
});


app.put('/citas/:id', async (req, res) => {
  try {
    const cita = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    res.json(cita);
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    res.status(500).json({ error: 'Error al actualizar la cita' });
  }
});


app.delete('/citas/:id', async (req, res) => {
  try {
    const cita = await Cita.findByIdAndDelete(req.params.id);
    if (!cita) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    res.json({ message: 'Cita eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la cita:', error);
    res.status(500).json({ error: 'Error al eliminar la cita' });
  }
});


app.listen(21000, () => {

  console.log("server is running")
});

//app.use('/backend', users);

//app.use(authRoutes);