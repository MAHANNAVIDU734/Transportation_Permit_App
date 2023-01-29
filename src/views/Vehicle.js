import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Label,
  Form,
  Input,
  Button,
  img,
} from "reactstrap";

// ** Third Party Components
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Select from "react-select";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getVehicles, SaveVehicle } from "../api/vehicleService";
import VehicleGrid from "./grids/vehicleGrid.jsx";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const initialValue = {
  Vehicle_No_Plate_Id: "",
  Vehicle_Owner_Name: "",
  Vehicle_Type: "",
  country: "Sri Lanka",
  img: "img",
  city: "testCity",
};

const onChange = (e) => {
  const reader = new FileReader(),
    files = e.target.files;
  reader.onload = function () {
    setImage(reader.result);
  };
  reader.readAsDataURL(files[0]);
};
const groupedOptions = [
  {
    label: "Trucks",
    options: [
      { value: "Lorry", label: "Lorry" },
      { value: "Pickups", label: "Pickups" },
      { value: "Tracktor", label: "Tracktor" },
      { value: "Tow_Truck", label: "Tow_Truck" },
      { value: "Fire_Engine", label: "Fire_Engine" },
      { value: "Van", label: "Van" },
      { value: "Cement_Mixer", label: "Cement_Mixer" },
      { value: "Tanker", label: "Tanker" },
      { value: "Tracktor_Trailer", label: "Tracktor_Trailer" },
      { value: "Fork_Lift", label: "Fork_Lift" },
    ],
  },
  {
    label: "Tipper",
    options: [
      { value: "Small", label: "Small" },
      { value: "Light", label: "Light" },
      { value: "Medium", label: "Medium" },
      { value: "Heavy", label: "Heavy" },
      { value: "Very_Heavy", label: "Very_Heavy" },
    ],
  },
];
const formatGroupLabel = (data) => (
  <div className="d-flex justify-content-between align-center">
    <strong>
      <span>{data.label}</span>
    </strong>
    <span>{data.options.length}</span>
  </div>
);

const Vehicle = () => {
  const [vehicle, setVehicle] = useState(initialValue);
  const [allVehicle, setAllVehicle] = useState([]);

  // let navigate = useHistory();

  const onValueChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const onValueChangeSelect = (e, name) => {
    setVehicle({ ...vehicle, [name]: e.value });
  };

  const addVehicle = async () => {
    const res = await SaveVehicle(vehicle);
    if (res == 201) {
      console.log("Add Vehicle successfully!");
      MySwal.fire({
        icon: "success",
        title: "Add Vehicle successful",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(true);
        }
      });
    }
    // navigate("/vehicle");
  };

  useEffect(() => {
    getAllVehicles();
  }, []);

  const getAllVehicles = async () => {
    let res = await getVehicles();
    //console.log(res.data);
    setAllVehicle(res.data);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Using Vehicles In Sri Lanka</CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <CardText>Form</CardText>
            <Label>Vehicle_No_Plate_ID</Label>
            <Input
              placeholder="Vehicle_No_Plate_ID"
              name="Vehicle_No_Plate_Id"
              onChange={(e) => onValueChange(e)}
              type="text"
            />
            <Label>Vehicle_Owner_Name</Label>
            <Input
              name="Vehicle_Owner_Name"
              placeholder="Vehicle_Owner_Name"
              onChange={(e) => onValueChange(e)}
              type="text"
            />
            <Label className="form-label">Vehicle _Type</Label>
            <Select
              isClearable={false}
              options={groupedOptions}
              formatGroupLabel={formatGroupLabel}
              className="react-select"
              classNamePrefix="select"
              onChange={(e) => onValueChangeSelect(e, "Vehicle_Type")}
            />
            <Label>City_Name</Label>
            <Input
              name="city"
              placeholder="City"
              onChange={(e) => onValueChange(e)}
              type="text"
            />
            <Label>Country_Name</Label>
            <Input
              name="country"
              placeholder="Country_Name"
              onChange={(e) => onValueChange(e)}
              type="text"
            />
            <br />
            {/* <Button color='primary' onClick={() => setShow(true)}> */}
            <Button color="primary" onClick={() => addVehicle()}>
              Show
            </Button>
            <Button outline color="secondary" type="reset">
              Reset
            </Button>
          </Form>
        </CardBody>
      </Card>
      <VehicleGrid allVehicle={allVehicle} />
    </>
  );
};

export default Vehicle;
