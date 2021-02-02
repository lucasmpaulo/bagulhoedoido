import './App.css';
// import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from "react";
import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import { db } from "./firebase_config";
import firebase from "firebase";
// import FrutaListItem from './app/Frutas';



function App() {
    const [frutas, setFrutas] = useState([]);
    const [frutaInput, setFrutaInput] = useState("");  
    const [cores, setCores] = useState([]);
    const [regioes, setRegioes] = useState([]);
    const [poderes, setPoderes] = useState([]);
    const [heroi, setHeroi] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      //informa que o carregamento começou
      setLoading(true);
      (async () => {
        await getFrutas();
        await getCores();
        await getRegioes();
        await getPoderes();
  
        setLoading(false);
      })();
    }, []);

    useEffect(() => {
      if (frutas.length && poderes.length) {
        getHeroi();
      } 
    }, [frutas, poderes, cores, regioes]);

    async function getPoderes() {
      const resultados = await db.collection("poderes").get();

      const dadosTratados = resultados.docs.map((doc) => ({
        id: doc.id,
        poder: doc.data().poder
      }));

      setPoderes(dadosTratados);
      return dadosTratados;
    }

    async function getRegioes() {
      const resultados = await db.collection("regioes").get();

      const dadosTratados = resultados.docs.map((doc) => ({
        id: doc.id,
        regiao: doc.data().regiao
      }));

      setRegioes(dadosTratados);
      return dadosTratados;
    }

    async function getCores() {
      const resultados = await db.collection("cores").get();

      const dadosTratados = resultados.docs.map((doc) => ({
        id: doc.id,
        cor: doc.data().cor
      }));

      setCores(dadosTratados);
      return dadosTratados;
    }

    async function getFrutas() {
      const resultados = await db.collection("frutas").get();

      const dadosTratados = resultados.docs.map((doc) => ({
        id: doc.id,
        fruta: doc.data().fruta
      }));
      
      setFrutas(dadosTratados);
      return dadosTratados;
    }

    function addFruta(e) {
      e.preventDefault();
      db.collection("frutas").add({
        fruta: frutaInput
      });
      setFrutaInput("");
    }

    async function getHeroi() {
      function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
      const frutaRandom = frutas[randomInteger(1, frutas.length - 1)];
      const corRandom = cores[randomInteger(1, cores.length - 1)];
      const poderRandom = poderes[randomInteger(1, poderes.length -1)];
      const regiaoRandom = regioes[randomInteger(1, regioes.length -1)];
      
      
      if (regiaoRandom.regiao.charAt(regiaoRandom.regiao.length - 1) == 'a'){
        setHeroi(`Você é o super herói ${frutaRandom.fruta} da cor ${corRandom.cor}, o seu poder é ${poderRandom.poder} e você mora na região da ${regiaoRandom.regiao}!`);
      } else {
        setHeroi(`Você é o super herói ${frutaRandom.fruta} da cor ${corRandom.cor}, o seu poder é ${poderRandom.poder} e você mora na região do ${regiaoRandom.regiao}!`);
      }      
    }
    
    // console.log(`A fruta aleatória é ${frutaRandom.fruta}`);
  

    // frutaItem = frutas.map((fruta, id) => (
    //   frutaItem = fruta.fruta
    // ));
    
    return (
      <div className="App" style={{ display: "flex", justifyContent: "center", }}>
        <div className="navbar">
          <img src="./images/superhero.svg" alt="Logo superhero" className="navbar-logo" />
          <h1 className="navbar-title">Gerador de Heróis</h1>
        </div>
        <div className="container">
          <div className="content">
            <h1 className="title">Teste do Herói</h1>
            {/* Verificar se está carregando */}
            {
              loading ?  <h2 class="titleHero">Buscando o seu herói...</h2> : 
              (heroi ? (<div class="containerHero"><h2 className="titleHero">O seu herói foi gerado: <br /><span class="contentHero">{heroi}</span></h2></div>) : (<h2>Não foi possível gerar um herói, necessário verificar os dados</h2>))   
            }
            {/* <img src="./images/superhero.svg" alt="Herói" className="imagem-frase" /> */}
            <div className="foto-anime">
              <img src="./images/neferupitou.gif" />
            </div>

                       
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
            ))} 
          */}

          </div>
        </div>
      </div>
    );
  }

export default App;
