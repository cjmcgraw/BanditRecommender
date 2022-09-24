import { Box, Container } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Content } from '../../types';
import { buildConsoleLogFn } from '../../utils';

const log = buildConsoleLogFn("CurrentContentView");

export interface SendEventProps {
  content: Content[]
}

export default function SendEventComponents(props: SendEventProps) {
  const content = props.content;
  const columns: GridColDef[] = [
    {field: "id"},
    {field: "globalRank"},
    {field: "source"},
    {field: "listRank"},
  ];

  return (
   <div>
      <Container>
        <Box>
          <DataGrid
            columns={columns}
            rows={content}
          />
        </Box>
      </Container>
   </div>
  )
}
