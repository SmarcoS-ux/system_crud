import "./style_home.css";
import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div className="home_main">
            <div className="home">
                <h1>Página Inicial</h1>
                <Link id="cadastrar" to="/cadastrar">Realizar Cadastro</Link>
                <Link id="buscar" to="/buscar">Buscar dados</Link>
            </div>
        </div>
    );
}