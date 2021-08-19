import React, { useState } from 'react';

import { DataGrid, GridColDef, GridRowModel, GridValueGetterParams } from '@material-ui/data-grid';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { StudentForm } from '../../components/StudentForm';
import { setSourceMapRange } from 'typescript';

interface gridData {
  id?: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''}`
  }
];

export const DataTable = () => {
  let { studentData, getData } = useGetData();
  let [ open, setOpen ] = useState(false);
  let [ gridData, setData ] = useState<gridData>({ id: '' });

  let handleOpen = () => {
    setOpen(true);
  };
  let handleClose = () => {
    setOpen(false);
  };

  let deleteData = async () => {
    server_calls.delete(gridData.id!);
    await getData();
    window.location.reload();
  };

  let handleCheckbox = (id: GridRowModel) => {
    if (id[0] === undefined) {
      setData({ id: '' });
    } else {
      setData({ id: id[0].toString() });
    }
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2>Students</h2>
      <DataGrid
        rows={studentData}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionModelChange={handleCheckbox}
      />

      <Button onClick={handleOpen}>Update</Button>
      <Button variant="contained" color="secondary" onClick={deleteData}>
        Delete
      </Button>

      {/*Dialog Pop Up begin */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Student</DialogTitle>
        <DialogContent>
          <DialogContentText>Update Student</DialogContentText>
          <StudentForm id={gridData.id!} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
