import React from 'react';
import s from './RegistrationForm.module.scss'
import { useForm } from 'react-hook-form';
import handleRegister from '../../../../hooks/axios/POST/handleRegister';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';


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

    const onSubmit = async (data) => {
        const [returnData, error, isRegister] = await handleRegister(data)
        setIsRegister(isRegister)
    }

        useEffect(() => {
            console.log("НОВЫЙ ЮЗЕР " + isRegister)
            if (isRegister) return 
                ( <Navigate to="/auth/login" replace />)
            
        }, [isRegister])

    if (isRegister || localStorage.getItem("profkomUserToken")) {return (<Navigate to="/auth/login" replace />)}
    else{
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

                <label>эл. почта
                    <input  {...register('email', 
                        { required: 'это поле обязательно', pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "некорректная эл. почта"
                        },
                        onChange: () => trigger('email') 
                    })} 
                    type='email'></input>
                </label>
                {errors.email && <p className={s.authForm__errors}>{errors.email.message}</p>}


                <label>группа
                    <input 
                        {...register('group_name', 
                            { required: 'это поле обязательно', 
                            onChange: () => trigger('group_name') 
                        })}
                        type='text'></input>
                </label>
                {errors.group_name && <p className={s.authForm__errors}>{errors.group_name.message}</p>}
                

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
                        <button type="submit">РЕГИСТРАЦИЯ</button>
                </div>
                
            </form>
    );
};
}

export default RegistrationForm;