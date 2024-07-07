import styled from 'styled-components';
import { Typography, Box } from '@mui/material';

export const ModalContent = styled(Box)`
  padding: 20px;
  text-align: center;
  position: relative;
`;

export const modalStyle = {
    content: {
        //top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, 0%)',
        width: '400px',
        padding: '20px',
        borderRadius: '8px'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
};

export const Message = styled(Typography)`
  margin-top: 16px;
  font-weight: bold;
  color: green;
`;

export default Message;
