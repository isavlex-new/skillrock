import {Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {addPermission, fetchPermission, updatePermission} from "../../features/permissions/permissionsThunk";
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedStore.ts";
import { type IPermission } from "../../features/permissions/types.ts";

interface PermissionProps {
    permissionId?: IPermission["_id"] | null,
    handleClose?: () => void
}

const Permission = ({ permissionId, handleClose }: PermissionProps) => {
    const dispatch = useAppDispatch();
    // Select permission state from Redux store
    const { permission, status, error } = useAppSelector((state) => state.permission);

    // Local state to handle form inputs
    const [formData, setFormData] = useState<Omit<IPermission, "_id">>({
      name: "",
      description: "",
    });

    // Effect to fetch permission if `permissionId` is provided
    useEffect(() => {
      if (permissionId) {
        dispatch(fetchPermission(permissionId));
      }
    }, [dispatch]);

    // Sync local state with Redux state when `permission` changes
    useEffect(() => {
      if (permissionId && permission) {
        setFormData({
          ...formData,
          name: permission?.name || "",
          description: permission?.description || "",
        });
      }
    }, [permissionId, permission]);

    // Automatically close modal if the status becomes "succeeded"
    useEffect(() => {
      if (status === "succeeded") {
        handleClose?.(); // Close the modal
      }
    }, [status, handleClose]);

    // Handle form input changes
    const handleChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    // Handle form submission
    const handleSubmit = (e: any) => {
      e.preventDefault();
      if (permissionId) {
        dispatch(
          updatePermission({
            permissionId,
            updatedPermission: {
              ...formData,
            },
          })
        );
      } else {
        dispatch(addPermission(formData));
      }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Permission Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 2 }}
            >
                {permissionId ? 'Update' : 'Add' } Permission
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};


export default Permission;
