import React, {useEffect, useState} from 'react'
import Navbar from "./components/Navbar"
import Characters from './components/Characters';
import Pagination from './components/Pagination';


function App() {

  const [characters, setCharacters] = useState([]); // el estado inicial sera que el arreglo estara vacio, pero luego se ira llenando
  const [info, setInfo] = useState({});


  const initialUrl = "https://rickandmortyapi.com/api/character";

  const fetchCharacteres = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setCharacters(data.results); //pasamos la data al estado characters 
      setInfo(data.info);
    })
    .catch(error => console.log(error))
  };

  const onPrevious = () => {
    fetchCharacteres(info.prev)
  }

  const onNext = () => {
    fetchCharacteres(info.next)
  }

  useEffect( () => {
    fetchCharacteres(initialUrl);      
  }, [])

  return (
      <>        
        <Navbar brand = "Rick and Morty App"></Navbar>    

        <div className='container mt-5'>
          <Pagination prev={info.prev} next={info.next} onPrevious={onPrevious} onNext={onNext}></Pagination>

          <Characters characters={characters}></Characters>
          
          <Pagination prev={info.prev} next={info.next} onPrevious={onPrevious} onNext={onNext}></Pagination>
        </div>
      </>
  );
}

export default App;
