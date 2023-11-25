import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Home/home";
import Cadastrar from "../Cadastrar/cadastrar";
import Buscar from  "../Buscar/buscar";    

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>   
                <Route exact path="/cadastrar" element={<Cadastrar/>}/>
                <Route exact path="/buscar" element={<Buscar/>}/> 
            </Routes>        
        </BrowserRouter>
    );
}