import { useState, useEffect } from 'react';
import {
    graphqlApiCall, deleteKnowledgeData, graphqlApiResult, DeleteKnowledgeDataInputType,
    Button, useTheme, IconButton, CloseIcon, SuccessDialog,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '../index';

interface DeleteKnowledgeDialogProps {
    open: boolean;
    onClose: () => void;
    knowledgeId: number;
}

function DeleteKnowledgeDialog ({ open, onClose, knowledgeId }: DeleteKnowledgeDialogProps) {

    const theme = useTheme();
    const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);
    const [successDialogMsg, setSuccessDialogMsg] = useState<string>('');

    const callApiDeleteKnowledge = async(deleteKnowledgeDataInput: DeleteKnowledgeDataInputType) => {
      try {
        const res: any = await graphqlApiCall(deleteKnowledgeData(deleteKnowledgeDataInput));
        const result: boolean = graphqlApiResult(res.deleteNarejiroDevTable);
        if(result){
          setSuccessDialogMsg("なれっじ 「【ID：" + res.deleteNarejiroDevTable.SK + " 】" + res.deleteNarejiroDevTable.title + "」を削除しました！");
          setSuccessDialogOpen(true);
        }else{
          alert("Failed to delete knowledge.");
        }
      } catch (error) {
        console.error('Error deleting knowledge:', error);
        alert("An error occurred while deleting knowledge.");
      }
    };

    const handleClose = () => {
      onClose();
    };

    const handleDelete = async(knowledgeId: number) => {
      const deleteKnowledgeDataInput: DeleteKnowledgeDataInputType = {            
          SK: knowledgeId
      };
      callApiDeleteKnowledge(deleteKnowledgeDataInput);
    };

    const handleSuccessDialogClose = () => {
        setSuccessDialogOpen(false);
        onClose();
        window.location.reload();
    };

    return (
      <>
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
        <SuccessDialog
          open={successDialogOpen}
          onClose={handleSuccessDialogClose}
          title="なれっじ新規作成成功"
          message={successDialogMsg}
        />
      </>
    );
}

export default DeleteKnowledgeDialog;
