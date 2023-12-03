import TableauDefense from "../components/TableauDefense";
import Header from "../components/Header";
import { useEffect, useState } from "react";

function Defense() {
  const defense = ["Equipe","Ligue","Tir / Match","Tacle / Match","Interception / Match","Faute / Match","Hors Jeu / Match","Note"];

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
        const response = await getDataFormUrl("https://footstat.azurewebsites.net/Stat/GetStatDefensegeneral")
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
        const response = await getDataFormUrl("https://footstat.azurewebsites.net/Stat/GetStatDefenseAway")
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
        const response = await getDataFormUrl("https://footstat.azurewebsites.net/Stat/GetStatDefenseHome")
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
        <TableauDefense entete={defense} data={dataGeneral} title="General"></TableauDefense>
        <TableauDefense entete={defense} data={dataHome} title="Domicile"></TableauDefense>
        <TableauDefense entete={defense} data={dataAway} title="Exterieur"></TableauDefense>
      </>
    );
  }
  
export default Defense;
  