import React, {useEffect, useState} from "react"
import api from "../services/api"
import { NavLink, useParams } from 'react-router-dom';

function EleicaoEleitores() {
    let { uuid } = useParams();
    const [voters, setVoters] = useState();

    useEffect(() => {
        api.get("/helios/elections/"+uuid+"/voters/list").then(({data}) => {
            //console.log(data)
            setVoters(data.voters)
        })
    },[])

    return (
        <>
        <p>Eleitores</p>
        <center>
        <table border="1">
            {voters && voters.map(v =>
                <tr>
                    <td>{v.voter_name}</td>
                </tr>
            )}
        </table>
        </center>
        <p><NavLink to={`/elections/${uuid}/view`}>Voltar</NavLink></p>
        </>
    )
}

export default EleicaoEleitores