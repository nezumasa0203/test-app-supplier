import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Breadcrumbs,
  Link,
  Chip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  // パンくずリストの生成
  const getBreadcrumbs = (pathname: string) => {
    const pathMap: { [key: string]: string } = {
      '/': 'メニュー',
      '/suppliers': '調達先検索',
      '/suppliers/list': '調達先一覧',
      '/suppliers/update': '調達先更新',
      '/suppliers/apply': '調達先申請',
    };

    return pathMap[pathname] || 'ページ';
  };

  return (
    <AppBar 
      position="static" 
      elevation={1}
      sx={{ 
        backgroundColor: 'white',
        color: 'text.primary',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" component="div" sx={{ color: 'primary.main', fontWeight: 600 }}>
            調達先管理システム
          </Typography>
          <Chip 
            label="本番環境" 
            size="small" 
            color="success" 
            variant="outlined"
            sx={{ ml: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mr: 3 }}>
            <Link underline="hover" color="inherit" href="/">
              ホーム
            </Link>
            <Typography color="text.primary">
              {getBreadcrumbs(location.pathname)}
            </Typography>
          </Breadcrumbs>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit" size="medium">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" size="medium">
            <SettingsIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              山田 太郎
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
