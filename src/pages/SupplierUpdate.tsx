import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Paper,
  Rating,
  Alert,
  Divider,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface SupplierForm {
  id: string;
  name: string;
  corporateId: string;
  country: string;
  email: string;
  rating: number;
}

const SupplierUpdate: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const [supplierForm, setSupplierForm] = useState<SupplierForm>({
    id: 'SUP-0001',
    name: '',
    corporateId: '',
    country: 'JP',
    email: '',
    rating: 4,
  });

  const countries = [
    { key: 'JP', label: '日本' },
    { key: 'US', label: 'アメリカ' },
    { key: 'CN', label: '中国' },
  ];

  // 初期データの読み込み
  useEffect(() => {
    // モックデータの設定
    setSupplierForm({
      id: 'SUP-0001',
      name: '株式会社サンプル商事',
      corporateId: '1234567890123',
      country: 'JP',
      email: 'contact@sample-corp.co.jp',
      rating: 4,
    });
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (field: keyof SupplierForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: unknown } }
  ) => {
    setSupplierForm(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    if (newValue !== null) {
      setSupplierForm(prev => ({
        ...prev,
        rating: newValue
      }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // モック保存処理
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSaved(true);
    
    console.log('Supplier updated:', supplierForm);
    
    // 3秒後にアラートを非表示
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleCancel = () => {
    // 確認ダイアログの実装など
    window.history.back();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          調達先更新
        </Typography>
        <Typography variant="body1" color="text.secondary">
          既存調達先の情報を更新します。基本情報、与信情報、担当者情報の変更が可能です。
        </Typography>
      </Box>

      {isSaved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          調達先情報が正常に更新されました。
        </Alert>
      )}

      <Card elevation={1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="supplier update tabs">
            <Tab label="基本情報" />
            <Tab label="与信" />
            <Tab label="担当" />
          </Tabs>
        </Box>

        {/* 基本情報タブ */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="ID"
              variant="outlined"
              size="small"
              value={supplierForm.id}
              disabled
              helperText="自動生成されたIDです"
              sx={{ maxWidth: 300 }}
            />
            
            <TextField
              fullWidth
              label="調達先名"
              variant="outlined"
              size="small"
              value={supplierForm.name}
              onChange={handleInputChange('name')}
              required
              helperText="正式名称を入力してください"
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="法人番号"
                variant="outlined"
                size="small"
                value={supplierForm.corporateId}
                onChange={handleInputChange('corporateId')}
                required
                helperText="13桁の法人番号を入力"
                inputProps={{ pattern: '^\\d{13}$' }}
                sx={{ flex: 1 }}
              />

              <FormControl size="small" sx={{ flex: 1 }}>
                <InputLabel>国</InputLabel>
                <Select
                  value={supplierForm.country}
                  label="国"
                  onChange={handleInputChange('country')}
                  required
                >
                  {countries.map((country) => (
                    <MenuItem key={country.key} value={country.key}>
                      {country.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="メール"
                type="email"
                variant="outlined"
                size="small"
                value={supplierForm.email}
                onChange={handleInputChange('email')}
                helperText="連絡用メールアドレス"
                sx={{ flex: 1 }}
              />

              <Box sx={{ flex: 1 }}>
                <Typography component="legend" variant="body2" sx={{ mb: 1 }}>
                  推奨度
                </Typography>
                <Rating
                  value={supplierForm.rating}
                  onChange={handleRatingChange}
                  max={5}
                  size="large"
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  ({supplierForm.rating}/5)
                </Typography>
              </Box>
            </Box>
          </Box>
        </TabPanel>

        {/* 与信タブ */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Alert severity="info">
              与信情報の機能は今後のアップデートで追加予定です。
            </Alert>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="信用格付け"
                variant="outlined"
                size="small"
                value="A"
                disabled
                sx={{ flex: 1 }}
              />

              <TextField
                label="与信限度額"
                variant="outlined"
                size="small"
                value="10,000,000"
                disabled
                helperText="円"
                sx={{ flex: 1 }}
              />
            </Box>

            <TextField
              fullWidth
              label="与信コメント"
              variant="outlined"
              multiline
              rows={4}
              value="優良企業として長期的な取引実績があります。"
              disabled
            />
          </Box>
        </TabPanel>

        {/* 担当タブ */}
        <TabPanel value={activeTab} index={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Alert severity="info">
              担当者情報の機能は今後のアップデートで追加予定です。
            </Alert>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="担当者名"
                variant="outlined"
                size="small"
                value="田中 一郎"
                disabled
                sx={{ flex: 1 }}
              />

              <TextField
                label="担当部署"
                variant="outlined"
                size="small"
                value="調達部"
                disabled
                sx={{ flex: 1 }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="電話番号"
                variant="outlined"
                size="small"
                value="03-1234-5678"
                disabled
                sx={{ flex: 1 }}
              />

              <TextField
                label="担当者メール"
                variant="outlined"
                size="small"
                value="tanaka@company.co.jp"
                disabled
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>
        </TabPanel>

        <Divider />

        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              disabled={isLoading}
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={isLoading}
              sx={{ minWidth: 120 }}
            >
              {isLoading ? '保存中...' : '更新保存'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* ヘルプ情報 */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            更新のヒント
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • 基本情報タブでは調達先の基本的な情報を編集できます
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • 法人番号は13桁で入力してください
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • 推奨度は1-5の範囲で設定できます
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default SupplierUpdate;
