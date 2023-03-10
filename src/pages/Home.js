import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/api/cursos/getlibros");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    if (window.confirm('Esta seguro de eliminar este libro?')) {
      await axios.delete(`http://localhost:8080/api/cursos/eliminarLibro/${id}`);
      loadUsers();
    }
    
  };

  return (
    <div style={{
      backgroundImage: `url("https://img.freepik.com/vector-premium/fondo-geometrico-azul-claro_1053-684.jpg?w=2000g")`, backgroundRepeat:'no-repeat',
     height:'600px'}}>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
            <th scope="col">ID</th>
              <th scope="col">Titulo</th>
              <th scope="col">Autor</th>
              <th scope="col">Descripcion</th>
              <th scope="col">PDF</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.titulo}</td>
                <td>{user.autor}</td>
                <td>{user.descripcion}</td>
                <td>{user.imagenURL}</td>
               
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
