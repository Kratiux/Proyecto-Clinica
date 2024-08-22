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



function BlogList() {
  const [blog, setBlog] = useState([]);
  const [search, setSearch] = useState('');




  useEffect(() => {
    axios.get('http://localhost:3001/api/blogs/find')
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);




  const handleDelete=(id) =>{

    axios.delete('http://localhost:3001/api/blogs/delete/'+id)
    .then(res=> {console.log(res)
    window.location.reload()
    })
    .catch(err => console.log(err))
}

  return (

    <div>
    <Typography variant="h6" className='pb-3'>Expediente</Typography>
    <Link to={`DashboardCreateBlog`}>
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
          <TableCell className='pt-3'>Imagen</TableCell>
          <TableCell>Título</TableCell>
          <TableCell>Descripcion</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {blog.filter((blogs) => {return search.toLocaleLowerCase() === '' ? blogs : blogs.blogTitle.toLocaleLowerCase().includes(search);
        }).map((blog) => (
          <TableRow key={blog._id}>
            <TableCell>{blog.imageURL}</TableCell>
            <TableCell>{blog.blogTitle}</TableCell>
            <TableCell>{blog.description}</TableCell>
            
            <TableCell>
            
              <Link to={`UpdateFile/${blog._id}`}>
                <Button variant="contained" color="primary" className='mr-3'>
                  Editar
                </Button>
              </Link>
              <Button  variant="contained" color="secondary" onClick={(e)=> handleDelete(blog._id)}>
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

export default BlogList;