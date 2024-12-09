import React, { useState } from 'react';
import ResultDisplay from './ResultDisplay';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

function SpamChecker() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [openInputDialog, setOpenInputDialog] = useState(false);
  const [openResultDialog, setOpenResultDialog] = useState(false);

  const backendUrl = 'https://sw-backend-six.vercel.app/';

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleCheckSpam = async () => {
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        setOpenResultDialog(true); // Open the result dialog on success
      } else {
        console.error('Error: Failed to check spam.');
        alert('Failed to check spam. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while connecting to the server.');
    }
  };

  const handleOpenInputDialog = () => {
    setOpenInputDialog(true);
  };

  const handleCloseInputDialog = () => {
    setOpenInputDialog(false);
  };

  const handleCloseResultDialog = () => {
    setOpenResultDialog(false);
  };

  return (
    <div className="spam-checker">
      <Button variant="contained" color="primary" onClick={handleOpenInputDialog}>
        Enter Content
      </Button>
      
      <Dialog open={openInputDialog} onClose={handleCloseInputDialog} maxWidth="md" fullWidth>
        <DialogTitle>Enter Your Content</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={10} // Adjust rows to fit larger content
            variant="outlined"
            value={text}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInputDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCheckSpam} color="primary">
            Check Spam
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openResultDialog} onClose={handleCloseResultDialog} maxWidth="md" fullWidth>
        <DialogTitle>Spam Check Result</DialogTitle>
        <DialogContent>
          {result && <ResultDisplay result={result} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResultDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SpamChecker;
