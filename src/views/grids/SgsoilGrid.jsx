import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import { getDivsect } from "../../api/divsectService";
import DivsectAction from "./DivsectAction";
import { getTimwood } from "../../api/TimwoodService";
import TimwoodAction from "./TimwoodAction";
import { getSgsoil } from "../../api/SgsoilService";
import SgsoilAction from "./SgsoilAction";

const SgsoilGrid = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rowID, setRowId] = useState(null);
  const [open, setOpen] = useState(false);
  const [sgsoil, setSgsoil] = useState([]);

  useEffect(() => {
    getAllSgsoil();
  }, []);

  const getAllSgsoil = async () => {
    let res = await getSgsoil();
    setSgsoil(res.data);
  };

  const colums = useMemo(
    () => [
      {
        field: "name_of_The_Licener",
        headerName: "Licener name",
        width: 200,
        editable: true,
      },
      {
        field: "national_Identity_Card_No",
        headerName: "NIC NO",
        width: 100,
        editable: true,
      },
      {
        field: "district",
        headerName: "District",
        width: 100,
        editable: true,
      },
      {
        field: "divisional_Secretariat",
        headerName: "Divisional Secetriate",
        width: 150,
        editable: true,
      },
      {
        field: "grama_Seva_Division",
        headerName: "GramaSeva Division",
        width: 150,
        editable: true,
      },
      {
        field: "destination",
        headerName: "Destination",
        width: 80,
        editable: true,
      },
      {
        field: "vehicle_No",
        headerName: "Vehicle No",
        width: 80,
        editable: true,
      },
      {
        field: "permitted_to_Transport",
        headerName: "Tranceport permit",
        width: 120,
        editable: true,
        type: "boolean",
      },
      {
        field: "permitted_to_Transport_Date",
        headerName: "Transport Date",
        width: 100,
        editable: true,
        renderCell: (params) => new Date(params.value[0]).toLocaleDateString(),
      },
      {
        field: "permitted_to_Transport_Start",
        headerName: "Transport Start Date",
        width: 100,
        editable: true,
        renderCell: (params) => new Date(params.value[0]).toLocaleDateString(),
      },
      {
        field: "permitted_to_Transport_End",
        headerName: "Transport End Date",
        width: 100,
        editable: true,
        renderCell: (params) => new Date(params.value[0]).toLocaleDateString(),
      },
      {
        field: "signature_and_seat_of_Authorised_Officer",
        headerName: "Officer Approvel",
        width: 100,
        editable: true,
        type: "boolean",
      },
      {
        field: "grama_Seva_Niladhari_Approved",
        headerName: "G.officer Approvel",
        width: 100,
        editable: true,
        type: "boolean",
      },
      {
        field: "action",
        headerName: "Action",
        type: "actions",
        renderCell: (params) => (
          <SgsoilAction {...{ params, rowID, setRowId, sgsoil, setSgsoil }} />
        ),
      },
    ],
    [rowID, sgsoil]
  );

  return (
    <Card>
      <div style={{ height: 430, width: "100%", padding: 5 }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              columns={colums}
              rows={sgsoil}
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

export default SgsoilGrid;
