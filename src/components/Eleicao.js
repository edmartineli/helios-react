import React, {useEffect, useState} from "react"
import api from "../services/api"
import { NavLink, useParams } from 'react-router-dom';

function Eleicao() {
    let { uuid } = useParams();
    const [election, setElection] = useState();

    useEffect(() => {
        api.get("/helios/elections/"+uuid+"/view").then(({data}) => {
            //console.log(data)
            setElection(data)
        })
    },[])

    let next_step = ""
    let link_step = undefined
    if (election) {
        if (election.election.result_released_at) {
            next_step = "Votação completa"
        }
        else {
            if (!election.election.frozen_at) {
                // Urna ainda não fechada
                if (election.election.issues_before_freeze.length>0) {
                    // Existem tarefas a serem feitas antes de fechear a urna
                    election.election.issues_before_freeze.forEach(function(a) {
                        if (next_step!='') next_step += ", "
                        next_step += a.action
                    })
                    link_step = ""
                }
                else {
                    // Urna pronta para ser fechada
                    next_step = "Feche a urna e inicie a votação"
                    if (election.election.voting_starts_at) {
                        next_step += " as " + election.election.voting_start_at
                    }
                    else {
                        next_step += " agora"
                    }
                    link_step = "/helios/elections/"+uuid+"/freeze"
                }
            }
            else {
                // Urna fechada
                if (!election.election.encrypted_tally) {
                    if (election.election.tallying_started_at) {
                        next_step = "O resultado criptografado está sendo calculado, aguarde alguns instantes e recarrege a página."
                        link_step = ""
                    }
                    else {
                        next_step = "Calcule o resultado criptografado"
                        link_step = "/helios/elections/"+uuid+"/compute_tally"
                    }
                }
                else {
                    if (election.election.result) {
                        next_step = "Liberar o resultado (o resultado abaixo pode ser visto somento por você)"
                    }
                    else {
                        if (election.election.ready_for_decryption_combination == 1) {
                            if (election.election.num_trustees == 1) {
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
        {election ? (
            <>
            <center>
            <table border="1">
                <tr><td>Nome</td><td>{election.election.name}</td></tr>
                <tr><td>Descrição</td><td>{election.election.description}</td></tr>
                <tr><td>E-Mail de ajuda</td><td>{election.election.help_email}</td></tr>
                <tr><td>Inicio</td><td>{election.election.voting_start_at}</td></tr>
                <tr><td>Fim</td><td>{election.election.voting_end_at}</td></tr>
                <tr><td>Extendida até</td><td>{election.election.voting_extended_until}</td></tr>
                <tr><td>Endereço da votação</td><td>{election.election_url}</td></tr>
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