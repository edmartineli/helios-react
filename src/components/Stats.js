import React, {useEffect, useState} from "react"
import api from "../services/api"
import { NavLink, useParams } from 'react-router-dom';

function Stats() {

    return (
        <>
        <p>Administração</p>
        <NavLink to="/stats/elections">Eleições</NavLink>
        <p>Votos na fila ???</p>
        </>
    )
}

export default Stats