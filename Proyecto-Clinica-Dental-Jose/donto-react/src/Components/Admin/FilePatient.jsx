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



function FileList() {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState('');




  useEffect(() => {
    axios.get('http://localhost:3001/fileGet')
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);




  const handleDelete=(id) =>{

    axios.delete('http://localhost:3001/deleteFile/'+id)
    .then(res=> {console.log(res)
    window.location.reload()
    })
    .catch(err => console.log(err))
}

  return (

    <div>
    <Typography variant="h6" className='pb-3'>Expediente</Typography>
    <Link to={`DashboardCreateFile`}>
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
          <TableCell className='pt-3'>Identificacion</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Apellido</TableCell>
          {/* <TableCell>Dientes</TableCell> */}
          <TableCell>Descripcion</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {files.filter((file) => {return search === '' ? file : 
              file.identification.startsWith(search) || 
              file.names.toLowerCase().startsWith(search.toLowerCase());
        }).map((file) => (
          <TableRow key={file._id}>
            <TableCell>{file.identification}</TableCell>
            <TableCell>{file.names}</TableCell>
            <TableCell>{file.lastName}</TableCell>
            {/* <TableCell>{file.optionValue}</TableCell> */}
            <TableCell>{file.description}</TableCell>
            
            <TableCell>
            
              <Link to={`UpdateFile/${file._id}`}>
                <Button variant="contained" color="primary" className='mr-3'>
                  Editar
                </Button>
              </Link>
              <Button  variant="contained" color="secondary" onClick={(e)=> handleDelete(file._id)}>
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

export default FileList;
