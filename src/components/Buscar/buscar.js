import { useState, useEffect, Component } from "react";
import Axios from "axios";
import "./style_buscar.css";

/*import Editar from '../Atualizar/atualizar';*/
import Tabela from "./tabela";


export default function Buscar(){
    const[dados, setDados] = useState([]);

    const[message, setMessage] = useState();
    const[message_color, setMessageColor] = useState();
    const[icon, setIcon] = useState();
    const[icon_message, setIconMessage] = useState("message_hiden");
    const[sec_message, setSecMessage] = useState();
    const[is_order, setIsOrder] = useState(false);
    const[loader, setLoader] = useState("loader_hidden");

    const[popup_atualizar, setPopup_atualizar] = useState("atualizar_main_2"); 

    const statusConn = (dados.length === 0) ? 'vazio' : dados[0].status;

    const[atualizarTabela, setAtualizarTabela] = useState("table_body");

    const fechar_popup_atualizar = () => {
        setPopup_atualizar("atualizar_main_2");
    }

    useEffect(() => {
        messageErrorDB()
    });
    const messageErrorDB = () => {
        if (statusConn === false){
            setMessage("Um erro ocorreu no servidor. Tente novamente mais tarde.");
            setIcon("/assets/icons/botao-x.png");
            setIconMessage("message_show");
            setMessageColor("message_buscar_1");
            setSecMessage("message_buscar_1");
        }
    }

   
    const messageSuccessfulDB = () => {
        setMessage("Dados encontrados com sucesso.");
        setIcon("/assets/icons/verificado.png");
        setIconMessage("message_show");
        setMessageColor("message_buscar_2");
        setSecMessage("message_buscar_2");
    }

    const orderByName = () => {
        setIsOrder(false);

        if(!is_order){
            dados.sort((a, b) => {
                let lca = a.name;
                let lcb = b.name;
    
                if (lca < lcb) return -1;
                if (lca > lcb) return 1;
                return 0;
            });
            setAtualizarTabela("tab");    
            setIsOrder(true);
        } else{
            dados.sort((a, b) => {
                let lca = a.name;
                let lcb = b.name;
    
                if (lca > lcb) return -1;
                if (lca < lcb) return 1;
                return 0;
            });
            setAtualizarTabela("tab");
            setIsOrder(false);
        }
    }

    const orderById = () => {
        setIsOrder(true);

        if (is_order){
            dados.sort((a, b) => {
                let lca = a.id;
                let lcb = b.id;
    
                return lca - lcb;
            });
            setAtualizarTabela("tab");
            setIsOrder(false);
        } else{
            dados.sort((a, b) => {
                let lca = a.id;
                let lcb = b.id;
    
                return lcb - lca;
            });
            setAtualizarTabela("tab");
            setIsOrder(true);
        }
    }

    const orderByDtNascimento = () => {
        setIsOrder(false);

        if (!is_order){
            dados.sort((a, b) => {
                let data1 = new Date(a.dt_nascimento);
                let data2 = new Date(b.dt_nascimento);
    
                if (data1 < data2) return -1;
                if (data1 > data2) return 1;
                return 0;
            });
            setAtualizarTabela("tab");
            setIsOrder(true);     
        } else{
            dados.sort((a, b) => {
                let data1 = new Date(a.dt_nascimento);
                let data2 = new Date(b.dt_nascimento);
    
                if (data1 > data2) return -1;
                if (data1 < data2) return 1;
                return 0;
            });
            setAtualizarTabela("tab");
            setIsOrder(false);
        }
        
    }

  
    const orderByDtCadastro = () => {
        setIsOrder(true);

        if (is_order){
            dados.sort((a, b) => {
                var data1 = a.dt_cadastro;
                var data2 = b.dt_cadastro;

                let data1_str = data1.toString().substring(0, 10);
                let year1 = data1.toString().substring(6, 10);
                let month1 = data1.toString().substring(3, 5);
                let day1 = data1.toString().substring(0, 2);
                let hora1_str = data1.toString().substring(11, 21);

                let data2_str = data2?.toString().substring(0, 10);
                let year2 = data2?.toString().substring(6, 10);
                let month2 = data2?.toString().substring(3, 5);
                let day2 = data2?.toString().substring(0, 2);
                let hora2_str = data2?.toString().substring(11, 21);

                let dh1 = year1 + "-" + month1 + "-" + day1 + " " + hora1_str;
                let dh2 = year2 + "-" + month2 + "-" + day2 + " " + hora2_str;


                let data_hora_format_1 = new Date(dh1);
                let data_hora_format_2 = new Date(dh2);

                
                if (data_hora_format_1 < data_hora_format_2) return -1;
                if (data_hora_format_1 > data_hora_format_2) return 1;
            
                return 0;
                
            });
            setAtualizarTabela("tab");
            setIsOrder(false);

        } else{
            dados.sort((a, b) => {
                var data1 = a.dt_cadastro;
                var data2 = b.dt_cadastro;

                let data1_str = data1.toString().substring(0, 10);
                let year1 = data1.toString().substring(6, 10);
                let month1 = data1.toString().substring(3, 5);
                let day1 = data1.toString().substring(0, 2);
                let hora1_str = data1.toString().substring(11, 21);

                let data2_str = data2?.toString().substring(0, 10);
                let year2 = data2?.toString().substring(6, 10);
                let month2 = data2?.toString().substring(3, 5);
                let day2 = data2?.toString().substring(0, 2);
                let hora2_str = data2?.toString().substring(11, 21);

                let dh1 = year1 + "-" + month1 + "-" + day1 + " " + hora1_str;
                let dh2 = year2 + "-" + month2 + "-" + day2 + " " + hora2_str;


                let data_hora_format_1 = new Date(dh1);
                let data_hora_format_2 = new Date(dh2);

                
                if (data_hora_format_1 > data_hora_format_2) return -1;
                if (data_hora_format_1 < data_hora_format_2) return 1;
                return 0;

            });
            setAtualizarTabela("tab");
            setIsOrder(true);
        }
    }


    const orderBydtAtualizacao = () => {
        setIsOrder(false);

        if (!is_order){
            dados.sort((a, b) => {
                let data1 = a.dt_atualizacao;
                let data2 = b.dt_atualizacao;

                let year1 = data1.toString().substring(6, 10);
                let month1 = data1.toString().substring(3, 5);
                let day1 = data1.toString().substring(0, 2);

                let year2 = data2?.toString().substring(6, 10);
                let month2 = data2?.toString().substring(3, 5);
                let day2 = data2?.toString().substring(0, 2);

                let dh1 = year1 + "-" + month1 + "-" + day1;
                let dh2 = year2 + "-" + month2 + "-" + day2;

                let new_data1 = new Date(dh1);
                let new_data2 = new Date(dh2);
    
                if (new_data1 < new_data2) return -1;
                if (new_data1 > new_data2) return 1;
                return 0;
            });
            setAtualizarTabela("tab");
            setIsOrder(true);

        } else{
            dados.sort((a, b) => {
                let data1 = a.dt_atualizacao;
                let data2 = b.dt_atualizacao;

                let year1 = data1.toString().substring(6, 10);
                let month1 = data1.toString().substring(3, 5);
                let day1 = data1.toString().substring(0, 2);

                let year2 = data2?.toString().substring(6, 10);
                let month2 = data2?.toString().substring(3, 5);
                let day2 = data2?.toString().substring(0, 2);

                let dh1 = year1 + "-" + month1 + "-" + day1;
                let dh2 = year2 + "-" + month2 + "-" + day2;

                let new_data1 = new Date(dh1);
                let new_data2 = new Date(dh2);
    
                if (new_data1 > new_data2) return -1;
                if (new_data1 < new_data2) return 1;
                return 0;
            });

            setAtualizarTabela("tab");
            setIsOrder(false);
        }
    }


    const orderByEmail = () => {
        setIsOrder(false);

        if (!is_order){
            dados.sort((a, b) => {
                let email1 = a.e_mail;
                let email2 = b.e_mail;
    
                if (email1 < email2) return -1;
                if (email1 > email2) return 1;
                return 0;
            });
            setAtualizarTabela("tab");
            setIsOrder(true);
        } else{
            dados.sort((a, b) => {
                let email1 = a.e_mail;
                let email2 = b.e_mail;
    
                if (email1 > email2) return -1;
                if (email1 < email2) return 1;
                return 0;
            });
            setAtualizarTabela("tab");
            setIsOrder(false);
        } 
    }
 
    //Função responsável pela busca de dados no back_end
    const buscar = () => {
        setLoader("loader");
        Axios.post("https://3561-138-59-221-115.ngrok-free.app/future_store/back_end/Servicos/buscar.php")
            .then(function(result){
                setDados(result.data);
                messageSuccessfulDB();
                setLoader("loader_hidden");
            })
            .catch(function(error){
                setMessage("Um erro ocorreu no servidor. Tente novamente mais tarde.");
                setIcon("/assets/icons/botao-x.png");
                setIconMessage("message_show");
                setMessageColor("message_buscar_1");
                setSecMessage("message_buscar_1");
                setLoader("loader_hidden");    
                let log = error;
            })
    }

  
    return(
        <div className="buscar">
            <div className="area_tabela">
                <div className="header_buscar">
                    <div className="title">
                        <h2>Dados no Sistema</h2>
                        <div className={sec_message}>
                            <p id={message_color}>{message}</p>
                            <img className={icon_message} src={icon}/>
                        </div>
                    </div>
                    <div className="button_buscar">
                        <div id={loader}></div>
                        <button onClick={buscar}>Buscar dados</button>
                    </div>
                </div>
                
                <div className="tab">
                    <Tabela 
                        fechar_popup_atualizar={fechar_popup_atualizar} //Fechar a janela de atualização dos dados
                        messageErrorDB={messageErrorDB} //Messagem de erro ao buscar dados
                        popup_atualizar={popup_atualizar} //Variável de estado da janela de atualização dos dados
                        setPopup_atualizar={setPopup_atualizar} //Função seter da variável de estado da janela de atualização dos dados
                        statusConn={statusConn} //Status da conexão
                        dados={dados} //Dados recebidos do back_end
                        styleTabela={atualizarTabela} //Re-render da tabela
                        orderByDtCadastro={orderByDtCadastro} //Ordenação pela data de cadastro
                        orderByDtNascimento={orderByDtNascimento} //Ordenação pela data de nascimento
                        orderByEmail={orderByEmail} //ordenação pelo e-mail
                        orderById={orderById} //ordenação pelo id
                        orderByName={orderByName} //Ordenação pelo nlme
                        orderBydtAtualizacao={orderBydtAtualizacao} //ordenação pela data de atualização
                    />
                </div>
            </div>
        </div>
    );

    
}
