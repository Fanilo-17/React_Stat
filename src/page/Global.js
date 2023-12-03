import Tableau from "../components/Tableau";
import Header from "../components/Header";
import { useEffect, useState } from "react";


function Global() {

    const global = ["Equipe","Ligue","But","Tir/Match","Carton Jaune","Cartson Rouge","Possession","Passe Réussies","Aérien Gagnés","Note"];

    function getDataFormUrl(url) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET",url,true);
        xhr.onreadystatechange = function() {
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
          const response = await getDataFormUrl("https://footstat.azurewebsites.net/Stat/GetStatGeneralgeneral")
          setDataGeneral(response);
        } catch (error) {
          console.error("Erreur lors de la recuperation des donnees :" , error.message);
        }
      };
      fetchData();
    }, []);

  const [dataAway, setDataAway] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataFormUrl("https://footstat.azurewebsites.net/Stat/GetStatGeneralAway")
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
        const response = await getDataFormUrl("https://footstat.azurewebsites.net/Stat/GetStatGeneralHome")
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
        <Tableau entete={global} data={dataGeneral} title="Global"></Tableau>
        <Tableau entete={global} data={dataHome} title="Domicile"></Tableau>
        <Tableau entete={global} data={dataAway} title="Exterieur"></Tableau>
      </>
    );
  }
  
export default Global;
  