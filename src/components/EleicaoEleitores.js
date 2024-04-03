import React, {useEffect, useState} from "react"
import api from "../services/api"
import { NavLink, useParams } from 'react-router-dom';

function EleicaoEleitores() {
    let { uuid } = useParams();
    const [obj_param, setObjParam] = useState();

    useEffect(() => {
        api.get("/helios/elections/"+uuid+"/voters/list").then(({data}) => {
            //console.log(data)
            setObjParam(data)
        })
    },[])

    return (
        <>

        {obj_param ? (<>
            <p>Eleição: {obj_param.election.name}</p>
        
            <p>Eleitores</p>
            
            <center>
            <table border="1">
                <tr>
                    <td>Ação</td>
                    <td>Login</td>
                    <td>E-Mail</td>
                    <td>Nome</td>
                    <td>Assinatura da Cédula</td>
                </tr>
                {obj_param.voters && obj_param.voters.map(v =>
                    <tr>
                        <td><NavLink to={`/elections/${uuid}/voters/view`}>Remover</NavLink></td>
                        <td>{v.voter_login_id}</td>
                        <td>{v.voter_email}</td>
                        <td>{v.voter_name}</td>
                        <td>{v.vote_hash}</td>
                    </tr>
                )}
            </table>
            </center>
        
        </>):
        (<></>)}


        <p><NavLink to={`/elections/${uuid}/view`}>Voltar</NavLink></p>
        </>
    )
}

export default EleicaoEleitores