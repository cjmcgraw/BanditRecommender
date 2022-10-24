import type { RecommendedContent } from '../../types';
import type { DataGridPropsWithoutDefaultValue } from '@mui/x-data-grid/models/props/DataGridProps';
import type { GridColDef, DataGridProps } from '@mui/x-data-grid';

import { Box, Container } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

export interface CurrentContentViewProps extends Omit<DataGridProps, 'column' | 'row'> {
  content: RecommendedContent[],
}

const pixelWidth = 10;

export const CurrentContentView: React.FC<CurrentContentViewProps> = (props)  => {
  const {content, ...dataGridOverrides} = props;

  function getColumn(field: string, options?: {noDynamicLength?: boolean, limit?: number}): GridColDef {
    const getLength = (record: RecommendedContent) => {
      type FieldKey = keyof typeof record;
      const column = record[field as FieldKey];
      return (column) ? (column.toString().length + 2) * pixelWidth: 100.0;
    };

    let width = 0;
    if (!options?.noDynamicLength) { 
      width = Math.min(Math.max(...content.map(getLength)), options?.limit || 100_000);
    }
    return { field, width: Math.max(width, 100.0)}

  }

  const columns = [
    getColumn("id"),
    getColumn("creatorId"),
    getColumn("source", {limit: 256}),
    getColumn("recommender"),
    getColumn("listRank"),
    getColumn("globalRank"),
  ];

  const [pageSize, setPageSize] = React.useState<number>(10);
  const dataGridProps: DataGridProps = {
    autoHeight: true,
    pageSize: pageSize,
    onPageSizeChange: (s:number, ..._rest: any) => setPageSize(s),
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    ...dataGridOverrides,
    columns: columns,
    rows: content,
  }


  return (
    <Container>
      <Box sx={{ 
        minHeight: "100%", 
        minWidth: '25%',
        boxShadow: 1,
        flexDirection: "column"
      }} >
        <DataGrid {...dataGridProps} />
      </Box>
    </Container>
  )
}
