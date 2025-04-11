import React from 'react';
import s from './AuthForm.module.scss'
import { useForm } from 'react-hook-form';


const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors }, trigger, } = useForm({
        defaultValues: {
            username: '',
            email: '',
            group: '',
            password: ''
        }
    });

    const onSubmit = (data) => {
        console.log(data)
    }

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
                        {...register('group', 
                            { required: 'это поле обязательно', 
                            onChange: () => trigger('group') 
                        })}
                        type='text'></input>
                </label>
                {errors.group && <p className={s.authForm__errors}>{errors.group.message}</p>}
                

                <label>пароль
                    <input  {...register('password', 
                            { required: 'это поле обязательно',
                            minLength: {
                                value: 8,
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


export default RegistrationForm;