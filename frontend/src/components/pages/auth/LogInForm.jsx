import React from 'react';
import s from './AuthForm.module.scss'
import { useForm } from 'react-hook-form';
import handleLogin from './actions/handleLogin';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getFromLocalStorage from "../../../hooks/getFromLocalStorage"


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
        if (returnData) setIsToken(isToken)
    }

    useEffect(() => {
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
                <label>эл. почта
                    <input  
                        {...register('username', 
                            { required: 'это поле обязательно', 
                                onChange: () => trigger('username') 
                        })} 
                        type='text'
                    />
                </label>
                {errors.username && <p className={s.authForm__errors}>{errors.username.message}</p>}

                <label>пароль
                    <input  {...register('password', 
                            { required: 'это поле обязательно',
                            onChange: () => trigger('password')
                        })} 
                        type='password'
                    /> 
                </label>
                {errors.password && <p className={s.authForm__errors}>{errors.password.message}</p>}

                <div className={s.authForm__buttons}>
                        <button className={s.authForm__mainButton} type="submit">ВХОД</button>
                        <button 
                            className={s.authForm__sideButton} 
                            onClick={()=>navigate('/auth/registration')}
                            type='button'
                        >
                            зарегистрироваться?
                        </button>
                </div>
                
            </form>
    );
};


export default LogInForm;