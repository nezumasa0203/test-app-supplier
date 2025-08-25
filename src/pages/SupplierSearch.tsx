import React, { useState } from 'react';
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
  Paper,
  Chip,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  List as ListIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface SearchForm {
  keyword: string;
  country: string;
}

const SupplierSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState<SearchForm>({
    keyword: '',
    country: '',
  });

  const [isSearching, setIsSearching] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const countries = [
    { key: 'JP', label: '日本' },
    { key: 'US', label: 'アメリカ' },
    { key: 'CN', label: '中国' },
  ];

  const handleInputChange = (field: keyof SearchForm) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: unknown } }
  ) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSearch = async () => {
    setIsSearching(true);
    
    // モック検索処理
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSearching(false);
    setSearchCompleted(true);
    
    // 検索完了後、結果を保存してリスト画面に遷移することも可能
    console.log('Search completed with:', searchForm);
  };

  const handleClear = () => {
    setSearchForm({ keyword: '', country: '' });
    setSearchCompleted(false);
  };

  const handleGoToList = () => {
    navigate('/suppliers/list');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          調達先検索
        </Typography>
        <Typography variant="body1" color="text.secondary">
          調達先を条件を指定して検索できます。キーワードや国による絞り込みが可能です。
        </Typography>
      </Box>

      {/* 検索フォーム */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            検索条件
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <TextField
              label="キーワード"
              variant="outlined"
              size="small"
              value={searchForm.keyword}
              onChange={handleInputChange('keyword')}
              placeholder="調達先名、法人番号、メールアドレスなど"
              disabled={isSearching}
              sx={{ flex: 2, minWidth: 300 }}
            />
            
            <FormControl size="small" sx={{ flex: 1, minWidth: 150 }}>
              <InputLabel>国</InputLabel>
              <Select
                value={searchForm.country}
                label="国"
                onChange={handleInputChange('country')}
                disabled={isSearching}
              >
                <MenuItem value="">すべて</MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.key} value={country.key}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClear}
              disabled={isSearching}
            >
              クリア
            </Button>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              disabled={isSearching}
              sx={{ minWidth: 120 }}
            >
              {isSearching ? '検索中...' : '検索'}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ListIcon />}
              onClick={handleGoToList}
              disabled={isSearching}
            >
              一覧へ
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 検索結果の表示 */}
      {searchCompleted && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              検索結果
            </Typography>
            <Chip label="24件" color="primary" />
          </Box>
          
          {searchForm.keyword && (
            <Box sx={{ mb: 2 }}>
              <Chip 
                label={`キーワード: ${searchForm.keyword}`} 
                onDelete={() => setSearchForm(prev => ({ ...prev, keyword: '' }))}
                sx={{ mr: 1 }}
              />
            </Box>
          )}
          
          {searchForm.country && (
            <Box sx={{ mb: 2 }}>
              <Chip 
                label={`国: ${countries.find(c => c.key === searchForm.country)?.label}`}
                onDelete={() => setSearchForm(prev => ({ ...prev, country: '' }))}
                sx={{ mr: 1 }}
              />
            </Box>
          )}

          <Alert severity="success" sx={{ mt: 2 }}>
            検索が完了しました。24件の調達先が見つかりました。詳細な結果は「一覧へ」ボタンからご確認ください。
          </Alert>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ListIcon />}
              onClick={handleGoToList}
            >
              検索結果を一覧で確認
            </Button>
          </Box>
        </Paper>
      )}

      {/* ヘルプ情報 */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            検索のヒント
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • キーワード検索では、調達先名、法人番号、メールアドレスでの検索が可能です
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • 国を指定することで、特定の国の調達先に絞り込むことができます
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • 条件を指定せずに検索すると、すべての調達先が表示されます
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default SupplierSearch;
