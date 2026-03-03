import { Stack, IconButton, Tooltip } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";

const ActionButtons = ({ onView, onEdit, onDelete }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      {onView && (
        <Tooltip title="View">
          <IconButton size="small" onClick={onView}>
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title="Edit">
          <IconButton size="small" onClick={onEdit}>
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title="Delete">
          <IconButton size="small" color="error" onClick={onDelete}>
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

export { ActionButtons };
