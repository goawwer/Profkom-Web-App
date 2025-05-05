import React from 'react';
import s from './AuthForm.module.scss'
import { useForm } from 'react-hook-form';
import handleRegister from './actions/handleRegister';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors }, trigger, } = useForm({
        defaultValues: {
            username: '',
            email: '',
            group_name: '',
            password: ''
        }
    });

    const [isRegister, setIsRegister] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const [returnData, error, isRegister] = await handleRegister(data)
        setIsRegister(isRegister)
    }

    useEffect(() => {
        console.log("НОВЫЙ ЮЗЕР " + isRegister)
        if (isRegister) navigate('/auth/login')
            
    }, [isRegister])

    if (isRegister || localStorage.getItem("profkomUserToken")) navigate('/auth/login')
    else{
    return (
            <form className={s.authForm} onSubmit={handleSubmit(onSubmit)}>
                <label>имя пользователя
                    <input  
                        {...register('username', 
                            { required: 'это поле обязательно', 
                            onChange: () => trigger('username') 
                        })} 
                        type='text'
                    />
                </label>
                {errors.username && <p className={s.authForm__errors}>{errors.username.message}</p>}

                <label>эл. почта
                    <input  {...register('email', 
                        { required: 'это поле обязательно', pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "некорректная эл. почта"
                        },
                        onChange: () => trigger('email') 
                    })} 
                    type='email'
                    />
                </label>
                {errors.email && <p className={s.authForm__errors}>{errors.email.message}</p>}


                <label>группа
                    <input 
                        {...register('group_name', 
                            { required: 'это поле обязательно', 
                            onChange: () => trigger('group_name') 
                        })}
                        type='text'
                        placeholder='АИС-22-1 или ПИЭ-22-1'
                    />
                </label>
                {errors.group_name && <p className={s.authForm__errors}>{errors.group_name.message}</p>}
                

                <label>пароль
                    <input  {...register('password', 
                            { required: 'это поле обязательно',
                            minLength: {
                                value: 8,
                                message: 'пароль должен содержать не меньше 8 символов'
                            },
                            onChange: () => trigger('password')
                        })} 
                        type='password'
                    /> 
                </label>
                {errors.password && <p className={s.authForm__errors}>{errors.password.message}</p>}

                <div className={s.authForm__buttons}>
                    <button className={s.authForm__mainButton} type="submit">РЕГИСТРАЦИЯ</button>
                    <button 
                        className={s.authForm__sideButton} 
                        onClick={()=>navigate('/auth/login')}
                        type='button'
                    >
                        есть аккаунт?
                    </button>
                </div>
                
            </form>
        );
    };
}

export default RegistrationForm;