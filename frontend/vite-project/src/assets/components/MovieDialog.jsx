import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from "react-redux";
import { setOpen } from '../redux/movieSlice';
import VideoBackground from './VideoBackground';

export default function MovieDialog() {
  const { open, id } = useSelector(store => store.movie);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            background: 'rgba(30, 30, 30, 0.95)',
            borderRadius: 4,
            boxShadow: 24,
            minWidth: 400,
            maxWidth: 600,
            mx: 2,
            p: 0,
          }
        }}
      >
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            background: 'transparent'
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#fff',
              mb: 2
            }}
          >
            <VideoBackground movieId={id} bool={true} />
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            pb: 2
          }}
        >
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)',
              color: '#fff',
              borderRadius: 2,
              px: 4,
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(90deg, #dd2476 0%, #ff512f 100%)',
              }
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}