import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState({
    name: '',
    description: ''
  })

  // const [name, setName] = useState("")
  // const [description, setDescription] = useState("")

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("http://localhost:4001/categories", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      //Datos
      setCategories(json);
    };

    getCategories();
  }, []);

  const onChangeCategorie = (e) => {
    setCategorie({
      ...categorie,
      [e.target.name]: e.target.value      
    })
  }

  const onSubmitCagetorie = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4001/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categorie)
      });

    const json = await response.json()
    console.log(json);
  }

  const eliminarCategorie = async (id) => {
    const response = await fetch(`http://localhost:4001/categories/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }        
      });

    const json = await response.json()
    console.log(json);
  }

  return (
    <div className="container">
      <h1>Categories</h1>
      <hr />
      <form onSubmit={onSubmitCagetorie}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name:</label>
          <input type="text" className="form-control" name="name" value={categorie.name} onChange={onChangeCategorie}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Description:</label>
          <input type="text" className="form-control" name="description" value={categorie.description} onChange={onChangeCategorie}/>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <br/>
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((categorie) => (
            <tr key={categorie.id}>
              <th>{categorie.id}</th>
              <th>{categorie.name}</th>
              <th>{categorie.description}</th>
              <th>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => eliminarCategorie(categorie.id)}>
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
