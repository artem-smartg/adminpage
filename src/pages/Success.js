import React from "react";
import { Button, Container } from 'react-bootstrap';
import './module.scss'

const Success = () => {

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
        >
            <div className="d-flex flex-column align-items-center success__page">
                <h1 className="success__title">Вітаємо!</h1>
                <p className="success__text">Ви успішно пройшли тестування на відповідний рівень знань української мови. Ви можете завантажити Ваш сертифікат, натиснувши кнопку нижче. Електронна версія сертифікату вже надійшла на Вашу пошту.</p>

                <button
                    className="success__btn mt-5"
                    // variant={"outline-success"}
                >
                    Завантажити
                </button>
            </div>

        </Container>

    );
}

export default Success;