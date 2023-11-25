import { useState } from "react";
import "./style_buscar.css";

import Editar from '../Atualizar/atualizar';

export default function Tabela(props){
    const[data_obj, setDataObject] = useState({}); //

    const abrir_popup_atualizar = (id, nome, dt_nasc, dt_cadastro, email, senha) => { //
        props.setPopup_atualizar("atualizar_main_1");
        var data = {
            id: id,
            nome: nome,
            dt_nascimento: dt_nasc,
            dt_cadastro: dt_cadastro,
            email: email,
            senha: senha
        }
        setDataObject(data);
    }

    return(
        <div>
            <table className="table_2"> 
                <thead>
                    <tr>
                        <th id="column_cod_thead" 
                            className="column_cod"
                            onClick={() => props.orderById()}>
                            Código
                        </th>
                        <th id="column_nome_thead" 
                            className="column_nome" 
                            onClick={() => props.orderByName()}>
                            Nome
                        </th>
                        <th id="column_dt_nascimento_thead" 
                            className="column_dt_nasc"
                            onClick={() => props.orderByDtNascimento()}>
                            Data de Nascimento
                        </th>
                        <th id="column_dt_cadastro_thead" 
                            className="column_dt_cadastro"
                            onClick={() => props.orderByDtCadastro()}>
                            Data de Cadastro
                        </th>
                        <th id="column_dt_atualizacao_thead" 
                            className="column_dt_atualizacao"
                            onClick={() => props.orderBydtAtualizacao()}>
                            Última atualização
                        </th>
                        <th id="column_email_thead" 
                            className="column_email"
                            onClick={() => props.orderByEmail()}>
                            E-mail
                        </th>    
                        <th id="column_button_thead"
                            onClick={() => props.orderByEmail()}>
                        </th>
                    </tr>    
                </thead> 
                <tbody id={props.styleTabela}
                       className="tbody_scroll">
                    {(props.statusConn === true) ? props.dados.map((element, index) => (
                        index > 0 ?
                        <tr key={index}>
                            <td className="column_cod">{element.id}</td>
                            <td className="column_nome">{element.name}</td>
                            <td className="column_dt_nasc">{element.dt_nascimento}</td>
                            <td className="column_dt_cadastro">{element.dt_cadastro}</td>
                            <td className="column_dt_atualizacao">{element.dt_atualizacao}</td>
                            <td className="column_email">{element.e_mail}</td>
                            <td className="botao_editar"><button onClick={() => abrir_popup_atualizar(element.id, element.name, element.dt_nascimento, element.dt_cadastro, element.e_mail, element.pass)}><img src="/assets/icons/editar.png"/></button></td>
                        </tr> : ""
                    )) : props.messageErrorDB} 
                    <Editar popup_atualizar={props.popup_atualizar}
                            fechar_popup_atualizar={props.fechar_popup_atualizar}
                            dados={data_obj}
                    />
                </tbody>  
            </table>            
        </div>
    );
}