import { useState } from "react";
import { Link } from "react-router-dom";
import "./style_cadastrar.css";


export default function Cadastrar(){
    //Estilo personalizado no input type button submit
    const[style_btn_cadastrar, setStyleBtnCadastrar] = useState("btn_cadastrar_1");

    //Estilo mostrar e ocultar senha
    const[versenha1, setVerSenha1] = useState("/assets/icons/olho_fechado.png");
    const[versenha2, setVerSenha2] = useState("/assets/icons/olho_fechado.png");

    //Menssagens e estilos customizadas na validação do documento HTML
    const[invalidName, setInvalidName] = useState("");
    const[invalidNasc, setInvalidNasc] = useState("");
    const[invalidEmail, setInvalidEmail] = useState("");

    //Estilo customizado para os inputs de senhas
    const[pass1, setPass1] = useState("");
    const[pass2, setPass2] = useState("");

    //Valor dos dois campos de senha
    var[inp_pass1, setInpuPass1] = useState();
    var[inp_pass2, setInpuPass2] = useState();

    //Menssagens de erro - senhas diferentes
    const[msg_pass1, setMsgPass1] = useState("msg_pass1_2_cadastrar");
    const[msg_pass2, setMsgPass2] = useState("msg_pass2_2_cadastrar");

    //Adiciona o atributo "type" com valor "submit" no botão
    const[typeButtonSubmit, setTypeButtonSubmit] = useState();


    const invalid_Name = (txt) => { (txt === '' ? setInvalidName("input_invalid") : setInvalidName(""));}

    const invalid_Nasc = (txt) => { (txt === '' ? setInvalidNasc("input_invalid") : setInvalidNasc(""));}

    const invalid_Email = (txt) => { (txt === '' ? setInvalidEmail("input_invalid") : setInvalidEmail(""));}

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

    
    //Função principal responsável pela verificação do Formulário de Cadastro 
    const verify_form = () => {
        if (inp_pass1 !== undefined && inp_pass2 !== undefined){
            if (inp_pass1 === inp_pass2){
                setMsgPass1("msg_pass1_2_cadastrar");
                setMsgPass2("msg_pass2_2_cadastrar");
                setPass1("");
                setPass2("");

                console.log("Senhas Iguais")

                setTypeButtonSubmit("submit");
                setStyleBtnCadastrar("btn_cadastrar_2");

                let form_cadastrar = document.getElementById("form_cadastrar");

                if (form_cadastrar !== null){
                    form_cadastrar.setAttribute("method", "POST");
                    form_cadastrar.setAttribute("action", "https://965c-3-14-245-191.ngrok-free.app/future_store/back_end/Servicos/cadastrar.php");
                }
            } 
            
            if (inp_pass1 !== inp_pass2){
                setMsgPass1("msg_pass1_1_cadastrar");
                setMsgPass2("msg_pass2_1_cadastrar");

                setTypeButtonSubmit("");

                (function invalid_Pass1(txt){ 
                    if(txt === ''){ 
                        setPass1("input_invalid");
                    } else{
                        setPass1("");
                        setInpuPass1(txt);
                    }
                }());

                (function invalid_Pass2(txt){ 
                    if (txt === ''){
                        setPass2("input_invalid");
                    } else{
                        setPass2("");
                        setInpuPass2(txt);
                    }
                }());
            }
        } else{
            setInvalidEmail("input_invalid");
            setInvalidName("input_invalid");
            setInvalidNasc("input_invalid");
            setPass1("input_invalid");
            setPass2("input_invalid");
        }
    }


    return(
        <div className="cadastrar_main">
            <div className="cadastro">
                <form id="form_cadastrar">
                    <h2>Área de Cadastro</h2>
                    <fieldset id="fieldset_nome_nascimento">
                        <legend>Dados pessoais</legend>
                        <div className="nome">
                            <label>Nome:</label>
                            <input className={invalidName}
                                   type="text" 
                                   name="nome" 
                                   onChange={(txt) => invalid_Name(txt.target.value)}
                                   onInvalid={(txt) => txt.target.setCustomValidity("Preencha aqui com seu Nome...")}
                                   onInput={(txt) => txt.target.setCustomValidity("")}
                                   required
                            />
                        </div>
                        <div className="nascimento">
                            <label>Nascimento:</label>
                            <input className={invalidNasc}
                                   type="date" 
                                   name="dt_nascimento"
                                   onChange={(txt) => invalid_Nasc(txt.target.value)}
                                   onInvalid={(txt) => txt.target.setCustomValidity("Informe a Data de Nascimento")}
                                   onInput={(txt) => txt.target.setCustomValidity("")}
                                   required
                            />
                        </div>
                    </fieldset>
                    <fieldset id="fieldset_email">
                        <legend>Contato</legend>
                        <div className="email">
                            <label>E-mail:</label>
                            <input className={invalidEmail}
                                   type="email" 
                                   name="email"
                                   onChange={(txt) => invalid_Email(txt.target.value)}
                                   onInvalid={(txt) => txt.target.setCustomValidity("Informe o seu E-mail...")}
                                   onInput={(txt) => txt.target.setCustomValidity("")}
                                   required
                            />
                        </div>
                    </fieldset>
                    <div className="area_senhas">
                        <fieldset id="fieldset_senhas">
                            <legend>Credenciais</legend>
                            <div className="senhas">
                                <div className="pass_1">
                                    <label>Senha:</label>
                                    <div className="input_and_img">
                                        <input id="pass_1"
                                            className={pass1}  
                                            type="password" 
                                            name="password"
                                            onChange={(txt) => setInpuPass1(txt.target.value)}
                                            onInvalid={(txt) => txt.target.setCustomValidity("Informe uma Senha...")}
                                            onInput={(txt) => txt.target.setCustomValidity("")}
                                            required
                                            
                                        />
                                        <img id="show_pass" 
                                             src={versenha1} 
                                             alt="" 
                                             title=""
                                             onClick={show_pass1}
                                        />
                                    </div>
                                    <p id={msg_pass1}>As senhas estão diferentes <span>*</span></p>
                                </div>
                                <div className="pass_2">
                                    <label>Confirme a senha:</label>
                                    <div className="input_and_img">
                                        <input id="pass_2"
                                            className={pass2} 
                                            type="password"
                                            onChange={(txt) => setInpuPass2(txt.target.value)}
                                            onInvalid={(txt) => txt.target.setCustomValidity("Preencha novamente a senha...")}
                                            onInput={(txt) => txt.target.setCustomValidity("")}
                                            required
                                        />
                                        <img id="show_pass" 
                                             src={versenha2} 
                                             alt="" 
                                             title=""
                                             onClick={show_pass2}
                                        />
                                    </div>
                                    <p id={msg_pass2}>As senhas estão diferentes *</p>
                                </div>
                            </div>
                        </fieldset>
                        <div className="button">
                            <Link id="btn_voltar" 
                                  to="/">
                                  Voltar
                            </Link>
                            <button id="btn_limpar" 
                                    type="reset">
                                    Limpar
                            </button>
                            <input id={style_btn_cadastrar}
                                   type={typeButtonSubmit}
                                   onClick={() => verify_form()}
                                   value="Cadastrar"
                                   inputMode="none"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}