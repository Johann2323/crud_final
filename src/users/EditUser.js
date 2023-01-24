import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { name, username, email } = user;

  const onInputChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/cursos/${id}`, user);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
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
              <input type={"text"} className="form-control" placeholder="Aquí aparecera el título" name="name" value={name} onChange={(e) => onInputChange(e)} />
            </div>

            <div className="mb-3">
              <label htmlFor="Username" className="form-label">Autor</label>
              <input type={"text"} className="form-control" placeholder="Aquí aparecera el autor" name="username" value={username} onChange={(e) => onInputChange(e)}/>
            </div>

            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Descripción</label>
              <input type={"text"} className="form-control" placeholder="Aquí aparecera la descripción" name="email" value={email} onChange={(e) => onInputChange(e)}/>
            </div>

            <button type="submit" className="btn btn-outline-primary">Guardar </button> 
            <Link className="btn btn-outline-danger mx-2" to="/"> Cancelar </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
