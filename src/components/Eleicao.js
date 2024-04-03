import React, {useEffect, useState} from "react"
import api from "../services/api"
import { NavLink, useParams } from 'react-router-dom';

function Eleicao() {
    let { uuid } = useParams();
    const [obj_param, setObjParam] = useState();

    useEffect(() => {
        api.get("/helios/elections/"+uuid+"/view").then(({data}) => {
            //console.log(data)
            setObjParam(data)
        })
    },[])

    let next_step = ""
    let link_step = undefined
    if (obj_param) {
        if (obj_param.election.result_released_at) {
            next_step = "Votação completa"
        }
        else {
            if (!obj_param.election.frozen_at) {
                // Urna ainda não fechada
                if (obj_param.election.issues_before_freeze.length>0) {
                    // Existem tarefas a serem feitas antes de fechear a urna
                    obj_param.election.issues_before_freeze.forEach(function(a) {
                        if (next_step!='') next_step += ", "
                        next_step += a.action
                    })
                    link_step = ""
                }
                else {
                    // Urna pronta para ser fechada
                    next_step = "Feche a urna e inicie a votação"
                    if (obj_param.election.voting_starts_at) {
                        next_step += " as " + obj_param.election.voting_start_at
                    }
                    else {
                        next_step += " agora"
                    }
                    link_step = "/helios/elections/"+uuid+"/freeze"
                }
            }
            else {
                // Urna fechada
                if (!obj_param.election.encrypted_tally) {
                    if (obj_param.election.tallying_started_at) {
                        next_step = "O resultado criptografado está sendo calculado, aguarde alguns instantes e recarrege a página."
                        link_step = ""
                    }
                    else {
                        next_step = "Calcule o resultado criptografado"
                        link_step = "/helios/elections/"+uuid+"/compute_tally"
                    }
                }
                else {
                    if (obj_param.election.result) {
                        next_step = "Liberar o resultado (o resultado abaixo pode ser visto somento por você)"
                    }
                    else {
                        if (obj_param.election.ready_for_decryption_combination == 1) {
                            if (obj_param.election.num_trustees == 1) {
                                next_step = 'Calcule o resultado descriptografado'
                                link_step = ""
                            }
                            else {
                                next_step = "Combine a descriptografia dos curadores e calcule o resultado"
                                link_step = ""
                            }
                        }
                        else {
                            next_step = "Curadores (para descriptografia)"
                            link_step = "/helios/elections/"+uuid+"/trustees/view"
                        }
                    }
                }
            }
        }
    }

    return (
        <>
        {obj_param ? (
            <>
            <center>
            <table border="1">
                <tr><td>Nome</td><td>{obj_param.election.name}</td></tr>
                <tr><td>Descrição</td><td>{obj_param.election.description}</td></tr>
                <tr><td>E-Mail de ajuda</td><td>{obj_param.election.help_email}</td></tr>
                <tr><td>Inicio</td><td>{obj_param.election.voting_start_at}</td></tr>
                <tr><td>Fim</td><td>{obj_param.election.voting_end_at}</td></tr>
                <tr><td>Extendida até</td><td>{obj_param.election.voting_extended_until}</td></tr>
                <tr><td>Endereço da votação</td><td>{obj_param.election_url}</td></tr>
            </table>
            </center>
            <p>
                <NavLink to={`/elections/${uuid}/questions`}>Questões</NavLink> | 
                <NavLink to={`/elections/${uuid}/voters/view`}>Eleitores</NavLink> | 
                <NavLink to="/">Curadores</NavLink>
            </p>
            
            {link_step ? (
                <>
                <p>Próximo passo: <NavLink to={link_step}>{next_step}</NavLink></p>
                </>
            ):(
                <>
                <p>Próximo passo: {next_step}</p>
                </>
            )}
            </>
        ) : (
            <>
            <p>Votação não encontrada</p>
            </>
        )}
        <p><NavLink to="/">Voltar</NavLink></p>
        </>
    )
}

export default Eleicao