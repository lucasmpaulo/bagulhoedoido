import './App.css';
// import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from "react";
import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { db } from "./firebase_config";
import firebase from "firebase";
// import FrutaListItem from './app/Frutas';
// import CoresListItem from './app/Cores';
// import RegioesListItem from './app/Regioes';
// import PoderesListItem from './app/Poderes';

function App() {
    const [frutas, setFrutas] = useState([]);
    const [frutaInput, setFrutaInput] = useState("");  
    const [cores, setCores] = useState([]);
    const [regioes, setRegioes] = useState([]);
    const [poderes, setPoderes] = useState([]);
    const [heroi, setHeroi] = useState("");

    useEffect(() => {
      (async() => {
        await getFrutas();
        await getCores();
        await getRegioes();
        await getPoderes();
        getHeroi();
      })();
    }, []);

    async function getPoderes() {
      return db.collection("poderes").onSnapshot(function (querySnapshot){
       setPoderes(
         querySnapshot.docs.map((doc) => ({
           id: doc.id,
           poder: doc.data().poder
         }))
        );
      });
    }

    async function getRegioes() {
      return db.collection("regioes").onSnapshot(function (querySnapshot){
       setRegioes(
         querySnapshot.docs.map((doc) => ({
           id: doc.id,
           regiao: doc.data().regiao
         }))
        );
      });
    }

    async function getCores() {
      return db.collection("cores").onSnapshot(function (querySnapshot){
        setCores(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            cor: doc.data().cor
          }))
        );
      });
    }

    async function getFrutas() {
      return db.collection("frutas").onSnapshot(function (querySnapshot) {
        setFrutas(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            fruta: doc.data().fruta
          }))
        );
      });
    }

    function addFruta(e) {
      e.preventDefault();
      db.collection("frutas").add({
        fruta: frutaInput
      });
      setFrutaInput("");
    }

    function getHeroi() {
      function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      const frutaRandom = frutas[randomInteger(1, frutas.length)];
      const corRandom = cores[randomInteger(1, cores.length)];

      // setHeroi(`Sou o super herói ${frutaRandom} da cor ${corRandom}`);
      console.log(frutaRandom);
      console.log(corRandom);
    }
    
    // console.log(`A fruta aleatória é ${frutaRandom.fruta}`);
  

    // frutaItem = frutas.map((fruta, id) => (
    //   frutaItem = fruta.fruta
    // ));
    
    return (
      <div className="App" style={{ display: "flex", justifyContent: "center", }}>
        <div className="container">
          <div className="content">
            <h1 className="title">Teste do Herói</h1>
            {/* <form>
              <TextField 
                id="standard-basic" 
                label="Digite uma nova fruta" 
                value={frutaInput}
                onChange={(e) => setFrutaInput(e.target.value)} 
              />
              <Button 
                type="submit" 
                onClick={addFruta} 
                variant="contained" 
               >Adicionar</Button>
            </form> */}

            
            
{/*             
            {cores.map((cor) => (
                <p>{cor.cor}</p>
              // <CoresListItem cor={cor.cor} id={cor.id} />
            ))}

            {regioes.map((regiao) => (
              <CoresListItem cor={regiao.regiao} id={regiao.id} />
            ))}

            {poderes.map((poder) => (
              <CoresListItem cor={poder.poder} id={poder.id} />
            ))} */}

          </div>
        </div>
      </div>
    );
  }

export default App;
