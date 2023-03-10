import React, { useState } from 'react';
import {
  Box,
  Input,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from 'react-router-dom';

import axiosClient from '../../../api/axios';
// import { color } from '@mui/system';

function UpdateTask() {
  const [startTime, setStartTime] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('');
  const [progress, setProgress] = useState('');
  const [status, setStatus] = useState('');
  const [emptyField, setEmptyField] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isErrorSnackbarMessage, setIsErrorSnackbarMessage] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const store = JSON.parse(localStorage.getItem('store'));

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleStartTimeChange = (value) => {
    setStartTime(value);
  };

  const handleProgressChange = (e) => {
    setProgress(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = () => {
    if(!title || !description || !content || !startTime || !priority || !progress || !status) {
      setEmptyField(true)
    }
    axiosClient
      .post('/tasks', {
        title,
        description,
        content,
        start_time: startTime,
        priority,
        progress,
        status,
        user_id: store.id,
      })
      .then(() => {
        setSnackbarMessage('Th??m m???i c??ng vi???c th??nh c??ng');
        setIsErrorSnackbarMessage(false);
        setEmptyField(false);
        setShowSnackbar(true);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box sx={{ padding: '50px 0' }}>
      <Box
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '50px',
          color: '#DD5371',
        }}
      >
        Th??m m???i
      </Box>
      <Box>
        <Box sx={{ width: '80%', margin: '30px auto' }}>
          <InputLabel
            sx={{ fontSize: '30px', fontWeight: 'bold'}}
            htmlFor="Ti??u ?????"
          >
            Ti??u ?????
          </InputLabel>
          {emptyField && !title ?
            <Input
              type="text"
              placeholder="Vui l??ng nh???p ti??u ?????"
              required
              sx={{ width: '100%', color: 'red'}}
              id="title"
              name="title"
              onChange={handleTitleChange}
            />
            :
            <Input
              type="text"
              placeholder="Vui l??ng nh???p ti??u ?????"
              required
              sx={{ width: '100%'}}
              id="title"
              name="title"
              onChange={handleTitleChange}
            />
            }
        </Box>
        <Box sx={{ width: '80%', margin: '30px auto' }}>
          <InputLabel
            sx={{ fontSize: '30px', fontWeight: 'bold' }}
            htmlFor="M?? t???"
          >
            M?? t???
          </InputLabel>
          {emptyField && !description ?
          <TextField
            id="description"
            name="description"
            multiline
            rows={2}
            inputProps={{style: {color:'red'}}}
            sx={{ width: '100%' }}
            placeholder="Vui l??ng nh???p m?? t???"
            onChange={handleDescriptionChange}
          />
          :
          <TextField
            id="description"
            name="description"
            multiline
            rows={2}
            sx={{ width: '100%' }}
            placeholder="Vui l??ng nh???p m?? t???"
            onChange={handleDescriptionChange}
          />
          }
        </Box>
        <Box sx={{ width: '80%', margin: '30px auto' }}>
          <InputLabel
            sx={{ fontSize: '30px', fontWeight: 'bold' }}
            htmlFor="N???i dung"
          >
            N???i dung
          </InputLabel>
          {emptyField && !content ?
          <TextField
            id="content"
            name="content"
            onChange={handleContentChange}
            multiline
            rows={6}
            inputProps={{style: {color:'red'}}}
            sx={{ width: '100%' }}
            placeholder="Vui l??ng nh???p n???i dung"
          />
          :
          <TextField
            id="content"
            name="content"
            onChange={handleContentChange}
            multiline
            rows={6}
            sx={{ width: '100%' }}
            placeholder="Vui l??ng nh???p n???i dung"
          />
          }
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '80%',
            margin: '30px auto',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ width: '20%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">????? ??u ti??n</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="demo-simple-select"
                label="????? ??u ti??n"
                onChange={handlePriorityChange}
              >
                <MenuItem value="Th???p">Th???p</MenuItem>
                <MenuItem value="Trung b??nh">Trung b??nh</MenuItem>
                <MenuItem value="Cao">Cao</MenuItem>
              </Select>
              {emptyField && !priority && <span style={{color: 'red'}}>Vui l??ng nh???p tr?????ng n??y</span>}
            </FormControl>
          </Box>
          <Box sx={{ width: '20%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ti???n ??????????????</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="demo-simple-select"
                onChange={handleProgressChange}
                label="Ti???n ??????????????"
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="50">50</MenuItem>
                <MenuItem value="80">80</MenuItem>
                <MenuItem value="100">100</MenuItem>
              </Select>
              {emptyField && !progress && <span style={{color: 'red'}}>Vui l??ng nh???p tr?????ng n??y</span>}
            </FormControl>
          </Box>
          <Box sx={{ width: '20%' }}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={startTime}
                  onChange={handleStartTimeChange}
                  label="Th???i h???n"
                  ampm={false}
                  inputFormat="DD/MM/YYYY HH:mm"
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      onChange={handleStartTimeChange}
                      inputProps={{
                        ...props.inputProps,
                        placeholder: 'DD/MM/YYYY HH:mm',
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              {emptyField && !startTime && <span style={{color: 'red'}}>Vui l??ng nh???p tr?????ng n??y</span>}
            </FormControl>
          </Box>
          <Box sx={{ width: '20%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tr???ng th??i</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="demo-simple-select"
                label="Tr???ng th??i"
                onChange={handleStatusChange}
              >
                <MenuItem value="B???t ?????u">B???t ?????u</MenuItem>
                <MenuItem value="??ang th???c hi???n">??ang th???c hi???n</MenuItem>
                <MenuItem value="T???m d???ng">T???m d???ng</MenuItem>
                <MenuItem value="Ho??n th??nh">Ho??n th??nh</MenuItem>
              </Select>
              {emptyField && !status && <span style={{color: 'red'}}>Vui l??ng nh???p tr?????ng n??y</span>}
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#DD5371',
          }}
          onClick={handleSubmit}
        >
          <Box
            sx={{
              fontSize: '15px',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Th??m m???i
          </Box>
        </Button>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity={isErrorSnackbarMessage ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UpdateTask;
