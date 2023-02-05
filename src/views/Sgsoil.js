import {
  Card,
  Row,
  Col,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Input,
  Form,
  Button,
  Label,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Fragment, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import QRCode from "qrcode.react";
import { useHistory } from "react-router-dom";
import { saveSgsoil } from "../api/SgsoilService";
import SgsoilGrid from "./grids/SgsoilGrid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const initialValue = {
  name_of_The_Licener: "",
  national_Identity_Card_No: "",
  address: "",
  zipcode: "",
  district: "",
  divisional_Secretariat: "",
  grama_Seva_Division: "",
  where_extracted: "",
  type_of_Mineral: "",
  vehicle_No: "",
  quantity_cubes: "",
  destination: "",
  reason: "",
  permitted_to_Transport: true,
  permitted_to_Transport_Date: "",
  permitted_to_Transport_Start: "",
  permitted_to_Transport_End: "",
  signature_and_seat_of_Authorised_Officer: true,
  grama_Seva_Niladhari_Approved: true,
};

const Sgsoil = () => {
  const [sgsoil, setSgsoil] = useState(initialValue);
  const [isPermittedTransport, setIsPermittedTransport] = useState(true);
  const [isApproveOfficer, setIsApproveOfficer] = useState(true);
  const [isApproveVillage, setIsApproveVillage] = useState(true);
  const [pickerTransportDate, setPickerTransportDate] = useState(new Date());
  const [pickerTransportStart, setPickerTransportStart] = useState(new Date());
  const [pickerTransportEnd, setPickerTransportEnd] = useState(new Date());
  const [qrcode, useqrcode] = useState("");
  const [title, setTitle] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  let navigate = useHistory();

  const onValueChange = (e) => {
    setSgsoil({ ...sgsoil, [e.target.name]: e.target.value });
  };

  const onValueChangeDates = (date, name) => {
    setSgsoil({ ...sgsoil, [name]: date });
  };

  const onValueChangeSwitch = (date, name) => {
    setSgsoil({ ...sgsoil, [name]: date });
  };

  const addSgsoilDetails = async () => {
    console.log(sgsoil);
    const res = await saveSgsoil(sgsoil);
    useqrcode(res.data._id);
    // useqrcode(res.data.permitted_to_Transport_End);
    // useqrcode(res.data.permitted_to_Transport);
    if (res.status == 201) {
      console.log("Add Sand, Gravel, Soil successfully!");
      MySwal.fire({
        icon: "success",
        title: "Add Sand, Gravel, Soil successful",
      }).then((result) => {
        if (result.isConfirmed) {
          downloadQRCode();
          //window.location.reload(true);
        }
      });
    }
  };

  const onAddQRCode = (e) => {
    useqrcode({ ...qrcode, [e.target.name]: e.target.value });
  };

  // download QR code
  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById("qrCodeEl")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL);
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sand And Soil Transport Permits</CardTitle>
      </CardHeader>
      <Form>
        <CardBody>
          <CardText>Form</CardText>
          <Label>Name of The licener</Label>
          <Input
            placeholder="Name of the licener"
            type="text"
            required={true}
            name="name_of_The_Licener"
            onChange={(e) => onValueChange(e)}
          />
          <Label>National Identity Card</Label>
          <Input
            placeholder="National Identity Card"
            type="text"
            //value={national_Identity_Card_No}
            name="national_Identity_Card_No"
            onChange={(e) => onValueChange(e)}
          />
          <Label>Address</Label>
          <Input
            type="textarea"
            placeholder="Address"
            // value={address}
            name="address"
            onChange={(e) => onValueChange(e)}
          />
          <Label>ZipCode</Label>
          <Input
            type="zipcode"
            placeholder="zipcode"
            //  value={zipcode}
            name="zipcode"
            onChange={(e) => onValueChange(e)}
          />
          <Label>District</Label>
          <Input
            type="text"
            placeholder="District"
            // value={district}
            name="district"
            onChange={(e) => onValueChange(e)}
          />
          <Label>Divisional Secetriate</Label>
          <Input
            type="text"
            placeholder="Divisional Secetriate"
            // value={divisional_Secretariat}
            name="divisional_Secretariat"
            onChange={(e) => onValueChange(e)}
          />
          <Label>Grama Seva Division</Label>
          <Input
            type="text"
            placeholder="Grama Seva Division"
            // value={grama_Seva_Division}
            name="grama_Seva_Division"
            onChange={(e) => onValueChange(e)}
          />
          <Label>Where Extracted</Label>
          <Input
            type="text"
            placeholder="where extracted"
            //value={where_extracted}
            name="where_extracted"
            onChange={(e) => onValueChange(e)}
          />
          <Label for="type_of_Mineral">Type Of Mineral</Label>
          <Input
            id="type_of_Mineral"
            placeholder="type of Mineral"
            type="text"
            className="form-control"
            name="type_of_Mineral"
            // value={type_of_Mineral}
            onChange={(e) => onValueChange(e)}
          />
          <Label for="Vehicle_No_Plate_ID">Vehicle No Plate ID</Label>
          <Input
            type="text"
            id="Vehicle_No_Plate_ID"
            placeholder="CP LA-XXXX"
            className="form-control"
            //value={vehicle_no_plate_id}
            name="vehicle_No"
            onChange={(e) => onValueChange(e)}
          />
          <Label for="quantity_cubes">Quantity_Cubes</Label>
          <Input
            id="quantity_cubes"
            placeholder="Quantity Cubes"
            text="text"
            className="form-control"
            name="quantity_cubes"
            //value={quantity_cubes}
            onChange={(e) => onValueChange(e)}
          />
          <Label for="destination">Destination</Label>
          <Input
            id="Destination"
            placeholder="Destination"
            text="text"
            className="form-control"
            name="destination"
            //value={destination}
            onChange={(e) => onValueChange(e)}
          />
          <Label for="reason">Reason</Label>
          <Input
            id="reason"
            type="Textarea"
            placeholder="Reason"
            className="form-control"
            //value={reason}
            name="reason"
            onChange={(e) => onValueChange(e)}
          />
          <Label for="switch-primary" className="form-check-label mb-50">
            Permitted To Transport
          </Label>
          <div className="form-switch form-check-primary">
            <Input
              type="switch"
              id="switch-primary"
              name="permitted_to_Transport"
              checked={isPermittedTransport}
              onClick={() => {
                setIsPermittedTransport(!isPermittedTransport);
              }}
              onChange={(e) =>
                onValueChangeSwitch(
                  !isPermittedTransport,
                  "permitted_to_Transport"
                )
              }
            />
          </div>
          <Fragment>
            <Col lg="4" md="6" className="mb-1">
              <Label className="form-label" for="date-time-picker">
                Permitted TO Transport Date
              </Label>
              <Flatpickr
                value={pickerTransportDate}
                name="permitted_to_Transport_Date"
                data-enable-time
                id="date-picker"
                className="form-control"
                onChange={(date) =>
                  onValueChangeDates(date, "permitted_to_Transport_Date")
                }
              />
            </Col>
          </Fragment>
          <Fragment>
            <Label className="form-label" for="date-time-picker">
              Permitted To Transport Start
            </Label>
            <Flatpickr
              value={pickerTransportStart}
              name="permitted_to_Transport_Start"
              data-enable-time
              id="date-time-picker"
              className="form-control"
              onChange={(date) =>
                onValueChangeDates(date, "permitted_to_Transport_Start")
              }
            />
          </Fragment>
          <Fragment>
            <Label className="form-label" for="date-time-picker">
              Permitted To Transport End
            </Label>
            <Flatpickr
              value={pickerTransportEnd}
              name="permitted_to_Transport_End"
              data-enable-time
              id="date-time-picker"
              className="form-control"
              onChange={(date) =>
                onValueChangeDates(date, "permitted_to_Transport_End")
              }
            />
          </Fragment>
          <Label className="form-label" for="sig-and-seat-ofauthorized-officer">
            Signature and Seat of Authorized Officer
          </Label>
          <div className="form-switch form-check-primary">
            <Input
              type="switch"
              id="switch-primary"
              name="signature_and_seat_of_Authorised_Officer"
              checked={isApproveOfficer}
              onClick={() => {
                setIsApproveOfficer(!isApproveOfficer);
              }}
              onChange={(e) =>
                onValueChangeSwitch(
                  !isApproveOfficer,
                  "signature_and_seat_of_Authorised_Officer"
                )
              }
            />
          </div>
          <Label className="form-label" for="sig-and-seat-ofauthorized-officer">
            Village Officer Approved
          </Label>
          <div className="form-switch form-check-primary">
            <Input
              type="switch"
              id="switch-primary"
              name="grama_Seva_Niladhari_Approved"
              checked={isApproveVillage}
              onClick={() => {
                setIsApproveVillage(!isApproveVillage);
              }}
              onChange={(e) =>
                onValueChangeSwitch(
                  !isApproveVillage,
                  "grama_Seva_Niladhari_Approved"
                )
              }
            />
          </div>
          <br />
          <Button color="primary" onClick={() => addSgsoilDetails()}>
            Submit now
          </Button>
          <Button outline color="secondary" type="reset">
            Reset
          </Button>
          <div>
            <br />
            <QRCode
              id="qrCodeEl"
              size={200}
              value={qrcode}
              name="qrcode"
              onChange={(e) => onAddQRCode()}
            />{" "}
            <br />
            <Button outline color="secondary" onClick={downloadQRCode}>
              Downloard
            </Button>
          </div>
        </CardBody>
        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      </Form>
      &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      <Card>
        <CardHeader>
          <CardTitle>
            Past Sand, Gravel and Soil Transportation Permits
          </CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>Table</CardText>
          <SgsoilGrid />
        </CardBody>
      </Card>
    </Card>
  );
};
export default Sgsoil;
