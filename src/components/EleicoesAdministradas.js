import React, {useEffect, useState} from "react"
import api from "../services/api"
import { NavLink, useParams } from 'react-router-dom';

function EleicoesAdministradas() {
    const [elections, setElections] = useState();
    const [obj_param, setObjParam] = useState();

    useEffect(() => {
        api.get("/helios/elections/administered").then(({data}) => {
            //console.log(data)
            setElections(data.elections)
            setObjParam(data)
        })
    },[])

    return (
        <>
        {obj_param ? (<>
            <p>Eleições que você administra</p>
            <center>
            <table border="1">
                <tr>
                    <td>Eleicao</td>
                    <td>Eleitores</td>
                    <td>Votos</td>
                </tr>
                {obj_param.elections && obj_param.elections.map(e =>
                    <tr>
                        <td>{e.name}</td>
                        <td>{e.num_voters}</td>
                        <td>{e.num_cast_votes}</td>
                    </tr>
                )}
            </table>
            </center>
        </>):
        (<></>)}

        <p><NavLink to={`/`}>Voltar</NavLink></p>
        </>
    )
}

export default EleicoesAdministradas