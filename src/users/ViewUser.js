import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
  });

  

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get("http://localhost:8080/api/cursos/getlibros/${id}");
    setUser(result.data);
  };

  return (
    <div style={{
      backgroundImage: `url("https://img.freepik.com/vector-premium/fondo-geometrico-azul-claro_1053-684.jpg?w=2000g")`, backgroundRepeat:'no-repeat',  backgroundAttachment: 'fixed'
    ,height:'600px'}}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Detalles del Libro</h2>

          <div className="card">
            <div className="card-header">
              
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Titulo:</b>
                  {user.titulo}
                </li>
                <li className="list-group-item">
                  <b>Autor:</b>
                  {user.autor}
                </li>
                <li Descripcion="list-group-item">
                  <b>Descripcion:</b>
                  {user.descripcion}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Regresar al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
