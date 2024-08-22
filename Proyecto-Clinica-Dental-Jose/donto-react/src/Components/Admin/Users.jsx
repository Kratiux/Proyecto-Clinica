import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function UserList() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');




  useEffect(() => {
    axios.get('https://api.clinicadentalsofiacastro.com/')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);




  const handleDelete=(id) =>{

    axios.delete('https://api.clinicadentalsofiacastro.com/deleteUser/'+id)
    .then(res=> {console.log(res)
    window.location.reload()
    })
    .catch(err => console.log(err))
}

  return (

    <div>
    <Typography variant="h6" className='pb-3'>Usuarios Recientes</Typography>
    <Link to={`DashboardCreateUser`}>
                <Button variant="contained" class='btn btn-success'>
                  Crear
                </Button>
            </Link>
            <Form variant="h6" className='pt-1'>

      <InputGroup className='my-2'>
      <Form.Control onChange={(e) => setSearch(e.target.value)}  placeholder='Buscar'/>
      </InputGroup>

      </Form>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Cédula</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Apellido</TableCell>
          <TableCell>Teléfono</TableCell>
          {/* <TableCell>Birthday</TableCell> */}
          <TableCell>Género</TableCell>
          {/* <TableCell>Email</TableCell> */}
          <TableCell>Dirección</TableCell>
          {/* <TableCell>Canton</TableCell>
          <TableCell>District</TableCell> */}
          {/* <TableCell>Image</TableCell>
          <TableCell>Role</TableCell> */}
          {/* <TableCell>Action</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {users.filter((user) => {return search === '' ? user : 
              user.identification.startsWith(search) || 
              user.name.toLowerCase().startsWith(search.toLowerCase());
        }).map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.identification}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.phone}</TableCell>
            {/* <TableCell>{user.birthday}</TableCell> */}
            <TableCell>{user.gender}</TableCell>
            {/* <TableCell>{user.email}</TableCell> */}
            <TableCell>{user.province}, {user.canton}, {user.distrit}</TableCell>
            {/* <TableCell>{user.canton}</TableCell>
            <TableCell>{user.distrit}</TableCell> */}
            {/* <TableCell>{user.img}</TableCell>
            <TableCell>{user.role}</TableCell> */}
            <TableCell>
              <Link to={`UpdateUser/${user._id}`}>
                <Button variant="contained" color="primary">
                  Editar
                </Button>
              </Link>
              <Button  variant="contained" color="secondary" onClick={(e)=> handleDelete(user._id)}>
                Borrar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
}

export default UserList;
