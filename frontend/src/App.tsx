import React, { useState } from 'react';
import { Container, Grid, Button, TextField, Paper, Typography, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

const App: React.FC = () => {
  const [display, setDisplay] = useState<string>('');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleNumberClick = (num: number) => {
    setDisplay(prev => prev + num.toString());
  };

  const handleOperationClick = (op: string) => {
    if (firstOperand === null) {
      setFirstOperand(parseFloat(display));
      setOperation(op);
      setDisplay('');
    } else {
      handleEqualsClick();
      setOperation(op);
    }
  };

  const handleEqualsClick = async () => {
    if (firstOperand !== null && operation !== null) {
      setLoading(true);
      try {
        const result = await backend.calculate(operation, firstOperand, parseFloat(display));
        setDisplay(result.toString());
        setFirstOperand(null);
        setOperation(null);
      } catch (error) {
        setDisplay('Error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClear = () => {
    setDisplay('');
    setFirstOperand(null);
    setOperation(null);
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={display}
          disabled
          sx={{ mb: 2 }}
        />
        <Grid container spacing={1}>
          {buttons.map((btn) => (
            <Grid item xs={3} key={btn}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  if (btn === '=') handleEqualsClick();
                  else if (['+', '-', '*', '/'].includes(btn)) handleOperationClick(btn);
                  else if (btn === '.') setDisplay(prev => prev.includes('.') ? prev : prev + '.');
                  else handleNumberClick(parseInt(btn));
                }}
              >
                {btn}
              </Button>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </Grid>
        </Grid>
        {loading && (
          <Typography align="center" sx={{ mt: 2 }}>
            <CircularProgress size={24} />
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default App;