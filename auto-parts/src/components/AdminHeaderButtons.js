import * as React from 'react';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
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
  margin-right: 20px;
`;

const mainDivStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: 'primary',
};

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

const AdminHeaderButtons = () => {
  const navigate = useNavigate();

  return (
    <Box sx={mainDivStyle}>
      <HeaderList>
        <HeaderListItem>
          <Button
            onClick={() => navigate('/AdminHomePage')}
            style={buttonStyle}
          >
            <ListItemIcon sx={listItemIconStyle}>
              <HomeOutlinedIcon style={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </Button>
        </HeaderListItem>
        <HeaderListItem>
          <Button
            onClick={() => navigate('/AdminUsersPage')}
            style={buttonStyle}
          >
            <ListItemIcon sx={listItemIconStyle}>
              <AccountCircleOutlinedIcon style={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </Button>
        </HeaderListItem>
        <HeaderListItem>
          <Button
            onClick={() => navigate('/AdminCarsPage')}
            style={buttonStyle}
          >
            <ListItemIcon style={listItemIconStyle}>
              <DirectionsCarOutlinedIcon style={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Cars" />
          </Button>
        </HeaderListItem>
        <HeaderListItem>
          <Button
            onClick={() => navigate('/AdminPartsPage')}
            style={buttonStyle}
          >
            <ListItemIcon style={listItemIconStyle}>
              <ConstructionOutlinedIcon style={iconStyle} />
            </ListItemIcon>
            <ListItemText primary="Parts" />
          </Button>
        </HeaderListItem>
      </HeaderList>
    </Box>
  );
};

export default AdminHeaderButtons;
