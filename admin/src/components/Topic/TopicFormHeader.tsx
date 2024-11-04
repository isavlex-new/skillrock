import { FC } from 'react';
import { Box, Typography } from "@mui/material";
import { ITopicWithQuestions } from '../../features/topics/types';

interface ITopicFormHeaderProps {
   topic: ITopicWithQuestions;
}

const TopicFormHeader : FC<ITopicFormHeaderProps> = ({topic}) => {

    return (
      <Box display="flex" flexDirection="column" gap="20px" flex="1 1 auto">
      <Typography variant='h4' sx={{marginBottom: 2}}>Topic information</Typography>
      <Box display="flex" flexDirection="column" gap="10px">
         <Typography variant="subtitle2">Title:</Typography>
         <Typography variant="body1">{topic.title}</Typography>
         </Box>
         <Box display="flex" flexDirection="column" gap="10px">
         <Typography variant="subtitle2">Description:</Typography>
         <Typography variant="body1">{topic.content}</Typography>
         </Box>
      </Box>
    )
}

export default TopicFormHeader;