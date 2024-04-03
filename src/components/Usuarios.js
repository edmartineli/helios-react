import React, {useEffect, useState} from "react"
import api from "../services/api"
import { NavLink, useParams } from 'react-router-dom';

function Usuarios() {
    const [obj_param, setObjParam] = useState();

    useEffect(() => {
        api.get("/auth/user/list").then(({data}) => {
            console.log(data)
            setObjParam(data)
        })
    },[])

    return (
        <>
        {obj_param && (
            <>
            <p>Usuários</p>
            <center>
            <table border="1">
                <tr>
                    <td>Tipo</td>
                    <td>Usuário</td>
                    <td>Nome</td>
                    <td>Email</td>
                </tr>
                {obj_param.users && obj_param.users.map(u =>
                    <tr>
                        <td>{u.user_type}</td>
                        <td>{u.user_id}</td>
                        <td>{u.name}</td>
                    </tr>
                )}
            </table>
            </center>
            </>
        )}

        <p><NavLink to="/">Voltar</NavLink></p>
        </>
    )
}

export default Usuarios