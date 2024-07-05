// TeacherHomeStyles.js
import { styled } from '@mui/system';
import { Box, Container, ListItem, Avatar } from '@mui/material';

export const StyledContainer = styled(Container)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(4),
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export const StudentList = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  padding: 0,
});

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 'auto',
  padding: theme.spacing(3.75),
}));

export const StyledAvatar = styled(Avatar)({
  width: 150,
  height: 150,
});
