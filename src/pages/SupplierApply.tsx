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
  Tabs,
  Tab,
  Paper,
  Rating,
  Alert,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Send as SendIcon,
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
  name: string;
  corporateId: string;
  country: string;
  email: string;
  rating: number;
}

const SupplierApply: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  const [supplierForm, setSupplierForm] = useState<SupplierForm>({
    name: '',
    corporateId: '',
    country: 'JP',
    email: '',
    rating: 3,
  });

  const countries = [
    { key: 'JP', label: '日本' },
    { key: 'US', label: 'アメリカ' },
    { key: 'CN', label: '中国' },
  ];

  const steps = ['基本情報入力', '内容確認', '申請完了'];

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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    console.log('Draft saved:', supplierForm);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setActiveStep(1);
    
    // モック申請処理
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
    setActiveStep(2);
    
    console.log('Application submitted:', supplierForm);
  };

  const handleCancel = () => {
    window.history.back();
  };

  const isFormValid = () => {
    return supplierForm.name && 
           supplierForm.corporateId && 
           supplierForm.corporateId.length === 13;
  };

  if (isSubmitted) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Card elevation={1}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>
              申請が完了しました
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              調達先申請が正常に送信されました。審査結果は1-2営業日以内にメールでお知らせいたします。
            </Typography>
            
            <Paper sx={{ p: 3, mb: 4, backgroundColor: '#f5f5f5' }}>
              <Typography variant="h6" gutterBottom>
                申請内容
              </Typography>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2"><strong>調達先名:</strong> {supplierForm.name}</Typography>
                <Typography variant="body2"><strong>法人番号:</strong> {supplierForm.corporateId}</Typography>
                <Typography variant="body2"><strong>国:</strong> {countries.find(c => c.key === supplierForm.country)?.label}</Typography>
                <Typography variant="body2"><strong>メール:</strong> {supplierForm.email}</Typography>
                <Typography variant="body2"><strong>推奨度:</strong> {supplierForm.rating}/5</Typography>
              </Box>
            </Paper>

            <Button
              variant="contained"
              size="large"
              onClick={() => window.location.href = '/'}
            >
              メニューに戻る
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          調達先申請
        </Typography>
        <Typography variant="body1" color="text.secondary">
          新規調達先の申請を行います。基本情報、与信情報、担当者情報を入力して申請できます。
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Card elevation={1}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="supplier apply tabs">
            <Tab label="基本情報" />
            <Tab label="与信" />
            <Tab label="担当" />
          </Tabs>
        </Box>

        {/* 基本情報タブ */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
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
            </Box>

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
          <Alert severity="info" sx={{ mb: 3 }}>
            与信情報の機能は今後のアップデートで追加予定です。
          </Alert>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="信用格付け"
              variant="outlined"
              size="small"
              value=""
              placeholder="例: A, B, C"
              disabled
            />

            <TextField
              fullWidth
              label="与信限度額"
              variant="outlined"
              size="small"
              value=""
              placeholder="例: 10,000,000"
              helperText="円"
              disabled
            />

            <TextField
              fullWidth
              label="与信コメント"
              variant="outlined"
              multiline
              rows={4}
              placeholder="与信に関するコメントを入力してください"
              disabled
            />
          </Box>
        </TabPanel>

        {/* 担当タブ */}
        <TabPanel value={activeTab} index={2}>
          <Alert severity="info" sx={{ mb: 3 }}>
            担当者情報の機能は今後のアップデートで追加予定です。
          </Alert>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="担当者名"
                variant="outlined"
                size="small"
                value=""
                placeholder="例: 田中 一郎"
                disabled
                sx={{ flex: 1 }}
              />

              <TextField
                label="担当部署"
                variant="outlined"
                size="small"
                value=""
                placeholder="例: 調達部"
                disabled
                sx={{ flex: 1 }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="電話番号"
                variant="outlined"
                size="small"
                value=""
                placeholder="例: 03-1234-5678"
                disabled
                sx={{ flex: 1 }}
              />

              <TextField
                label="担当者メール"
                variant="outlined"
                size="small"
                value=""
                placeholder="例: tanaka@company.co.jp"
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
              variant="outlined"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={isLoading}
            >
              下書き保存
            </Button>
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid()}
              sx={{ minWidth: 120 }}
            >
              {isLoading ? '申請中...' : '申請'}
            </Button>
          </Box>
          
          {!isFormValid() && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              必須項目を入力してください。調達先名と13桁の法人番号は必須です。
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* ヘルプ情報 */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            申請のヒント
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • 調達先名は正式な企業名を入力してください
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • 法人番号は13桁で入力してください（数字のみ）
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            • 推奨度は1-5の範囲で設定してください
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • 申請後の審査には1-2営業日かかります
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default SupplierApply;
