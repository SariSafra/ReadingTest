// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
 const colors = {
    primary: '#3498db',
    secondary: '#2ecc71',
    text: '#2c3e50',
  };
  
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color:${colors.secondary};
`;

const Logo = styled.img`
  height: 60px;
`;

const NavLinks = styled.nav`
  a {
    margin: 0 10px;
    text-decoration: none;
    color: ${colors.text};
    &:hover {
      color: ${colors.primary};
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
