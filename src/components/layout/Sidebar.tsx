import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  List as ListIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactElement;
  path: string;
  description?: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'メニュー',
    icon: <HomeIcon />,
    path: '/',
    description: '機能メニュー'
  },
  {
    id: 'search',
    label: '調達先検索',
    icon: <SearchIcon />,
    path: '/suppliers',
    description: '調達先を検索する'
  },
  {
    id: 'list',
    label: '調達先一覧',
    icon: <ListIcon />,
    path: '/suppliers/list',
    description: '検索結果の一覧'
  },
  {
    id: 'update',
    label: '調達先更新',
    icon: <EditIcon />,
    path: '/suppliers/update',
    description: '既存調達先の更新'
  },
  {
    id: 'apply',
    label: '調達先申請',
    icon: <AddIcon />,
    path: '/suppliers/apply',
    description: '新規調達先申請を登録'
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#fafafa',
          borderRight: '1px solid #e0e0e0',
        },
      }}
    >
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <BusinessIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              調達先管理
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Supplier Management
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            backgroundColor: 'primary.main', 
            color: 'white',
            borderRadius: 2 
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            ようこそ、山田 太郎様
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            最終ログイン: 2025/08/25 09:30
          </Typography>
        </Paper>
      </Box>

      <Divider />

      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleMenuClick(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: location.pathname === item.path ? 'white' : 'primary.main',
                  minWidth: 40
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                secondary={item.description}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === item.path ? 600 : 500
                }}
                secondaryTypographyProps={{
                  fontSize: '0.75rem',
                  sx: { 
                    color: location.pathname === item.path ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', display: 'block' }}>
          Version 2.1.0
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
