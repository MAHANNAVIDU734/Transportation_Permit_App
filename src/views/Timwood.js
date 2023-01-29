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
import { saveTimwood } from "../api/TimwoodService";
import TimwoodGrid from "./grids/TimwoodGrid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const initialValue = {
  Name_of_the_applicant: "",
  Permanent_address: "",
  National_ID_card_No: "",
  How_items_were_obtained_someone_else: "",
  District: "",
  Divisional_Secetriate: "",
  Grama_Seva_Division: "",
  Name_of_the_land_on_which_the_tree_timber_was_obtained: "",
  Deed_number: "",
  Date_of_registration: "",
  Boundary_of_Lands_North: "",
  Boundary_of_Lands_East: "",
  Boundary_of_Lands_West: "",
  Boundary_of_Lands_South: "",
  Land_type: "",
  Reason: "",
  Permitted_To_Mine: true,
  Permitted_To_Mine_Date: "",
  Permitted_To_Mine_Start: "",
  Permitted_To_Mine_End: "",
  Permitted_To_Transport: true,
  Permitted_To_Transport_Date: "",
  Permitted_To_Transport_Start: "",
  Permitted_To_Transport_End: "",
  Signature_and_seat_of_authorized_officer: true,
  Village_officer_Approved: true,
};

const Timwood = () => {
  // const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [pickerTransportDate, setPickerTransportDate] = useState(new Date());
  const [pickerTransportStart, setPickerTransportStart] = useState(new Date());
  const [pickerTransportEnd, setPickerTransportEnd] = useState(new Date());
  const [dateofRegistration, setdateofRegistration] = useState(new Date());
  const [permittedTOMineDate, setpermittedTOMineDate] = useState(new Date());
  const [permittedToMineStart, setpermittedToMineStart] = useState(new Date());
  const [permittedToMineEnd, setpermittedToMineEnd] = useState(new Date());
  const [isPermittedMine, setIsPermittedMine] = useState(true);
  const [isPermittedTransport, setIsPermittedTransport] = useState(true);
  const [isApproveOfficer, setIsApproveOfficer] = useState(true);
  const [isApproveVillage, setIsApproveVillage] = useState(true);
  const [timwood, setTimwood] = useState(initialValue);
  const [qrcode, useqrcode] = useState("");

  const onAddQRCode = (e) => {
    useqrcode({ ...qrcode, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setTimwood({ ...timwood, [e.target.name]: e.target.value });
  };

  const onValueChangeDates = (date, name) => {
    setTimwood({ ...timwood, [name]: date });
  };

  const onValueChangeSwitch = (date, name) => {
    setTimwood({ ...timwood, [name]: date });
  };

  const addTimwood = async () => {
    console.log(timwood);
    const res = await saveTimwood(timwood);
    useqrcode(res.data._id);
    if (res.status == 201) {
      console.log("Add Timber & Wood successfully!");
      MySwal.fire({
        icon: "success",
        title: "Add Timber & Wood successful",
      }).then((result) => {
        if (result.isConfirmed) {
          downloadQRCode();
          //window.location.reload(true);
        }
      });
    }
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
        <CardTitle>Timber and Wood Transport Permits</CardTitle>
      </CardHeader>
      <Form>
        <CardBody>
          <CardText>Form</CardText>
          <Label>Name of the applicant</Label>
          <Input
            placeholder="Name of the applicant"
            type="text"
            name="Name_of_the_applicant"
            onChange={(e) => onValueChange(e)}
          />
          <Label>Permenent Address</Label>
          <Input
            placeholder="Permenent Addres"
            type="Textarea"
            name="Permanent_address"
            onChange={(e) => onValueChange(e)}
          />
          <Label>NationalID cardNo</Label>
          <Input
            type="NationalID cardNo"
            placeholder="text"
            name="National_ID_card_No"
            onChange={(e) => onValueChange(e)}
          />
          <Label>How items were obtained someone else:</Label>
          <Input
            type="Textarea"
            placeholder="How_items_were_obtained_someone_else"
            name="How_items_were_obtained_someone_else"
            onChange={(e) => onValueChange(e)}
          />
          <Label>District</Label>
          <Input
            type="text"
            placeholder="District"
            name="District"
            onChange={(e) => onValueChange(e)}
          />
          <Label>Divisional Secetriate</Label>
          <Input
            type="text"
            placeholder="Divisional Secetriate"
            name="Divisional_Secetriate"
            onChange={(e) => onValueChange(e)}
          />
          <Label>Grama Seva Division</Label>
          <Input
            type="text"
            placeholder="Grama Seva Division"
            name="Grama_Seva_Division"
            onChange={(e) => onValueChange(e)}
          />
          <Label>Name of the land on which the tree timber was obtained</Label>
          <Input
            type="text"
            placeholder=">Name of the land on which the tree timber was obtained"
            name="Name_of_the_land_on_which_the_tree_timber_was_obtained"
            onChange={(e) => onValueChange(e)}
          />
          <Label for="Deed_Number">Deed Number</Label>
          <Input
            id="deed_number"
            placeholder="Deed Number"
            type="text"
            className="form-control"
            name="Deed_number"
            onChange={(e) => onValueChange(e)}
          />
          <Fragment>
            <Label for="Date_of_registration">Date of Registration</Label>
            <Flatpickr
              value={dateofRegistration}
              data-enable-time
              id="date-picker"
              className="form-control"
              name="Date_of_registration"
              onChange={(date) =>
                onValueChangeDates(date, "Date_of_registration")
              }
              //onChange={(date) => setdateofRegistration(date)}
            />
          </Fragment>
          <Label for="Boundary_of_Lands_North">Boundary_of_Lands_North</Label>
          <Input
            id="Boundary_of_Lands_North"
            placeholder="Boundary_of_Lands_North"
            text="Number"
            className="form-control"
            name="Boundary_of_Lands_North"
            onChange={(e) => onValueChange(e)}
          />
          <Label for="Boundary_of_Lands_East:">Boundary_of_Lands_East:</Label>
          <Input
            id="Boundary_of_Lands_East:"
            placeholder="Boundary_of_Lands_East:"
            text="Number"
            className="form-control"
            name="Boundary_of_Lands_East"
            onChange={(e) => onValueChange(e)}
          />
          <Label for="Boundary_of_Lands_West:">Boundary_of_Lands_West:</Label>
          <Input
            id="Boundary_of_Lands_West"
            placeholder="Boundary_of_Lands_West"
            text="Number"
            className="form-control"
            name="Boundary_of_Lands_West"
            onChange={(e) => onValueChange(e)}
          />
          <Label for="Boundary_of_Lands_South">Boundary_of_Lands_South</Label>
          <Input
            id="Boundary_of_Lands_South"
            placeholder="Boundary_of_Lands_South"
            text="Number"
            className="form-control"
            name="Boundary_of_Lands_South"
            onChange={(e) => onValueChange(e)}
          />
          <Label for="Land_type">Land_type:</Label>
          <Input
            id="Land_type"
            placeholder="Land_type"
            text="text"
            className="form-control"
            name="Land_type"
            onChange={(e) => onValueChange(e)}
          />
          <Label for="reason">Reason</Label>
          <Input
            id="reason"
            type="Textarea"
            placeholder="Reason"
            className="form-control"
            name="Reason"
            onChange={(e) => onValueChange(e)}
          />
          <Label for="switch-primary" className="form-check-label mb-50">
            Permitted To Mine
          </Label>
          <div className="form-switch form-check-primary">
            <Input
              type="switch"
              id="switch-primary"
              name="Permitted_To_Mine"
              checked={isPermittedMine}
              className="form-control"
              onClick={() => {
                setIsPermittedMine(!isPermittedMine);
                // onValueChangeSwitch(!isPermittedMine, "Permitted_To_Mine");
              }}
              onChange={(e) =>
                onValueChangeSwitch(!isPermittedMine, "Permitted_To_Mine")
              }
            />
          </div>
          <Fragment>
            <Col lg="4" md="6" className="mb-1">
              <Label className="form-label" for="date-time-picker">
                Permitted TO Mine Date
              </Label>
              <Flatpickr
                value={permittedTOMineDate}
                data-enable-time
                id="date-picker"
                className="form-control"
                name="Permitted_To_Mine_Date"
                onChange={(date) =>
                  onValueChangeDates(date, "Permitted_To_Mine_Date")
                }
              />
            </Col>
          </Fragment>
          <Fragment>
            <Label className="form-label" for="date-time-picker">
              Permitted To Mine Start
            </Label>
            <Flatpickr
              value={permittedToMineStart}
              data-enable-time
              id="date-time-picker"
              className="form-control"
              name="Permitted_To_Mine_Start"
              onChange={(date) =>
                onValueChangeDates(date, "Permitted_To_Mine_Start")
              }
            />
          </Fragment>
          <Fragment>
            <Label className="form-label" for="date-time-picker">
              Permitted To Mine End
            </Label>
            <Flatpickr
              value={permittedToMineEnd}
              data-enable-time
              id="date-time-picker"
              className="form-control"
              name="Permitted_To_Mine_End"
              onChange={(date) =>
                onValueChangeDates(date, "Permitted_To_Mine_End")
              }
            />
          </Fragment>
          <Label for="switch-primary" className="form-check-label mb-50">
            Permitted To Transport
          </Label>
          <div className="form-switch form-check-primary">
            <Input
              type="switch"
              id="switch-primary"
              name="Permitted_To_Transport"
              checked={isPermittedTransport}
              onClick={() => {
                setIsPermittedTransport(!isPermittedTransport);
              }}
              onChange={(e) =>
                onValueChangeSwitch(
                  !isPermittedTransport,
                  "Permitted_To_Transport"
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
                data-enable-time
                id="date-picker"
                className="form-control"
                name="Permitted_To_Transport_Date"
                onChange={(date) =>
                  onValueChangeDates(date, "Permitted_To_Transport_Date")
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
              data-enable-time
              id="date-time-picker"
              className="form-control"
              name="Permitted_To_Transport_Start"
              onChange={(date) =>
                onValueChangeDates(date, "Permitted_To_Transport_Start")
              }
            />
          </Fragment>
          <Fragment>
            <Label className="form-label" for="date-time-picker">
              Permitted To Transport End
            </Label>
            <Flatpickr
              value={pickerTransportEnd}
              data-enable-time
              id="date-time-picker"
              className="form-control"
              name="Permitted_To_Transport_End"
              onChange={(date) =>
                onValueChangeDates(date, "Permitted_To_Transport_End")
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
              name="Signature_and_seat_of_authorized_officer"
              checked={isApproveOfficer}
              onClick={() => {
                setIsApproveOfficer(!isApproveOfficer);
              }}
              onChange={(e) =>
                onValueChangeSwitch(
                  !isApproveOfficer,
                  "Signature_and_seat_of_authorized_officer"
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
              name="Village_officer_Approved"
              checked={isApproveVillage}
              onClick={() => {
                setIsApproveVillage(!isApproveVillage);
              }}
              onChange={(e) =>
                onValueChangeSwitch(
                  !isApproveVillage,
                  "Village_officer_Approved"
                )
              }
            />
          </div>
          <br />
          <Button color="primary" onClick={() => addTimwood()}>
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
          <CardTitle>Past Timber and Wood Transportation Permits</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>Table</CardText>
          <TimwoodGrid />
        </CardBody>
      </Card>
    </Card>
  );
};
export default Timwood;
