import React, {useEffect, useState} from "react"
import api from "../services/api"
import { NavLink, useParams } from 'react-router-dom';

function EleicaoQuestoes() {
    let { uuid } = useParams();
    const [questoes, setQuestoes] = useState();

    useEffect(() => {
        api.get("/helios/elections/"+uuid+"/questions").then(({data}) => {
            let userObj = JSON.parse(data.questions_json);
            setQuestoes(userObj)
        })
    },[])

    return (
        <>
        <p>Questões</p>

        {questoes && questoes.map(q =>
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

        <p><NavLink to={`/elections/${uuid}/view`}>Voltar</NavLink></p>
        </>
    )
}

export default EleicaoQuestoes