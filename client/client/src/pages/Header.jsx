import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const colors = {
  primary: '#4374ac',
  text: '#2c3e50',
  background: '#ecf0f1',
  highlight: '#1abc9c',
};

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${colors.background};
  color: ${colors.text};
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: ${colors.primary};
  padding: 10px 20px;
`;

const Logo = styled.img`
  height: 60px;
`;

const NavLinks = styled.nav`
  a {
    margin: 0 10px;
    text-decoration: none;
    color: ${colors.text};
    font-weight: bold;
    &:hover {
      color: ${colors.highlight};
    }
  }
`;

const TextSection = styled.div`
  margin-top: 20px;
  text-align: center;
  max-width: 800px;
  
  p {
    margin-bottom: 15px;
    line-height: 1.6;
  }

  h2 {
    color: ${colors.primary};
    margin-bottom: 15px;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <TopBar>
        <Logo src={logo} alt="Logo" />
        <NavLinks>
          <Link to="/login">התחבר</Link>
          <Link to="/signup">הירשם</Link>
        </NavLinks>
      </TopBar>
      <TextSection>
        <h2>ברוכים הבאים לפלטפורמת האבחון המתקדם לקריאה</h2>
        <p>
          באתרנו, אנו מתמקדים באבחון ובהערכה מדויקים של מיומנויות הקריאה של תלמידים. 
          תהליך האבחון המעמיק שלנו מאפשר לזהות בדיוק את נקודות החולשה בקריאה של התלמידים, 
          ומספק תמונה ברורה ומדויקת של הקשיים שהם נתקלים בהם.
        </p>
        <p>
          היכולת לקרוא בינה היא מרכזית להצלחה אקדמית ולצמיחה אישית. תלמידים המתקשים בקריאה 
          עלולים להתמודד עם אתגרים משמעותיים שמשפיעים על כל מישורי החיים, כולל נשירה ממסגרות 
          לימודיות, היעדר אפשרות לתעסוקה איכותית, בעיות בביטחון עצמי, קשיים חברתיים ואתגרים נוספים.
        </p>
        <p>
          החזון שלנו הוא שכל מוסד לימודי יוכל לאבחן את כל תלמידיו בקלות ובמהירות באמצעות התוכנה שלנו, 
          שמאפשרת אבחון מהיר ומדויק ללא מאמץ מיותר. כך, נוכל לוודא שאין תלמיד שלא יאובחן ולא יקבל 
          את התמיכה הנדרשת, על מנת להצליח ולשגשג בלימודים ובחיים האישיים.
        </p>
        <p>
          הצטרפו אלינו וגלו כיצד אנו יכולים לסייע לתלמידים שלכם לשפר את מיומנויות הקריאה שלהם ולהתגבר 
          על הקשיים בדרך להצלחה אקדמית ואישית.
        </p>
      </TextSection>
    </HeaderContainer>
  );
};

export default Header;
