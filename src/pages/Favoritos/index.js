import { useEffect, useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import {toast } from 'react-toastify';

export default function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const myList = localStorage.getItem('filmes');
        setFilmes(JSON.parse(myList) || []);

    }, []);

    function handleDelete(id) {
        let filterFilm = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filterFilm);
        localStorage.setItem('filmes', JSON.stringify(filterFilm));
        toast.success('Filme excluido com sucesso!');
    }

    return (
        <div id="meus-filmes">
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span>Não possui filme salvo.</span>}
            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.nome}</span>

                            <div>
                                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                <button onClick={() => handleDelete(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}