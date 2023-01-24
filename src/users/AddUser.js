import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    imagenPhat:"",
    imagenURL:""
  });
  

  const { titulo, autor, descripcion } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/cursos/crearlibro", user);
    navigate("/");
  };

  const [archivos, setArchivos] = useState(null)
  const subirArchivos = e => {
    setArchivos(e);
    console.log(e);

  }
  const insertarArchivos = async () => {

    const f = new FormData();

    for (let index = 0; index < archivos.length; index++) {
      f.append("file", archivos[index]);

    }

    
    await axios.post("http://localhost:8080/api/assets/upload", f, { headers: { 'Content-Type': 'multipart/form-data' } })

      .then(response => {
        console.log(response.data);
        console.log(response.data.key);
        user.imagenPhat = response.data.key;
        
      }).catch(error => {
        console.log(error);
      })
  }


  return (
    <div  style={{
      backgroundImage: `url("https://img.freepik.com/vector-premium/fondo-geometrico-azul-claro_1053-684.jpg?w=2000g")`, backgroundRepeat:'no-repeat',  backgroundAttachment: 'fixed'
      ,height:'600px'}}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Registrar Libro</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Título
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingrese el titulo del libro"
                name="titulo"
                value={titulo}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Autor
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingrese el nombre del autor del libro"
                name="autor"
                value={autor}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Descripcion" className="form-label">
                Descripción
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Ingrese una pequeña descripcion del libro"
                name="descripcion"
                value={descripcion}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <input type="file" id="subir" name="PDF" onChange={(e) => subirArchivos(e.target.files)} /><br></br> <br></br>
            <button type="submit" className="btn btn-outline-primary" variant="success" onClick={() => insertarArchivos()}>Agregar Libro</button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
          
        </div>
      </div>
    </div>
  );
}
