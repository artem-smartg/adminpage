import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite';
import { Context } from '..';


const Answer = observer(() => {

    const { question } = useContext(Context)

    return (
        <div>
            <div>
                <h3>Answer</h3>
                {question.answer.map(answer =>
                    <div key={answer.question}>{answer.question} {answer.description}</div>
                )}
            </div>
        </div>
    )
})

export default Answer