import { useState, useEffect } from 'react';
import {
    graphqlApiCall, deleteKnowledgeData, graphqlApiResult,
    Button, useTheme, IconButton, CloseIcon,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
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
      const res: any = await graphqlApiCall(deleteKnowledgeData(knowledgeId));
      const result: boolean = graphqlApiResult(res.deleteKnowledgeData);
      const alert_msg = result ? `【なれっじID : ${knowledgeId} 】を削除しました。` : `【なれっじID : ${knowledgeId} 】の削除に失敗しました。システム管理者に連絡してください。`;
      alert(alert_msg);
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
