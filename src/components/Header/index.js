import './styles.css';
import {Link} from 'react-router-dom';

export default function Header(){
    return(
        <header>
            <Link className="logo" to="/" >Catalogo</Link>
            <Link className="favoritos" to="/favoritos" >Salvos</Link>
        </header>
    )
}