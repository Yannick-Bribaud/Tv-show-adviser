import "./global.css"
import s from "./style.module.css"
import { TVShowAPI } from "./api/tv-show";
import { useEffect } from "react";
import { useState } from "react";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetails } from "./components/TVShowDetails/TVShowDetails";
import { Logo } from "./components/Logo/Logo";
import  logo  from "./assets/image/logo.png"
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";


export  function App(){

const [currentTVShow, setCurrentTVShow] = useState();
const [recommendationList, setRecommendationList] = useState([]);

 async function fetchPopulars(){
    try{
        const populars = await TVShowAPI.fetchPopulars();
        if(populars.length > 0){
            setCurrentTVShow(populars[0]);
        }
    }catch(error){
        alert("erreur lors de la recherche des series populaires")
    }
    
 }

 async function fetchRecommendations(tvShowId){
    try{
        const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
        if(recommendations.length > 0){
            setRecommendationList(recommendations.slice(0, 20));
        }
    }catch(error){
        alert("erreur lors de la recherche des récommendations")
    }
    
 }


    useEffect(()=>{
        fetchPopulars() 
    }, [])

    useEffect(()=>{
        if(currentTVShow){
            fetchRecommendations(currentTVShow.id)
        }
    }, [currentTVShow])

    async function searchTVShow(tvShowName){
        try{
            const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
            if(searchResponse.length > 0){
                setCurrentTVShow(searchResponse[0]);
            }
        }catch(error){
            alert("erreur lors de la recherche d'un TV Show")
        }
    }
    return( 
    <div className={s.main_container} style={{background: currentTVShow ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover` 
                                                                        : "black"}}>
        <div className={s.header}>
            <div className="row">
                <div className="col-4">
                    <Logo image={logo} 
                          title="Watowatch"
                          subtitle="Find a show you may like"/>
                </div>
                <div className="col-sm-12 col-md-4">
                    <SearchBar onSubmit={searchTVShow} />
                </div>
            </div>
        </div>
        <div className={s.tv_show_details}>
            {currentTVShow && <TVShowDetails tvShow={currentTVShow} />}
            </div>
        <div className={s.recommendation}>
            {recommendationList && recommendationList.length > 0 
            && <TVShowList onClickItem={setCurrentTVShow} tvShowList={recommendationList} />}
        </div>
    </div>
    );
}