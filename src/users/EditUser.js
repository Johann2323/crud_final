import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  
  const [showConfirm, setShowConfirm] = useState(false);

  const { id } = useParams();

  const [user, setUser] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    imagenPhat:"",
    imagenURL:""
  });

  const { titulo, autor, descripcion, imagenPhat,imagenURL} = user;

  const onInputChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    await axios.put(`http://localhost:8080/api/cursos/editarLibro/${id}`,user)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/cursos/buscarid/${id}`);
    setUser(result.data);
  };

  return (
    <div style={{
      backgroundImage: `url("https://img.freepik.com/vector-premium/fondo-geometrico-azul-claro_1053-684.jpg?w=2000g")`, backgroundRepeat:'no-repeat',  backgroundAttachment: 'fixed'
    ,height:'600px'}}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Editar Libro</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">Titulo</label>
              <input type={"text"} className="form-control" placeholder={titulo} value={titulo} name="titulo"  onChange={(e) => onInputChange(e)} />
            </div>

            <div className="mb-3">
              <label htmlFor="Username" className="form-label">Autor</label>
              <input type={"text"} className="form-control" placeholder={autor} value={autor} name="autor" onChange={(e) => onInputChange(e)}/>
            </div>

            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Descripción</label>
              <input type={"text"} className="form-control" placeholder={descripcion} value={descripcion} name="descripcion"  onChange={(e) => onInputChange(e)}/>
              <label htmlFor="Email" className="form-label">PDF</label>
              <input type={"text"} className="form-control" value={imagenPhat}   onChange={(e) => onInputChange(e)}/>
              <label htmlFor="Email" className="form-label">PDF URL</label>
              <input type={"text"} className="form-control" value={imagenURL}   onChange={(e) => onInputChange(e)}/>
            </div>

            <button type="submit" className="btn btn-outline-primary">Guardar </button> 
            <Link className="btn btn-outline-danger mx-2" to="/"> Cancelar </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
