import { useState, useEffect } from 'react';
import { fetchPermissions } from '../../features/permissions/permissionsThunk';
import { Button, Paper, Typography, CircularProgress } from '@mui/material';
import {DataGrid} from "@mui/x-data-grid";
import './Permissions.scss';
import Permission from "./Permission";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import { addOrUpdatePermission } from '../../features/permissions/permissionsSlice';
import {resetState} from "../../features/permissions/permissionSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedStore.ts";
import {IPermission} from "../../features/permissions/types.ts";

const Permissions = () => {
    const dispatch = useAppDispatch();
    const { permissions = [], status, error } = useAppSelector((state) => {
        return state.permissions
    });

    // State to track modal visibility and selected permissionId
    const [open, setOpen] = useState<boolean>(false);
    const [selectedPermissionId, setSelectedPermissionId] = useState<IPermission['_id'] | null>(null);

    const columns = [
        { field: 'name', headerName: 'Title', width: 300 },
        { field: 'description', headerName: 'Description', flex: 1, minWidth: 500 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params: any) => (
                <>
                    <IconButton
                        color="primary"
                        onClick={() => handleRowClick(params.row._id)} // Pass row ID to onEdit
                    >
                        <EditIcon />
                    </IconButton>
                    {/*<IconButton*/}
                    {/*    color="secondary"*/}
                    {/*    onClick={() => onDelete(params.row.id)} // Pass row ID to onDelete*/}
                    {/*>*/}
                    {/*    <DeleteIcon />*/}
                    {/*</IconButton>*/}
                </>
            ),
        },
    ];

    // Close modal
    const handleClose = (permission?: IPermission) => {
        setOpen(false);
        dispatch(resetState())
        if (permission) {
            dispatch(addOrUpdatePermission(permission))
        }
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPermissions());
        }
    }, [status, dispatch]);


    const getRowId = (row: any) => {
        return row._id;
    }


    // Handle row click to open modal
    const handleRowClick = (permissionId?: IPermission["_id"]) => {
      setSelectedPermissionId(permissionId || null); // Store the selected permissionId
      setOpen(true); // Open the modal
    };

    return (
      <Paper>
        <div className="permissionsTitle">
          <h1>Permissions List</h1>
          <Button onClick={() => handleRowClick()} variant="contained">
            Create New Permission
          </Button>
        </div>

        {status === "fetching" ? (
          <CircularProgress />
        ) : (
          <>
            <DataGrid
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 },
                },
              }}
              getRowId={getRowId}
              rows={permissions}
              columns={columns}
              // checkboxSelection
              sx={{ width: "100%", border: 0 }}
            />

            {/* Modal to show Permission component */}
            {open ? (
              <Dialog
                open={open}
                onClose={() => {
                  handleClose();
                }}
              >
                <DialogTitle>Permission Details</DialogTitle>
                <DialogContent>
                  <Permission
                    permissionId={selectedPermissionId}
                    handleClose={handleClose}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      handleClose();
                    }}
                    color="primary"
                  >
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            ) : (
              ""
            )}
          </>
        )}

        {error && <Typography color="error">{error}</Typography>}
      </Paper>
    );
};

export default Permissions;
