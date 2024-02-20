import React, {
  MouseEventHandler,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './Header.css';
import { Divider, Drawer, MenuList, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { productApi } from '../api';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import { User } from '../model';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header: React.FC = () => {
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [username, setUserName] = useState('Sign In');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      navigate(`/?search=${searchText}`);
    }
  };
  const handleSearchButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();
    navigate(`/?search=${searchText}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.currentTarget.value);
  };
  useEffect(() => {
    const fetchProductCategories = async () => {
      const categories: string[] = await productApi.getProductCategories();
      setProductCategories(categories);
    };

    fetchProductCategories();
  }, []);

  useEffect(() => {
    const user: User = JSON.parse(window.localStorage.getItem('user') || '""');
    if (user) {
      setUserName(user.username);
      setIsUserLoggedIn(true);
    }
  }, []);

  const [open, setState] = useState(false);
  const toggleDrawer = (open: boolean) => () => {
    setState(open);
  };

  return (
    <Box
      sx={{
        marginBottom: '10px',
        position: 'fixed',
        width: '100vw',
        zIndex: 100,
      }}>
      <AppBar
        sx={{
          backgroundColor: '#131921',
          position: 'relative',
          gap: '15px',
        }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor='left'
            open={open}
            variant='temporary'
            //   onOpen={toggleDrawer(true)}
            onClose={toggleDrawer(false)}>
            <Box sx={{ padding: 2, height: 1 }}>
              <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
              <Divider sx={{ mb: 2 }} />
              <Box>
                <MenuList>
                  {productCategories?.map((category, index) => {
                    return (
                      <MenuItem className='categoryDrawer__item' key={index}>
                        <a
                          href={`/?category=${category}`}
                          className='categoryDrawer__item'
                          key={index}>
                          {category}
                        </a>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Box>
            </Box>
          </Drawer>
          <a href='/'>
            <Typography
              sx={{
                textIndent: '-500px',
                width: '97px',
                height: '30px',
                float: 'left',
                backgroundPositionX: '-10px',
                backgroundPositionY: '-51px',
                cursor: 'pointer',
                backgroundImage: `url("https://m.media-amazon.com/images/G/01/gno/sprites/nav-sprite-global-1x-reorg-privacy._CB587940754_.png")`,
              }}></Typography>
          </a>
          <Search sx={{ flexGrow: 1, display: 'flex' }}>
            <IconButton onClick={handleSearchButtonClick}>
              <SearchOutlinedIcon htmlColor='white' />
            </IconButton>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
              value={searchText}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </Search>
          <Box component='a' href={isUserLoggedIn ? '#' : '/login'}>
            <h4 className='headerText'>Hello,</h4>
            <h4 className='headerText'>{username}</h4>
          </Box>
          {/* {isUserLoggedIn && (
            <Box component='a' href='/orders'>
              <h4 className='headerText'>Returns</h4>
              <h4 className='headerText'>Orders</h4>
            </Box>
          )} */}
          {/* <Tooltip title='Cart'>
            <IconButton
              size='large'
              aria-label={`show ${cartItems?.length} items`}
              color='inherit'
              href={`/cart`}>
              <Badge badgeContent={cartItems?.length} color='error' showZero>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </Tooltip> */}
          {isUserLoggedIn && (
            <Tooltip title='Logout'>
              <IconButton
                size='large'
                color='inherit'
                onClick={() => {
                  window.localStorage.removeItem('token');
                  window.localStorage.removeItem('user');
                  window.location.reload();
                }}>
                <LogoutOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#232f3e',
          color: 'white',
          justifyContent: 'space-evenly',
        }}
        className='header_bottom'>
        {productCategories?.map((category, index) => {
          return (
            <a
              href={`/?category=${category}`}
              className='category__item'
              key={index}>
              {category}
            </a>
          );
        })}
      </Box>
    </Box>
  );
};

export default Header;
