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

  const handleLogout = () => {
    localStorage.removeItem('profkomUserToken');
    navigate('/auth/login')
  };

  return (
    <div className={s.profile}>

      <div className={s.profile__icon}>
        <img src={profile_pic}/>
      </div>

      <h2 className={s.profile__username}>{userData?.username }</h2>
      <p className={s.profile__group}>{userData?.group_name }</p>

      <button className={s.profile__logoutButton} onClick={handleLogout}>
        Выйти
      </button>


      <div className={s.profile__footer}>
        <p className={s.profile__footerText}>Есть вопрос? Сообщи нам!</p>
        <Arrow className={s.profile__footerArrow}/>
        <a href="https://vk.com/profitusue" className={s.vkLink}>
          <img src={vk_icon} alt="VK" className={s.vkIcon} />
        </a>
      </div>
    </div>
  );
};

export default Profile;