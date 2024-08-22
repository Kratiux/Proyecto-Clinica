// CalendarioCitas.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import axios from 'axios';
import 'moment/locale/es';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


const localizer = momentLocalizer(moment);

const CalendarioCitas = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [rangoTiempo, setRangoTiempo] = useState(null);
  const [tipoServicio, setTipoServicio] = useState('');
  const [duracion, setDuracion] = useState('');
  const [informacionContacto, setInformacionContacto] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [enviarRecordatorio, setEnviarRecordatorio] = useState(false);
  const [citas, setCitas] = useState([]);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [title, setTitle] = useState(null);

  const localizer = momentLocalizer(moment);
moment.locale('es');  

  useEffect(() => {
    // Cargar citas al montar el componente
    cargarCitas();
  }, []);

  const cargarCitas = async () => {
    try {
      const response = await axios.get('https://api.clinicadentalsofiacastro.com/citas');
      const citasFormateadas = response.data.map((cita) => ({
        ...cita,
        start: new Date(cita.start),
        end: new Date(cita.end),
      }));
      setCitas(citasFormateadas);
    } catch (error) {
      console.error('Error al cargar las citas:', error);
    }
  };

  const handleSelectSlot = (slotInfo) => {
    setRangoTiempo(slotInfo);
    abrirModal();
  };

  const handleCitaClick = (cita) => {
    // Mostrar el modal de actualización al hacer clic en una cita
    abrirModal();
    setRangoTiempo({ start: cita.start, end: cita.end }); // Puedes ajustar según tus necesidades
    setTipoServicio(cita.tipoServicio);
    // setDuracion(cita.duracion);
    setInformacionContacto(cita.informacionContacto);
    setComentarios(cita.comentarios);
    setEnviarRecordatorio(cita.enviarRecordatorio);
    // Almacenar la cita seleccionada
    setCitaSeleccionada(cita);
  };

  const handleCitaDobleClick = (cita) => {
    // Abrir el modal de actualización y cargar datos de la cita
    abrirModal();
    setRangoTiempo({ start: cita.start, end: cita.end }); // Puedes ajustar según tus necesidades
    setTipoServicio(cita.tipoServicio);
    // setDuracion(cita.duracion);
    setInformacionContacto(cita.informacionContacto);
    setComentarios(cita.comentarios);
    setEnviarRecordatorio(cita.enviarRecordatorio);
    // Almacenar la cita seleccionada
    setCitaSeleccionada(cita);
  };

  const abrirModal = () => {
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    // Limpia los estados después de cerrar el modal
    setRangoTiempo(null);
    setTipoServicio('');
    // setDuracion('');
    setInformacionContacto('');
    setComentarios('');
    setEnviarRecordatorio(false);
    // Limpia la cita seleccionada después de cerrar el modal
    setCitaSeleccionada(null);
  };

  const handleGuardarCita = async () => {
    try {
      if (rangoTiempo) {
        // Lógica para guardar o actualizar la cita
        if (citaSeleccionada) {
          // Actualizar la cita existente
          await axios.put(`https://api.clinicadentalsofiacastro.com/citas/${citaSeleccionada._id}`, {
            title,
            start: rangoTiempo.start,
            end: rangoTiempo.end,
            tipoServicio,
            // duracion,
            informacionContacto,
            comentarios,
            enviarRecordatorio,
          });
        } else {
          // Guardar una nueva cita
          await axios.post('https://api.clinicadentalsofiacastro.com/citas', {
            start: rangoTiempo.start,
            end: rangoTiempo.end,
            tipoServicio,
            // duracion,
            informacionContacto,
            comentarios,
            enviarRecordatorio,
          });
        }

        // Recargar las citas después de guardar o actualizar
        cargarCitas();

        // Cierra el modal después de guardar o actualizar
        cerrarModal();
      }
    } catch (error) {
      console.error('Error al guardar o actualizar la cita:', error);
      // Manejar el error según sea necesario
    }
  };


  const handleEliminarCita = async () => {
    try {
      if (citaSeleccionada) {
        // Eliminar la cita
        await axios.delete(`https://api.clinicadentalsofiacastro.com/citas/${citaSeleccionada._id}`);

        // Recargar las citas después de eliminar la cita
        cargarCitas();

        // Cierra el modal después de eliminar la cita
        cerrarModal();
      }
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      // Manejar el error según sea necesario
    }
  };


  const actualizarTitulo = (tipoServicio) => {
    // Lógica para establecer el título según el tipo de servicio
    let nuevoTitulo = '';
    switch (tipoServicio) {
      case 'Ortodoncia':
        nuevoTitulo = 'Cita de Ortodoncia';
        break;
      case 'Cirugía':
        nuevoTitulo = 'Cita de Cirugía';
        break;
      case 'Revision':
        nuevoTitulo = 'Cita de Revisión';
        break;
      default:
        nuevoTitulo = '';
    }
    setTitle(nuevoTitulo);
  };



  return (
    <div>
      <Calendar
        localizer={localizer}
        events={citas}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleCitaClick}   // Agregar manejador de clic en la cita
        onDoubleClickEvent={handleCitaDobleClick}  // Agregar manejador de doble clic en la cita
        views={{
          month: true,
          week: true,
          day: true,
        }}
        messages={{
          month: 'Mes',
          week: 'Semana',
          day:'Día',
          today:'Hoy',
          previous:'Devolver',
          next: 'Siguiente'
 
        }}
      />

      <Modal
        isOpen={modalAbierto}
        onRequestClose={cerrarModal}
        contentLabel="Crear/Actualizar Cita"
        style={{
          content: {
            width: '400px', // Ajusta el ancho según tus necesidades
            margin: 'auto',
            height: '500px',
          },
        }}
      >
        <h3>{citaSeleccionada ? 'Actualizar Cita' : 'Crear Nueva Cita'}</h3>
        <h4>{title}</h4>
        {rangoTiempo && (
          <p>
            Seleccionaste un rango de tiempo desde{' '}
            {moment(rangoTiempo.start).format('dddd, D [de] MMMM [de] YYYY, LT')} hasta{' '}
            {moment(rangoTiempo.end).format('LT')}
          </p>
        )}

<label>
  Tipo de Servicio:
  <select
    value={tipoServicio}
    onChange={(e) => {
      setTipoServicio(e.target.value);
      actualizarTitulo(e.target.value);
    }}
  >
    <option value="">Selecciona...</option>
    <option value="Ortodoncia">Ortodoncia</option>
    <option value="Cirugía">Cirugía</option>
    <option value="Revision">Revision</option>
  </select>
</label>
        {/* <label>
          Duración:
          <input
            type="text"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
          />
        </label> */}

        <label>
          Información de Contacto:
          <input
            type="text"
            value={informacionContacto}
            onChange={(e) => setInformacionContacto(e.target.value)}
          />
        </label>

        <label>
          Comentarios Adicionales:
          <textarea
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
          />
        </label>

        {/* <label>
          <input
            type="checkbox"
            checked={enviarRecordatorio}
            onChange={() => setEnviarRecordatorio(!enviarRecordatorio)}
          />
          Enviar recordatorio
        </label> */}

        <div style={{ marginTop: '20px' }}>
          <Button className='mr-3' variant="contained" color="success" onClick={handleGuardarCita}>
            {citaSeleccionada ? 'Actualizar Cita' : 'Guardar Cita'}
          </Button>
          {citaSeleccionada && (
            <Button variant="contained" color="error" onClick={handleEliminarCita} startIcon={<DeleteIcon />}>Eliminar Cita</Button>
          )}
          <Button className='pt-3' color="secondary" onClick={cerrarModal}>Cancelar</Button>
        </div>
      </Modal>
    </div>
  );
};

export default CalendarioCitas;
