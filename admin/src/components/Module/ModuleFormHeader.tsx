import { Box, Typography } from "@mui/material";
import { IModuleWithTopics } from "../../features/modules/types";
import { FC } from "react";

interface IModuleFormHeaderProps {
  module: IModuleWithTopics;
}

const ModuleFormHeader : FC<IModuleFormHeaderProps> = ({module}) => {
  
    return (
      <Box display="flex" flexDirection="column" gap="20px" flex="1 1 auto">
       <Typography variant="h4">Module: {module.title}</Typography>
       <Box display="flex" flexDirection="column" gap="10px">
         <Typography variant="subtitle2">Title:</Typography>
         <Typography variant="body1">{module.title}</Typography>
         </Box>
         <Box display="flex" flexDirection="column" gap="10px">
         <Typography variant="subtitle2">Content:</Typography>
         <Typography variant="body1">{module.content}</Typography>
         </Box>
      </Box>
    )
}

export default ModuleFormHeader;