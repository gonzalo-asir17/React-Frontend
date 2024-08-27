import React, { useState, useEffect } from 'react';
import './Inventario.css';

function Inventario() {
  const [producto, setProducto] = useState({
    nombre: '',
    codigo: '',
    cantidad: '',
    precio: '',
    fecha: ''
  });

  const [inventario, setInventario] = useState([]);
  const [editando, setEditando] = useState(false);
  const [indiceEditar, setIndiceEditar] = useState(null);

  // Cargar productos desde localStorage al cargar la aplicación
  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('inventario'));
    if (productosGuardados) {
      setInventario(productosGuardados);
    }
  }, []);

  // Guardar productos en localStorage cada vez que cambie el inventario
  useEffect(() => {
    localStorage.setItem('inventario', JSON.stringify(inventario));
  }, [inventario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      const inventarioActualizado = inventario.map((prod, index) =>
        index === indiceEditar ? producto : prod
      );
      setInventario(inventarioActualizado);
      setEditando(false);
      setIndiceEditar(null);
    } else {
      setInventario([...inventario, producto]);
    }
    setProducto({ nombre: '', codigo: '', cantidad: '', precio: '', fecha: '' });
  };

  const handleEdit = (index) => {
    setProducto(inventario[index]);
    setEditando(true);
    setIndiceEditar(index);
  };

  const handleDelete = (index) => {
    const inventarioActualizado = inventario.filter((_, i) => i !== index);
    setInventario(inventarioActualizado);
  };

  return (
    <div className="inventario-container">
      <h1>Gestión de Inventario</h1>

      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          placeholder="Nombre del Producto"
          required
        />
        <input
          type="text"
          name="codigo"
          value={producto.codigo}
          onChange={handleChange}
          placeholder="Código"
          required
        />
        <input
          type="number"
          name="cantidad"
          value={producto.cantidad}
          onChange={handleChange}
          placeholder="Cantidad"
          required
        />
        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          placeholder="Precio"
          required
        />
        <input
          type="date"
          name="fecha"
          value={producto.fecha}
          onChange={handleChange}
          required
        />
        <button type="submit">{editando ? 'Guardar Cambios' : 'Añadir Producto'}</button>
      </form>

      <h2>Inventario</h2>
      <table className="tabla-inventario">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventario.map((prod, index) => (
            <tr key={index}>
              <td>{prod.nombre}</td>
              <td>{prod.codigo}</td>
              <td>{prod.cantidad}</td>
              <td>{prod.precio}</td>
              <td>{prod.fecha}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Editar</button>
                <button onClick={() => handleDelete(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventario;
