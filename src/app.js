/**
 * @Author: liuyan
 * @Date:   2017-08-19T11:11:36+08:00
 * @Email:  liu-yaner@foxmail.com
 * @Last modified by:   liuyan
 * @Last modified time: 2017-08-24T14:18:03+08:00
 */
import './source/style.less';
import io from 'socket.io-client';
import main from './main';

window.onload = () => {
    main.onReady();
    console.log('test');
};

// const socket = io();
