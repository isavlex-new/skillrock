import { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';


interface IConfirmProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    text: string;
}

const Confirm : FC<IConfirmProps> = ({open, onClose, onConfirm, text}) => {
    return (
        <Dialog open={open} onClose={onClose}>
         <DialogTitle>Confirm action</DialogTitle>
         <DialogContent>
            <DialogContentText>
                {text}
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={onConfirm}>Confirm</Button>
            <Button onClick={onClose}>Cancel</Button>
         </DialogActions>
        </Dialog>
    )
}

export default Confirm;