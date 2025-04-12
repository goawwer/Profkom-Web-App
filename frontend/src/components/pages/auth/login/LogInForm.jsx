import React from 'react';
import s from './LogInForm.module.scss'
import { useForm } from 'react-hook-form';
import handleLogin from '../../../../hooks/axios/POST/handleLogin';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const LogInForm = () => {
    const { register, handleSubmit, formState: { errors }, trigger, } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const [isToken, setIsToken] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const [returnData, error, isToken] = await handleLogin(data)
        setIsToken(isToken)
    }

    useEffect(() => {
        const getFromLocalStorage = () => {
            const value = localStorage.getItem("profkomUserToken")
            if (!localStorage.getItem("profkomUserToken")) {
                throw new Error('ПОЛЬЗОВАТЕЛЬ НЕ АВТОРИЗИРОВАН !')
            } else {
                return value
            }
        }
        try {
            const gfls = getFromLocalStorage()
            navigate('/')
            console.log(isToken)
        } catch (error) {
            console.log(error.message)
        }
        
    }, [isToken])

    return (
            <form className={s.authForm} onSubmit={handleSubmit(onSubmit)}>
                <label>имя пользователя
                    <input  {...register('username', 
                        { required: 'это поле обязательно', 
                        onChange: () => trigger('username') 
                    })} 
                    type='text'></input>
                </label>
                {errors.username && <p className={s.authForm__errors}>{errors.username.message}</p>}

                <label>пароль
                    <input  {...register('password', 
                            { required: 'это поле обязательно',
                            minLength: {
                                value: 3,
                                message: 'пароль должен содержать не меньше 8 символов'
                            },
                            onChange: () => trigger('password')
                        })} 
                        type='password'>
                    </input> 
                </label>
                {errors.password && <p className={s.authForm__errors}>{errors.password.message}</p>}

                <div className={s.authForm__buttons}>
                        <a href ='#'>забыли пароль?</a>
                        <button type="submit">ВХОД</button>
                </div>
                
            </form>
    );
};


export default LogInForm;