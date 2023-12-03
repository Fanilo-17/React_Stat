
import Header from "../components/Header";
import TableauAttaque from "../components/TableauAttaque";
import { useEffect, useState } from "react";

function Attaque() {
    const attaque = ["Equipe","Ligue","Tir/Match","Tir Cadre / Match","Dribble / Match","Faute Subie / Match","Note"];

  function getDataFormUrl(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            resolve(response);
          } else {
            reject(new Error("Echec de le requête. Statut : " + xhr.status));
          }
        }
      };
      xhr.send();
    });
  }


  const [dataGeneral, setDataGeneral] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataFormUrl("https://footstat.azurewebsites.net/Stat/GetStatAttaqueGeneral")
        setDataGeneral(response);
      } catch (error) {
        console.error("Erreur lors de la recuperation des donnees :", error.message);
      }
    };
    fetchData();
  }, []);

  const [dataAway, setDataAway] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataFormUrl("https://footstat.azurewebsites.net/Stat/GetStatAttaqueAway")
        setDataAway(response);
      } catch (error) {
        console.error("Erreur lors de la recuperation des donnees :", error.message);
      }
    };
    fetchData();
  }, []);

  const [dataHome, setDataHome] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataFormUrl("https://footstat.azurewebsites.net/Stat/GetStatAttaqueHome")
        setDataHome(response);
      } catch (error) {
        console.error("Erreur lors de la recuperation des donnees :", error.message);
      }
    };
    fetchData();
  }, []);

    return (
      <>
        <Header></Header>        
        <TableauAttaque entete={attaque} data={dataGeneral} title="General"></TableauAttaque>
        <TableauAttaque entete={attaque} data={dataHome} title="Domicile"></TableauAttaque>
        <TableauAttaque entete={attaque} data={dataAway} title="Exterieur"></TableauAttaque>
      </>
    );
  }
  
export default Attaque;
  