import React, { useEffect, useState } from "react";
import  "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";
import Footer from "./components/Footer";
import loading from "./Netflix_LoadTime.gif";

export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState([]);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    //pegando lista total
    const loadAll = async () => {
    let list = await Tmdb.getHomeList();
      setMovieList(list);

    //pegando o featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeatureData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return(
    <div className="page">

      <Header black={blackHeader}/>
      
      {featureData &&
        <FeatureMovie item={featureData}/>
      }
      
      <section className="lista">
        {movieList.map((item, key) => (
         <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <Footer />

      {movieList.length <= 0 && 
      <div className="loading">
          <img src={loading}></img>
      </div>
      }
    </div>
    
  );
}