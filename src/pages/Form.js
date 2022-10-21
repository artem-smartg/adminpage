import React, { useContext, useEffect, useState } from 'react'
import MaskedInput from 'react-text-mask'
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import toast, { Toaster } from 'react-hot-toast';
import { fetchQuestion } from '../http/questionAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchAnswer } from '../http/answerAPI';
import axios from 'axios';


const Form = observer(() => {

    const navigate = useNavigate()
    const { question } = useContext(Context)

    useEffect(() => {
        fetchQuestion().then(data => question.setQuestion(data))
        fetchAnswer().then(data => question.setAnswer(data))
    }, [])

    

    const getQuestion = async () => {
    }

    const [firstName, setName] = useState('')
    const [surName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState()

    const [nameDirty, setNameDirty] = useState(false)
    const [lastNameDirtry, setLastNameDirty] = useState(false)
    const [emailDirtry, setEmailDirty] = useState(false)

    const [nameError, setNameError] = useState('Поле не может быть пустым')
    const [lastNameError, setLastNameError] = useState('Поле не может быть пустым')
    const [emailError, setEmailError] = useState('Поле не может быть пустым')
    const [formValid, setFormValid] = useState(false)


    useEffect(() => {
        if (nameError || lastNameError) {
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }
    }, [nameError, lastNameError])

    const nameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 2) {
            setNameError('Некорректная длина')
            if (!e.target.value) {
                setNameError('Поле не может быть пустым')
            }
        }
        else {
            setNameError('')
        }
    }
    const lastNameHandler = (e) => {
        setLastName(e.target.value)
        if (e.target.value.length < 2) {
            setLastNameError('Некорректная длина')
            if (!e.target.value) {
                setLastNameError('Поле не может быть пустым')
            }
        }
        else {
            setLastNameError('')
        }
    }
    const emailHandler = (e) => {
        setEmail(e.target.value)
        const res = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!res.test(String(e.target.value).toLowerCase())) {
            setEmailError('Не верный email')
            if (!e.target.value) {
                setEmailError('Поле не может быть пустым')
            }
        }
        else {
            setEmailError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'lastname':
                setLastNameDirty(true)
                break
            case 'email':
                setEmailDirty(true)
                break
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        // console.log(JSON.stringify(data));
    }

    const location = useLocation()
    const isLogin = location.pathname === 'user/login'
    // console.log(isLogin)

    const click = async () => {
        try {
            let data
            if (isLogin) {
                data = await login()
            }
            else {
                data = await registration(firstName, surName, phone, email, gender)
                console.log(data)
                console.log(JSON.parse(localStorage.getItem('localStorageUsers')))
                console.log(localStorage.getItem('token'))
            }
            toast.success('Successfully!')
        }
        catch (e) {
            toast.error(e.response.data.message)
            // alert(e.response.data.message)
        }
    }




    return (
        <div className="register container-fluid d-flex">
            <h2>Для початку тестування пройдіть експрес-реєстацію</h2>
            <form className='register__contents d-flex' onSubmit={handleSubmit(onSubmit)}>

                <div className="register__upBlock col-lg-7 col-md-6 col-6 d-flex">
                    <div className="register__content">
                        <input
                            className='input'
                            type="text"
                            placeholder='Имя'
                            name='name'
                            value={firstName}
                            onBlur={e => blurHandler(e)}
                            onChange={e => nameHandler(e)}
                        />
                        {(nameDirty && nameError) && <div style={{ color: 'red' }}>{nameError}</div>}
                        <input
                            className='input'
                            placeholder='Фамилия'
                            type="text"
                            name='lastname'
                            value={surName}
                            onBlur={e => blurHandler(e)}
                            onChange={e => lastNameHandler(e)}
                        />
                        {(lastNameDirtry && lastNameError) && <div style={{ color: 'red' }}>{lastNameError}</div>}
                    </div>

                    <div className="register__content">
                        <div>
                            <MaskedInput
                                className='input'
                                name='phone'
                                guide={true}
                                showMask={true}
                                mask={['+', '3', '8', '(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}

                                onBlur={e => blurHandler(e)}

                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </div>

                        <input
                            className='input'
                            placeholder='email'
                            type="email"
                            name='email'
                            value={email}
                            onBlur={e => blurHandler(e)}
                            onChange={e => emailHandler(e)}
                        />
                        {/* {(emailDirtry && emailError) && <div style={{ color: 'red' }}>{emailError}</div>} */}
                    </div>
                </div>

                <div className="register__box col-lg-7 col-md-6 col-6 d-flex">
                    <div className='checkbox__block d-flex'>
                        <label className="checkbox__tap d-flex">
                            <input
                                className='checkbox'
                                type="radio"
                                name="gender"
                                value='male'
                                // value={gender}
                                onClick={e => setGender(e.target.value)}
                                {...register("gender", { required: 'Это важно, выберите ваш пол' })}
                            />
                            <span>Чоловіча</span>
                        </label>
                        {errors.gender && <span style={{ color: 'red' }}>{errors.gender.message}</span>}


                        <label className="checkbox__tap d-flex">
                            <input
                                className='checkbox'
                                type="radio"
                                name="gender"
                                value='female'
                                // value={gender}
                                onClick={e => setGender(e.target.value)}
                                {...register("gender", { required: 'Это важно, выберите ваш пол' })}
                            />
                            <span>Жіноча</span>
                        </label>
                        {errors.gender && <span style={{ color: 'red' }}>{errors.gender.message}</span>}

                    </div>

                    <div className="register__button_block">

                        <button
                            value='Submit'
                            type='submit'
                            className='register__button'
                            disabled={!formValid}
                            onClick={click}
                        >
                            Відправити
                        </button>
                        <div>
                            <Toaster position="top-right" />
                        </div>

                    </div>
                </div>
            </form>

            <button
                className='register__button'
                onClick={getQuestion}
            >
                Получить вопросы
            </button>
            <button
                className='register__button'
                // onClick={getAnswer}
            >
                Получить ответы
            </button>

        </div>
    )
})


export default Form