import React, {useEffect, useState} from "react"
import api from "../services/api"
import Eleicao from "./Eleicao";
import { NavLink } from 'react-router-dom';

function PaginaInicial() {
    const [electionsAdmin, setElectionsAdmin] = useState();

    useEffect(() => {
        api.get("/").then(({data}) => {
            //console.log(data)
            setElectionsAdmin(data.elections_administered)
        })
    },[])

    return (
        <>
        <p>Eleições administradas</p>
        <center>
        <table border="1">
            <tr>
                <td>Eleicao</td>
                <td>Eleitores</td>
            </tr>
            {electionsAdmin && electionsAdmin.map(e =>
                <tr>
                    <td><NavLink to={`/elections/${e.uuid}/view`}>{e.name}</NavLink></td>
                    <td>{e.num_voters}</td>
                </tr>
            )}
        </table>
        </center>
        </>
    )
}

export default PaginaInicial