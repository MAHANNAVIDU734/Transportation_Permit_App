import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import { getDivsect } from "../../api/divsectService";
import DivsectAction from "./DivsectAction";
import { getTimwood } from "../../api/TimwoodService";
import TimwoodAction from "./TimwoodAction";

const TimwoodGrid = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rowID, setRowId] = useState(null);
  const [open, setOpen] = useState(false);
  const [timwood, setTimwood] = useState([]);

  useEffect(() => {
    getAllTimewood();
  }, []);

  const getAllTimewood = async () => {
    let res = await getTimwood();
    //console.log(res.data);
    setTimwood(res.data);
  };

  const colums = useMemo(
    () => [
      {
        field: "Name_of_the_applicant",
        headerName: "Applicant name",
        width: 200,
        editable: true,
      },
      {
        field: "National_ID_card_No",
        headerName: "NIC NO",
        width: 100,
        editable: true,
      },
      {
        field: "District",
        headerName: "District",
        width: 100,
        editable: true,
      },
      {
        field: "Divisional_Secetriate",
        headerName: "Divisional Secetriate",
        width: 150,
        editable: true,
      },
      {
        field: "Grama_Seva_Division",
        headerName: "GramaSeva Division",
        width: 150,
        editable: true,
      },
      {
        field: "Deed_number",
        headerName: "Deed No",
        width: 80,
        editable: true,
      },
      {
        field: "Date_of_registration",
        headerName: "Registration Date",
        width: 100,
        editable: true,
        renderCell: (params) => new Date(params.value[0]).toLocaleDateString(),
        // {
        //   new Date(params.value[0]).toLocaleDateString();
        //   console.log(params.value[0]);
        //   console.log(new Date(params.value[0]).toLocaleDateString());
        // },
      },
      {
        field: "vehicle_No",
        headerName: "Vehicle No",
        width: 80,
        editable: true,
      },
      {
        field: "Permitted_To_Transport",
        headerName: "Tranceport permit",
        width: 120,
        editable: true,
        type: "boolean",
      },
      {
        field: "Permitted_To_Transport_Date",
        headerName: "Transport Date",
        width: 100,
        editable: true,
        renderCell: (params) => new Date(params.value[0]).toLocaleDateString(),
      },
      {
        field: "Signature_and_seat_of_authorized_officer",
        headerName: "Officer Approvel",
        width: 100,
        editable: true,
        type: "boolean",
      },
      {
        field: "Village_officer_Approved",
        headerName: "V.officer Approvel",
        width: 100,
        editable: true,
        type: "boolean",
      },
      {
        field: "action",
        headerName: "Action",
        type: "actions",
        renderCell: (params) => (
          <TimwoodAction
            {...{ params, rowID, setRowId, timwood, setTimwood }}
          />
        ),
      },
    ],
    [rowID, timwood]
  );

  return (
    <Card>
      <div style={{ height: 430, width: "100%", padding: 5 }}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              columns={colums}
              rows={timwood}
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

export default TimwoodGrid;