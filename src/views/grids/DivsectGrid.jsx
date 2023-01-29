import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import { getDivsect } from "../../api/divsectService";
import DivsectAction from "./DivsectAction";

const DivsectGrid = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rowID, setRowId] = useState(null);
  const [open, setOpen] = useState(false);
  const [divsect, setDivsect] = useState([]);

  useEffect(() => {
    getAllDivsect();
  }, []);

  const getAllDivsect = async () => {
    let res = await getDivsect();
    //console.log(res.data);
    setDivsect(res.data);
  };

  const colums = useMemo(
    () => [
      {
        field: "divsect_name",
        headerName: "Divisional sector name",
        width: 200,
        editable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
        editable: true,
      },
      {
        field: "district",
        headerName: "District",
        width: 150,
        editable: true,
      },
      { field: "province", headerName: "Province", width: 150, editable: true },
      { field: "phoneno", headerName: "Phone No", width: 150, editable: true },
      {
        field: "action",
        headerName: "Action",
        type: "actions",
        renderCell: (params) => (
          <DivsectAction
            {...{ params, rowID, setRowId, divsect, setDivsect }}
          />
        ),
      },
    ],
    [rowID, divsect]
  );

  return (
    <Card>
      <div style={{ height: 430, width: "100%", padding: 5 }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              columns={colums}
              rows={divsect}
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

export default DivsectGrid;
