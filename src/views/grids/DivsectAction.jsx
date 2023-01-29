import { Box, CircularProgress, Fab, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Check, Delete, Save } from "@mui/icons-material";
import { green, grey, red } from "@mui/material/colors";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteVehicle, updateVehicles } from "../../api/vehicleService";
import { deleteDivsect, updateDivsect } from "../../api/divsectService";

const DivsectAction = ({ params, rowID, setRowId, divsect, setDivsect }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    // console.log(params.row);
    // console.log(params.id);
    setLoading(true);
    const res = await updateDivsect(params.id, params.row);
    console.log(res);
    if (res == "success") {
      setSuccess(true);
      setRowId(null);
      toast.success("Divisional Sectorory Updated succesfuly!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    const res = await deleteDivsect(params.id);
    if (res == "Divisional Secetries deleted Successfully") {
      setRowId(null);
      setDivsect(divsect.filter((row) => row._id !== params.id));
      toast.success("Divisional Secetries deleted Successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (rowID === params.id && success) setSuccess(false);
  }, [rowID]);

  return (
    <Box sx={{ m: 1, position: "relative" }}>
      {success ? (
        <Fab
          sx={{
            marginRight: 10,
            width: 40,
            height: 40,
            bgcolor: green[500],
            "&:hover": { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          sx={{
            marginRight: 10,
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowID || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
      <Tooltip title="Delete Reservation" sx={{ marginLeft: "30px" }}>
        <Fab
          sx={{
            marginLeft: 5,
            width: 40,
            height: 40,
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? red[600] : red[900],
            marginLeft: 2,
            "&:hover": { bgcolor: grey[700] },
          }}
          onClick={handleDelete}
        >
          <Delete color="#FF0000" />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default DivsectAction;
