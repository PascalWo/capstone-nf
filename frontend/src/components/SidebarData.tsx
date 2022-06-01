import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Search',
        path: '/spoona/search',
        icon: <FiIcons.FiSearch/>,
        cName: 'nav-text'
    },
    {
        title: 'Recipes',
        path: '/recipes',
        icon: <AiIcons.AiFillBook/>,
        cName: 'nav-text'
    },
    {
        title: 'Favorites',
        path: '/favorites',
        icon: <AiIcons.AiFillHeart/>,
        cName: 'nav-text'
    },
    {
        title: 'Shopping-List',
        path: '/shoppinglist',
        icon: <FaIcons.FaShoppingCart/>,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/login',
        icon: <RiIcons.RiLoginBoxFill/>,
        cName: 'nav-text'
    },
    {
        title: 'Impressum',
        path: '/impressum',
        icon: <FaIcons.FaInfoCircle/>,
        cName: 'nav-text'
    }
];