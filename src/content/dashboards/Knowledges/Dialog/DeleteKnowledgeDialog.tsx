import { useState, useEffect } from 'react';
import {
    Button, useTheme,
    IconButton, CloseIcon,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '../index';

type DeleteKnowledgeDialogProps = {
    open: boolean;
    onClose: () => void;
    knowledgeId: number;
};

const DeleteKnowledgeDialog = ({ open, onClose, knowledgeId }: DeleteKnowledgeDialogProps) => {

    const theme = useTheme();

    const handleClose = () => {
        onClose();
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
          <Button variant="outlined" onClick={handleClose} autoFocus>Delete</Button>
        </DialogActions>
        </Dialog>
    );
}

export default DeleteKnowledgeDialog;
