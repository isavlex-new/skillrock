import { useState, FC, ChangeEvent } from 'react';
import { 
    Stack, 
    Checkbox, 
    IconButton, 
    TextField, 
    Table, 
    TableBody, 
    TableHead, 
    TableCell, 
    TableRow, 
    TableContainer, 
    TableFooter, 
    Paper 
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import OptionItem from './OptionItem';
import { DndContext, closestCorners, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy as verticalStrategy, arrayMove } from '@dnd-kit/sortable';
import { v4 } from 'uuid';
import DragIndicator from '@mui/icons-material/DragIndicator';
import { IDraggableOption } from './CreateQuestionForm';


interface IOptionsProps {
    options: IDraggableOption[];
    setStateOptions: (options: IDraggableOption[]) => void;
}

const Options : FC<IOptionsProps> = ({options, setStateOptions}) => {
    
    const [option, setOption] = useState({id: v4(), text: '', isCorrect: false});

    const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        setOption(prev => ({...prev, text: e.target.value}));
    }

    const handleChangeIsCorrect = () => {
        setOption(prev => ({...prev, isCorrect: !prev.isCorrect}));
    }

    const addNewOption = () => {
        if (options.findIndex(opt => opt.text === option.text) < 0) {
            setStateOptions([...options, option]);
        }
        resetOption();
    }

    const resetOption = () => setOption({text: '', isCorrect: false, id: v4()});
    
    const updateOption = (currentOption: IDraggableOption, updatedOption: IDraggableOption) => {
        const index = options.findIndex(option => option.text === currentOption.text);
        const newOptions = [...options];
        newOptions[index] = updatedOption;
        setStateOptions(newOptions);
    }

    const removeOption = (currentOption: IDraggableOption) => {
        setStateOptions(options.filter(option => option.text !== currentOption.text));
    }

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if (over && active.id !== over.id) {
            const oldIndex = options.findIndex(option => option.id === active.id);
            const newIndex = options.findIndex(option => option.id === over.id);
            setStateOptions(arrayMove(options, oldIndex, newIndex));
        }
    }

    return (
      <>
      <TableContainer component={Paper} sx={{minWidth: '550px'}}>
       <Table>
        <TableHead>
            <TableRow>
                <TableCell size="small" align='center'><DragIndicator /></TableCell>
                <TableCell align='center'>Text</TableCell>
                <TableCell size="small" align='center'>True</TableCell>
                <TableCell align='center' size='small'>Actions</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <SortableContext items={options} strategy={verticalStrategy}>
        {
            options.length
            ? options.map(option => (
                <OptionItem 
                key={option.id} 
                currentOption={option}
                onRemove={removeOption}
                onUpdate={updateOption}
                />)
            )
            : <TableRow>
               <TableCell colSpan={4} align="center">No Options</TableCell>
            </TableRow>
        }
        </SortableContext>
        </DndContext>  
        </TableBody>
        <TableFooter>
        <TableRow>
            <TableCell colSpan={2}>
            <TextField fullWidth variant="standard" value={option.text} onChange={handleChangeText} name='text' placeholder='Add new option...'/> 
            </TableCell>
            <TableCell size="small" align="center">
            <Checkbox size="small" checked={option.isCorrect} name="isCorrect" onChange={handleChangeIsCorrect} />
            </TableCell>
            <TableCell>
            <Stack direction="row" justifyContent="center">
            <IconButton onClick={addNewOption}><CheckIcon sx={{width: 15, height: 15}}/></IconButton>
            <IconButton onClick={resetOption}><CloseIcon sx={{width: 15, height: 15}}/></IconButton>      
            </Stack> 
            </TableCell>
        </TableRow>
        </TableFooter>
       </Table>
      </TableContainer>
      </>
    )
}

export default Options;
