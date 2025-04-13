import React from 'react';
import s from './Profile.module.scss';
import useBaseGet from '../../../hooks/axios/GET/useBaseGet';
import vk_icon from "../../../assets/imgs/vk_icon.png"
import profile_pic from "../../../assets/svgs/profile_pic.svg"
import Arrow from "../../../assets/svgs/arrow.svg?react"
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, isLoading, error] = useBaseGet({ url: '/users/me' });
  const navigate = useNavigate()

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('profkomUserToken');
    navigate('/auth/login')
  };

  return (
    <div className={s.profileContainer}>

      <div className={s.profileIcon}>
        <img src={profile_pic}/>
      </div>

      <h2 className={s.username}>{userData?.username }</h2>
      <p className={s.group}>Группа: {userData?.group_name }</p>

      <button className={s.logoutButton} onClick={handleLogout}>
        Выйти
      </button>


      <div className={s.footer}>
        <p className={s.footerText}>Есть вопрос? Сообщи нам!</p>
        <a href="https://vk.com" className={s.vkLink}>
          <img src={vk_icon} alt="VK" className={s.vkIcon} />
          <Arrow className={s.arrow}/>
        </a>
      </div>
    </div>
  );
};

export default Profile;