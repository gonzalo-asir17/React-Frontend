import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Medicamentos = () => {
    const [medicamentos, setMedicamentos] = useState([]);
    const [nuevoMedicamento, setNuevoMedicamento] = useState({
        nombre: '',
        codigo: '',
        stock: 0,
        precio: '',
        caducidad: ''
    });

    useEffect(() => {
        axios.get('http://localhost:3000/api/medicamentos')
            .then(response => setMedicamentos(response.data))
            .catch(error => console.error('Error al obtener los medicamentos:', error));
    }, []);

    const handleChange = (e) => {
        setNuevoMedicamento({
            ...nuevoMedicamento,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/medicamentos', nuevoMedicamento)
            .then(response => setMedicamentos([...medicamentos, response.data]))
            .catch(error => console.error('Error al crear el medicamento:', error));
    };

    return (
        <div>
            <h2>Medicamentos</h2>
            <ul>
                {medicamentos.map(med => (
                    <li key={med.id}>{med.nombre} - {med.codigo} - Stock: {med.stock}</li>
                ))}
            </ul>

            <h3>Añadir Medicamento</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
                <input type="text" name="codigo" placeholder="Código" onChange={handleChange} />
                <input type="number" name="stock" placeholder="Stock" onChange={handleChange} />
                <input type="text" name="precio" placeholder="Precio" onChange={handleChange} />
                <input type="date" name="caducidad" onChange={handleChange} />
                <button type="submit">Añadir</button>
            </form>
        </div>
    );
};

export default Medicamentos;
