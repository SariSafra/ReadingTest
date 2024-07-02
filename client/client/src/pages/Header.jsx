// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${props => props.theme.colors.secondary};
`;

const Logo = styled.img`
  height: 60px;
`;

const NavLinks = styled.nav`
  a {
    margin: 0 10px;
    text-decoration: none;
    color: ${props => props.theme.colors.text};
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="Logo" />
      <NavLinks>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </NavLinks>
    </HeaderContainer>
  );
};

export default Header;
