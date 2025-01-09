import { useState } from "react"

const accordions = [
    { id: 1, question: 'how are you', answer: 'FINE', isOpen: true },
    { id: 2, question: 'what are you', answer: 'Bishrav Dog', isOpen: false },
    { id: 3, question: 'what are you doin', answer: 'Eating Haddi', isOpen: false }
]

const Accordion = () => {
    const [answer, setAnswer] = useState(false)
    const [active, setActive] = useState()
    const Css = {
        textAlign: 'center',
        fontSize: '32px',
    }
    const divCss = {
        border: '1px solid red',
        width: '600px',
        marginLeft: '600px',
        marginTop: '20px',
        cursor: 'pointer'
    }
    const clickManage = (id) => {
        setAnswer(answer === id ? false : id)
        // accordions.map((accordion) => [...accordion, accordion.isOpen = !isOpen])
    }
    return (
        <>
            <span style={Css}>
                {accordions.map((accordion) => (
                    <>
                        <div style={divCss} key={accordion.id} onClick={() => clickManage(accordion.id)}>
                            {accordion.question} {answer === accordion.id ? "-" : "+"}
                        </div>
                        <div style={divCss}>{answer === accordion.id ? accordion.answer : ''}</div>
                    </>
                ))}
            </span>
        </>
    )
}

export default Accordion; 