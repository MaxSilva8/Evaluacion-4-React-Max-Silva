import React, { useState } from 'react';
import './App.css'

function App() {
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [gastos, setGastos] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const validarFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toString() !== 'Fecha Invalida' && !isNaN(date.getTime());
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (!validarFecha(fecha)) {
      alert('Fecha Inválida');
      return;
    }

    const gastoData = {
      descripcion,
      categoria,
      monto: parseFloat(monto),
      fecha: new Date(fecha),
    };

    if (editIndex !== null) {
      setGastos((prevGastos) =>
        prevGastos.map((gasto, index) =>
          index === editIndex ? gastoData : gasto
        )
      );
      setEditIndex(null);
    } else {
      setGastos((prevGastos) => [gastoData, ...prevGastos]);
    }

    setDescripcion('');
    setCategoria('');
    setMonto('');
    setFecha('');
  };

  const manejarCambioBusqueda = (evento) => {
    setTerminoBusqueda(evento.target.value);
  };

  const manejarEditar = (index) => {
    const gasto = gastos[index];
    setDescripcion(gasto.descripcion);
    setCategoria(gasto.categoria);
    setMonto(gasto.monto);
    setFecha(gasto.fecha.toISOString().split('T')[0]); // Formato de fecha YYYY-MM-DD
    setEditIndex(index);
  };

  const manejarEliminar = (index) => {
    setGastos((prevGastos) => prevGastos.filter((_, i) => i !== index));
  };

  const gastosFiltrados = gastos.filter((gasto) =>
    gasto.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    gasto.categoria.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Gastos</h1>
        <form onSubmit={manejarEnvio}>
          <div>
            <label>Descripción</label>
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div>
            <label>Categoría</label>
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>
          <div>
            <label>Monto</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </div>
          <div>
            <label>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <button type="submit">{editIndex !== null ? 'Actualizar Gasto' : 'Agregar Gasto'}</button>
        </form>

        <div>
          <label>Buscar:</label>
          <input
            type="text"
            value={terminoBusqueda}
            onChange={manejarCambioBusqueda}
            placeholder="Buscar por descripción o categoría"
          />
        </div>

        <ul>
          {gastosFiltrados.map((gasto, index) => (
            <li key={index}>
              {gasto.descripcion} - {gasto.categoria} - ${gasto.monto.toFixed(2)} - {gasto.fecha.toDateString()}
              <button onClick={() => manejarEditar(index)}>Editar</button>
              <button onClick={() => manejarEliminar(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;