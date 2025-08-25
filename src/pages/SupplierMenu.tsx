import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Paper,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Search as SearchIcon,
  List as ListIcon,
  Add as AddIcon,
  Edit as EditIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface MenuCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  color: 'primary' | 'secondary';
  variant: 'contained' | 'outlined';
  path: string;
  onClick: (path: string) => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ 
  title, 
  description, 
  icon, 
  color, 
  variant, 
  path, 
  onClick 
}) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: `${color}.main`, mr: 2 }}>
          {icon}
        </Avatar>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions sx={{ p: 2, pt: 0 }}>
      <Button
        variant={variant}
        color={color}
        fullWidth
        startIcon={icon}
        onClick={() => onClick(path)}
        sx={{ py: 1 }}
      >
        開く
      </Button>
    </CardActions>
  </Card>
);

const SupplierMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const menuItems = [
    {
      title: '調達先検索',
      description: '既存の調達先を条件を指定して検索できます。キーワードや国による絞り込みが可能です。',
      icon: <SearchIcon />,
      color: 'primary' as const,
      variant: 'contained' as const,
      path: '/suppliers'
    },
    {
      title: '調達先一覧',
      description: '検索結果や全ての調達先をリスト形式で確認できます。詳細情報の閲覧や編集が可能です。',
      icon: <ListIcon />,
      color: 'primary' as const,
      variant: 'contained' as const,
      path: '/suppliers/list'
    },
    {
      title: '調達先申請',
      description: '新規調達先の申請を行います。基本情報、与信情報、担当者情報を入力して申請できます。',
      icon: <AddIcon />,
      color: 'secondary' as const,
      variant: 'contained' as const,
      path: '/suppliers/apply'
    },
    {
      title: '調達先更新',
      description: '既存調達先の情報を更新します。基本情報、与信情報、担当者情報の変更が可能です。',
      icon: <EditIcon />,
      color: 'primary' as const,
      variant: 'outlined' as const,
      path: '/suppliers/update'
    },
  ];

  const stats = [
    { label: '総調達先数', value: '1,247', icon: <TrendingUpIcon />, color: '#4caf50' },
    { label: '承認済み', value: '1,189', icon: <CheckCircleIcon />, color: '#2196f3' },
    { label: '審査中', value: '58', icon: <WarningIcon />, color: '#ff9800' },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          調達先管理システム
        </Typography>
        <Typography variant="body1" color="text.secondary">
          調達先の検索、一覧表示、新規申請、情報更新を行うことができます。
        </Typography>
      </Box>

      {/* 統計情報 */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {stats.map((stat, index) => (
          <Paper key={index} sx={{ p: 3, display: 'flex', alignItems: 'center', flex: 1, minWidth: 250 }}>
            <Avatar sx={{ bgcolor: stat.color, mr: 2 }}>
              {stat.icon}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* メニューカード */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
        {menuItems.map((item, index) => (
          <MenuCard key={index} {...item} onClick={handleMenuClick} />
        ))}
      </Box>

      {/* お知らせエリア */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            お知らせ
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip label="重要" color="error" size="small" />
              <Typography variant="body2">
                システムメンテナンスのお知らせ（2025/08/30 02:00-04:00）
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip label="更新" color="info" size="small" />
              <Typography variant="body2">
                調達先管理システム v2.1.0 がリリースされました
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip label="情報" color="default" size="small" />
              <Typography variant="body2">
                新しい検索機能が追加されました
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SupplierMenu;
