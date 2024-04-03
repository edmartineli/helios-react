import React, {useEffect, useState} from "react"
import api from "../services/api"
import { NavLink, useParams } from 'react-router-dom';

function EleicaoQuestoes() {
    let { uuid } = useParams();
    const [obj_param, setObjParam] = useState();

    useEffect(() => {
        api.get("/helios/elections/"+uuid+"/questions").then(({data}) => {
            setObjParam(data)
        })
    },[])

    return (
        <>
        {obj_param && (
            <>
            <p>Eleição:{obj_param.election.name}</p>
        
            <p>Questões</p>

            {obj_param.questions_json && obj_param.questions_json.map(q =>
                <>
                <p>{q.question}</p>
                <ul>
                {q.answers && q.answers.map(q =>
                    <>
                    <li>{q}</li>
                    </>
                )}
                </ul>
                </>
            )}
            </>
        )}

        <p><NavLink to={`/elections/${uuid}/view`}>Voltar</NavLink></p>
        </>
    )
}

export default EleicaoQuestoes