import { useState, useEffect } from 'react';
import {
    API_URL, API_KEY,
    Button, useTheme,
    IconButton, CloseIcon,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    axios,
    deleteKnowledge
} from '../index';

interface DeleteKnowledgeDialogProps {
    open: boolean;
    onClose: () => void;
    knowledgeId: number;
}

function DeleteKnowledgeDialog ({ open, onClose, knowledgeId }: DeleteKnowledgeDialogProps) {

    const theme = useTheme();

    const handleClose = () => {
      onClose();
    };

    const handleDelete = async(knowledgeId: number) => {
      const res = await axios.post(
        API_URL,
        { query: deleteKnowledge(knowledgeId)},
        { headers: {"x-api-key": API_KEY}}
      );
      console.log(res);
    };

    return (
        <Dialog 
            onClose={handleClose} 
            open={open}
        >
        <DialogTitle sx={{color: theme.palette.primary.main, fontWeight: "bold"}}>
            なれっじ削除
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
          }}
          >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <DialogContentText>
            【なれっじID : {knowledgeId} 】を削除します。よろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={()=>handleDelete(knowledgeId)} autoFocus>Delete</Button>
        </DialogActions>
        </Dialog>
    );
}

export default DeleteKnowledgeDialog;
