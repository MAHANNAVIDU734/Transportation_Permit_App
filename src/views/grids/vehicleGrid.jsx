import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { getVehicles } from "../../api/vehicleService";
import { grey } from "@mui/material/colors";
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import VehicleAction from "./vehicleAction";

const VehicleGrid = ({ allVehicle }) => {
  const [pageSize, setPageSize] = useState(5);
  const [rowID, setRowId] = useState(null);
  const [open, setOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getAllVehicles();
  }, []);

  const getAllVehicles = async () => {
    let res = await getVehicles();
    console.log(res.data);
    setVehicles(res.data);
  };

  const colums = useMemo(
    () => [
      {
        field: "Vehicle_No_Plate_Id",
        headerName: "Number Plate",
        width: 150,
      },
      {
        field: "Vehicle_Owner_Name",
        headerName: "name",
        width: 250,
        editable: true,
      },
      {
        field: "Vehicle_Type",
        headerName: "Vehicle",
        width: 150,
        editable: true,
      },
      { field: "city", headerName: "City", width: 150, editable: true },
      { field: "country", headerName: "Country", width: 150, editable: true },
      {
        field: "action",
        headerName: "Action",
        type: "actions",
        renderCell: (params) => (
          <VehicleAction
            {...{ params, rowID, setRowId, vehicles, setVehicles }}
          />
        ),
      },
    ],
    [rowID, vehicles]
  );

  return (
    <Card>
      <div style={{ height: 430, width: "100%", padding: 5 }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              columns={colums}
              rows={vehicles}
              getRowId={(row) => row._id}
              rowsPerPageOptions={[5, 10, 15]}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              getRowSpacing={(params) => ({
                top: params.isFirstVisible ? 0 : 5,
                bottom: params.isLastVisible ? 0 : 5,
              })}
              sx={{
                [`& .${gridClasses.row}`]: {
                  bgcolor: (theme) =>
                    theme.palette.mode === "light" ? grey[200] : grey[900],
                },
              }}
              onCellEditCommit={(params) => {
                setRowId(params.id);
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VehicleGrid;
