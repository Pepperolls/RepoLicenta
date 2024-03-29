import * as React from 'react';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { red } from '@mui/material/colors';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HeaderList = styled.ul`
  display: inline;
  padding: 0;
  list-style-type: none;
`;
const HeaderListItem = styled.li`
  display: inline;
  margin-right: 10px;
`;

const listItemIconStyle = {
  minWidth: '40px',
};

const iconStyle = {
  fontSize: 30,
  color: red[50],
};

const buttonStyle = {
  color: 'inherit',
};

const AppHeaderLeftButtons = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'primary' }}>
      <HeaderList>
        <HeaderListItem>
          <Button onClick={() => navigate('/')} style={buttonStyle}>
            <ListItemIcon sx={listItemIconStyle}>
              <HomeOutlinedIcon style={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </Button>
        </HeaderListItem>
        <HeaderListItem>
          <Button onClick={() => navigate('/Products')} style={buttonStyle}>
            <ListItemIcon style={listItemIconStyle}>
              <LocalMallOutlinedIcon style={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </Button>
        </HeaderListItem>
      </HeaderList>
    </Box>
  );
};

export default AppHeaderLeftButtons;
