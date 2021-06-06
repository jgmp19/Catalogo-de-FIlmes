import './styles.css';
import { useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';
import {toast } from 'react-toastify';


export default function Filme(){
    const { id } = useParams();
    const history = useHistory();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if(response.data.length === 0){ //acessar com um id que não existe
                history.replace('/');
                return;
            }

            setFilme(response.data);
            setLoading(false);
        }
        
        loadFilme();

        return () => {
            // desmontar o component
        }
    }, [id, history]);

    function saveFilm(){
        const myList = localStorage.getItem('filmes');
        let filmSave = JSON.parse(myList) || [];

        //Caso já tenha algum filme salvo com o mesmo id o

        const hasFilme = filmSave.some((filmSave) => filmSave.id === filme.id);
        if(hasFilme){
            toast.info('Já possui esse filme salvo!');
            return;
        }
        // Caso não salvar no localStorage
        filmSave.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmSave));
        toast.success('Filme salvo com sucesso!');
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando informações do filme ... </h1>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1> {filme.nome} </h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            {filme.sinopse}

            <div >
                <button onClick={saveFilm}>Salvar</button>
                <button>
                    <a href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}