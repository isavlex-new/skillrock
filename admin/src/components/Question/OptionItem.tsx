import { useToggle } from '../../hooks/useToggle';
import { useState, memo, FC, ChangeEvent } from 'react';
import { Stack, Checkbox, IconButton, styled, TableCell, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ReplayIcon from '@mui/icons-material/Replay';
import DragIcon from '@mui/icons-material/DragIndicator';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IDraggableOption } from './CreateQuestionForm';


const CustomTableRow = styled('tr')({
    display: 'table-row',
    color: 'inherit',
    verticalAlign: 'middle',
    outline: 0
});

interface IOptionsItemProps {
    currentOption: IDraggableOption;
    onUpdate: (currentOption: IDraggableOption, updatedOption: IDraggableOption) => void;
    onRemove: (currentOption: IDraggableOption) => void;
}

const OptionItem : FC<IOptionsItemProps> = ({currentOption, onUpdate, onRemove}) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: currentOption.id});

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    const [option, setOption] = useState(currentOption);

    const [isEdit, toggleEdit] = useToggle();

    const handleChangeText = (e : ChangeEvent<HTMLInputElement>) => {
        setOption(prev => ({...prev, text: e.target.value}));
    }

    const handleChangeIsCorrect = () => {
        setOption(prev => ({...prev, isCorrect: !prev.isCorrect}));
    }

    const resetOption = () => {
        setOption(currentOption);
        toggleEdit();
    }

    const deleteOption = () => onRemove(currentOption);

    const updateOption = () => {
        onUpdate(currentOption, option);
        toggleEdit();
    }

    return (
      <CustomTableRow ref={setNodeRef} {...attributes} style={style}>
      <TableCell size="small" align="center">
      <IconButton {...listeners}><DragIcon sx={{width: '15px', height: '15px'}} /></IconButton>
      </TableCell>
      <TableCell align="left">
       {
        isEdit
        ? <TextField sx={{fontSize: '0.875rem'}} value={option.text} variant="standard" fullWidth onChange={handleChangeText} autoFocus name='text' />
        : option.text
       }
      </TableCell>
      <TableCell align="center" size="small">
      <Checkbox size="small" disabled={!isEdit} checked={option.isCorrect} onChange={handleChangeIsCorrect} />
      </TableCell>
      <TableCell align='center' size='small'>
       <Stack direction="row" justifyContent="center">
       {
            isEdit
            ? (
               <>
               <IconButton onClick={updateOption}><CheckIcon sx={{width: '15px', height: '15px'}}/></IconButton>
               <IconButton onClick={resetOption}><ReplayIcon sx={{width: '15px', height: '15px'}}/></IconButton>
               </>
            )
            : (
               <>
               <IconButton onClick={toggleEdit}><EditIcon sx={{width: '15px', height: '15px'}}/></IconButton>
               <IconButton onClick={deleteOption}><DeleteIcon sx={{width: '15px', height: '15px'}}/></IconButton>
               </>
            )
         }
       </Stack>
      </TableCell>
      </CustomTableRow>
    )
}

export default memo(OptionItem);
