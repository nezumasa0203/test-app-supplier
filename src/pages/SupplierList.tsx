import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  Paper,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

interface Supplier {
  id: string;
  name: string;
  corporateId: string;
  country: string;
  email: string;
  rating: number;
  status: 'active' | 'pending' | 'inactive';
  lastUpdated: string;
}

const SupplierList: React.FC = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // モックデータの生成
  useEffect(() => {
    const generateMockData = (): Supplier[] => {
      const mockSuppliers: Supplier[] = [
        {
          id: 'SUP-0001',
          name: '株式会社サンプル商事',
          corporateId: '1234567890123',
          country: 'JP',
          email: 'contact@sample-corp.co.jp',
          rating: 4,
          status: 'active',
          lastUpdated: '2025-08-20'
        },
        {
          id: 'SUP-0002', 
          name: 'グローバル物流株式会社',
          corporateId: '2345678901234',
          country: 'JP',
          email: 'info@global-logistics.co.jp',
          rating: 5,
          status: 'active',
          lastUpdated: '2025-08-18'
        },
        {
          id: 'SUP-0003',
          name: 'ABC Manufacturing Inc.',
          corporateId: '3456789012345',
          country: 'US',
          email: 'procurement@abc-mfg.com',
          rating: 3,
          status: 'pending',
          lastUpdated: '2025-08-15'
        },
        {
          id: 'SUP-0004',
          name: '中華製造有限公司',
          corporateId: '4567890123456',
          country: 'CN',
          email: 'business@china-mfg.cn',
          rating: 4,
          status: 'active',
          lastUpdated: '2025-08-12'
        },
        {
          id: 'SUP-0005',
          name: 'テクノロジー株式会社',
          corporateId: '5678901234567',
          country: 'JP',
          email: 'contact@technology.co.jp',
          rating: 5,
          status: 'active',
          lastUpdated: '2025-08-10'
        }
      ];
      return mockSuppliers;
    };

    // ローディング状態をシミュレート
    setTimeout(() => {
      setSuppliers(generateMockData());
      setLoading(false);
    }, 1000);
  }, []);

  const getCountryLabel = (countryCode: string) => {
    const countryMap: { [key: string]: string } = {
      'JP': '日本',
      'US': 'アメリカ',
      'CN': '中国'
    };
    return countryMap[countryCode] || countryCode;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'pending': return 'warning';
      case 'inactive': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return '有効';
      case 'pending': return '審査中';
      case 'inactive': return '無効';
      default: return status;
    }
  };

  const renderRating = (rating: number) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          star <= rating ? 
            <StarIcon key={star} sx={{ color: '#ffc107', fontSize: 18 }} /> :
            <StarBorderIcon key={star} sx={{ color: '#e0e0e0', fontSize: 18 }} />
        ))}
        <Typography variant="caption" sx={{ ml: 1 }}>
          ({rating}/5)
        </Typography>
      </Box>
    );
  };

  const handleEdit = (id: string) => {
    navigate(`/suppliers/update?id=${id}`);
  };

  const handleView = (id: string) => {
    // 詳細表示の実装（モーダルまたは詳細ページ）
    console.log('View details for:', id);
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'name',
      headerName: '調達先名',
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {params.value}
          </Typography>
        </Box>
      )
    },
    {
      field: 'corporateId',
      headerName: '法人番号',
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'country',
      headerName: '国',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Chip 
          label={getCountryLabel(params.value as string)}
          size="small"
          variant="outlined"
        />
      )
    },
    {
      field: 'email',
      headerName: 'メール',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2" sx={{ color: 'primary.main' }}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'rating',
      headerName: '推奨度',
      width: 150,
      renderCell: (params: GridRenderCellParams) => renderRating(params.value as number)
    },
    {
      field: 'status',
      headerName: 'ステータス',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Chip 
          label={getStatusLabel(params.value as string)}
          color={getStatusColor(params.value as string) as any}
          size="small"
        />
      )
    },
    {
      field: 'lastUpdated',
      headerName: '最終更新',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant="body2">
          {params.value}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'アクション',
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Tooltip title="詳細表示">
            <IconButton size="small" onClick={() => handleView(params.row.id)}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="編集">
            <IconButton size="small" onClick={() => handleEdit(params.row.id)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          調達先一覧
        </Typography>
        <Typography variant="body1" color="text.secondary">
          検索結果や全ての調達先をリスト形式で確認できます。詳細情報の閲覧や編集が可能です。
        </Typography>
      </Box>

      {/* 統計情報 */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="body2" color="text.secondary">
            総件数
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {suppliers.length}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="body2" color="text.secondary">
            有効
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'success.main' }}>
            {suppliers.filter(s => s.status === 'active').length}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="body2" color="text.secondary">
            審査中
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'warning.main' }}>
            {suppliers.filter(s => s.status === 'pending').length}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, flex: 1 }}>
          <Typography variant="body2" color="text.secondary">
            選択中
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {selectedRows.length}
          </Typography>
        </Paper>
      </Box>

      {/* アクションバー */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          {selectedRows.length > 0 && (
            <Alert severity="info" sx={{ py: 0 }}>
              {selectedRows.length}件選択中
            </Alert>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => navigate('/suppliers/update')}
          >
            更新へ
          </Button>
        </Box>
      </Box>

      {/* データグリッド */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <DataGrid
            rows={suppliers}
            columns={columns}
            loading={loading}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(newSelection) => {
              setSelectedRows(newSelection as any);
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 }
              }
            }}
            pageSizeOptions={[10, 25, 50]}
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f0f0f0',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#fafafa',
                borderBottom: '2px solid #e0e0e0',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f5f5f5',
              },
              minHeight: 400
            }}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default SupplierList;
