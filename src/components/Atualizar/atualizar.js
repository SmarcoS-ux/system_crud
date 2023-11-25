import { useState } from "react";
import "./style_atualizar.css";

export default function Atualizar(props){
    //Adiciona o atributo "type" com valor "submit" no botão
    const[typeButtonSubmit, setTypeButtonSubmit] = useState("");
    const[typeButtonDelete, setTypeButtonDelete] = useState("");

    //Estilo mostrar e ocultar senha
    const[versenha1, setVerSenha1] = useState("/assets/icons/olho_fechado.png");
    const[versenha2, setVerSenha2] = useState("/assets/icons/olho_fechado.png");

    //Valor dos dois campos de senha
    var[inp_pass1, setInpuPass1] = useState();
    var[inp_pass2, setInpuPass2] = useState();

    //Menssagens de erro - senhas diferentes
    const[msg_pass1, setMsgPass1] = useState("msg_pass1_2_atualizar");
    const[msg_pass2, setMsgPass2] = useState("msg_pass2_2_atualizar");

    //Menssagens customizadas na validação do documento HTML
    const[invalidName, setInvalidName] = useState("");
    const[invalidNasc, setInvalidNasc] = useState("");
    const[invalidEmail, setInvalidEmail] = useState("");


    const invalid_Name = (txt) => { (txt === '' ? setInvalidName("input_invalid") : setInvalidName("")); }

    const invalid_Nasc = (txt) => { (txt === '' ? setInvalidNasc("input_invalid") : setInvalidNasc("")); }

    const invalid_Email = (txt) => { (txt === '' ? setInvalidEmail("input_invalid") : setInvalidEmail("")); }


    (function insertInputs(){
        let nome = document.getElementById("nome");
        let dt_nascimento = document.getElementById("dt_nascimento");
        let email = document.getElementById("email");
        let senha = document.getElementById("pass_1");
        let codigo = document.getElementById("cod_user");

        if (props.dados.nome !== undefined){
            nome.setAttribute("value", props.dados.nome);
        }
        if (props.dados.dt_nascimento !== undefined){
            let data = props.dados.dt_nascimento.replaceAll("/", "-");
            let day = data.substring(0, 2);
            let month = data.substring(3, 5);
            /*let format_month = (month > 10) ? month : `0${month}`*/
            let year = data.substring(6, 10);

            let new_data = year+"-"+month+"-"+day;
            
            dt_nascimento.setAttribute("value", new_data);
            
        }
        if (props.dados.email !== undefined){
            email.setAttribute("value", props.dados.email);
        }
        if (props.dados.senha !== undefined){
            senha.setAttribute("value", props.dados.senha);
        }
        if (props.dados.id !== undefined){
            if(props.dados.id < 10){
                let format_cod = `0${props.dados.id}`;
                codigo.setAttribute("value", format_cod);
            } else{
                codigo.setAttribute("value", props.dados.id);
            }
        }
    }());

    const alertAtualizar = () => {
        let resposta = window.confirm("Deseja mesmo atualizar os Dados?");

        if(resposta === true){
            let Pass1 = document.getElementById("pass_1").value;
            let Pass2 = document.getElementById("pass_2").value;
            
            if (Pass1 == Pass2){
                setMsgPass1("msg_pass1_2_atualizar");
                setMsgPass2("msg_pass1_2_atualizar");

                setTypeButtonSubmit("submit");
                setTypeButtonDelete("");

                let form_atualizar = document.getElementById("form_atualizar");
                form_atualizar.setAttribute("method", "POST");
                form_atualizar.setAttribute("action", "https://965c-3-14-245-191.ngrok-free.app/future_store/back_end/Servicos/atualizar.php");
                
            } 
            
            if (Pass1 != Pass2){
                setTypeButtonSubmit("");

                setMsgPass1("msg_pass1_1_atualizar");
                setMsgPass2("msg_pass2_1_atualizar");
            }
            
        } 
    }

    const alertDelete = () => {
        let resposta = window.confirm("Deseja mesmo Excluir este registro?");

        if(resposta){
            setTypeButtonDelete("submit");
            setTypeButtonSubmit("");

            let form_atualizar = document.getElementById("form_atualizar");
            form_atualizar.setAttribute("action", "https://965c-3-14-245-191.ngrok-free.app/future_store/back_end/Servicos/excluir.php");
            form_atualizar.setAttribute("method", "POST");

        }
    }

    const show_pass1 = () => {
        if (document.getElementById("pass_1").type === 'password'){
            setVerSenha1("/assets/icons/olho_aberto.png");
            document.getElementById("pass_1").type = 'text';
        } else{
            setVerSenha1("/assets/icons/olho_fechado.png");
            document.getElementById("pass_1").type = 'password';
        }
        
    }

    const show_pass2 = () => {
        if (document.getElementById("pass_2").type === 'password'){
            setVerSenha2("/assets/icons/olho_aberto.png");
            document.getElementById("pass_2").type = 'text';
        } else{
            setVerSenha2("/assets/icons/olho_fechado.png");
            document.getElementById("pass_2").type = 'password';
        }
        
    }

    

    return (
        <div className={props.popup_atualizar}>
            <div className="atualizar">
                <div className="header_popup">
                    <div className="title">
                        <h2>Atualizar dados</h2>
                    </div>
                    <div className="button_fechar">
                        <button onClick={props.fechar_popup_atualizar}>
                            <img src="/assets/icons/fechar.png"/>
                        </button>
                    </div>
                </div>
                <form id="form_atualizar">
                    <fieldset id="fieldset_nome_nascimento_atualizar">
                            <legend>Dados pessoais</legend>
                            <div className="nome_atualizar">
                                <label>Nome:</label>
                                <input type="text" 
                                       id="nome"
                                       className={invalidName}
                                       name="nome"
                                       onChange={(txt) => invalid_Name(txt.target.value)}
                                       required
                                />
                            </div>
                            <div className="nascimento_atualizar">
                                <label>Nascimento:</label>
                                <input type="date" 
                                       id="dt_nascimento"
                                       className={invalidNasc}
                                       name="dt_nascimento"
                                       onChange={(txt) => invalid_Nasc(txt.target.value)}
                                       required
                                />
                            </div>
                    </fieldset>
                    <fieldset id="fieldset_email_atualizar">
                        <legend>Contato</legend>
                        <div className="email">
                            <label>E-mail:</label>
                            <input type="email" 
                                   id="email"
                                   className={invalidEmail}
                                   name="email"
                                   onChange={(txt) => invalid_Email(txt.target.value)}
                                   required
                            />
                        </div>
                    </fieldset>
                    <fieldset id="fieldset_senhas_atualizar">
                        <legend>Credenciais</legend>
                        <div className="senhas_atualizar">
                            <div className="pass_1_atualizar">
                                <label>Senha:</label>
                                <input id="pass_1" 
                                       type="password" 
                                       name="password"
                                       onChange={(txt) => setInpuPass1(txt.target.value)}
                                       required
                                />
                                <img id="show_pass_atualizar_1" 
                                     src={versenha1}
                                     alt="" 
                                     title=""
                                     onClick={show_pass1}
                                />
                                <p id={msg_pass1}>As senhas estão diferentes *</p>
                            </div>
                            <div className="pass_2_atualizar">
                                <label>Confirme a senha:</label>
                                <input id="pass_2" 
                                       type="password"
                                       onChange={(txt) => setInpuPass2(txt.target.value)}
                                       required
                                />
                                <img id="show_pass_atualizar_2" 
                                     src={versenha2} 
                                     alt="" 
                                     title=""
                                     onClick={show_pass2}
                                />
                                <p id={msg_pass2}>As senhas estão diferentes *</p>
                            </div>
                        </div>
                    </fieldset>
                    <div className="cod_e_buttons">
                        <div className="area_cod">
                            <input id="cod_user" 
                                   type="text"
                                   name="id" 
                            />
                            <p>Cód.</p>
                        </div>
                        <div className="buttons_atualizar">
                            <input id="excluir"
                                   type={typeButtonDelete}
                                   name="button_submit" 
                                   value="Excluir"
                                   onClick={() => alertDelete()}
                                   inputMode="none"
                            />
                            <input id="atualizar" 
                                   type={typeButtonSubmit} 
                                   name="button_submit"
                                   value="Atualizar"
                                   onClick={() => alertAtualizar()}
                                   inputMode="none"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}