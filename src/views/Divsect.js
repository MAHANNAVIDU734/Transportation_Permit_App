import react, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Label,
  Input,
  Button,
} from "reactstrap";
import Select from "react-select";
//import QRCode from "react-qr-code";
import QRCode from "qrcode.react";
import { saveDivsect } from "../api/divsectService";
import DivsectGrid from "./grids/DivsectGrid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const initialValue = {
  divsect_name: "",
  email: "",
  district: "",
  province: "",
  phoneno: "",
};

const Divsect = () => {
  const [divsect, setDivsect] = useState(initialValue);
  const { divsect_name, email, district, province, phoneno } = divsect;
  const [qrcode, useqrcode] = useState("");

  const onValueChange = (e) => {
    setDivsect({ ...divsect, [e.target.name]: e.target.value });
  };

  const onValueChangeSelect = (e, name) => {
    setDivsect({ ...divsect, [name]: e.value });
  };

  const addDivsectDetails = async () => {
    //console.log(divsect);
    const res = await saveDivsect(divsect);
    //console.log(res.data._id);
    useqrcode(res.data._id);
    if (res.status == 201) {
      console.log("Add devsec successfully!");
      MySwal.fire({
        icon: "success",
        title: "Add Divisional Secetries successful",
      }).then((result) => {
        if (result.isConfirmed) {
          //window.location.reload(true);
          downloadQRCode();
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

  const formatGroupLabel = (data) => (
    <div className="d-flex justify-content-between align-center">
      <strong>
        <span>{data.label}</span>
      </strong>
      <span>{data.options.length}</span>
    </div>
  );
  const groupedOptionsDistrict = [
    { value: "Colombo", label: "Colombo" },
    { value: "Gampaha", label: "Gampaha" },
    { value: "Kalutara", label: "Kalutara" },
    { value: "Kandy", label: "Kandy" },
    { value: "Matale", label: "Matale" },
    { value: "Nuwara-Eliya", label: "Nuwara Eliya" },
    { value: "Galle", label: "Galle" },
    { value: "Matara", label: "Matara" },
    { value: "Hambantota", label: "Hambantota" },
    { value: "Jaffna", label: "Jaffna" },
    { value: "Kilinochchi", label: "Kilinochchi" },
    { value: "Mannar", label: "Mannar" },
    { value: "Vavuniya", label: "Vavuniya" },
    { value: "Mullaitivu", label: "Mullaitivu" },
    { value: "Batticaloa", label: "Batticaloa" },
    { value: "Ampara", label: "Ampara" },
    { value: "Trincomalee", label: "Trincomalee" },
    { value: "Kurunegala", label: "Kurunegala" },
    { value: "Puttalam", label: "Puttalam" },
    { value: "Anuradhapura", label: "Anuradhapura" },
    { value: "Polonnaruwa", label: "Polonnaruwa" },
    { value: "Badulla", label: "Badulla" },
    { value: "Moneragala", label: "Moneragala" },
    { value: "Ratnapura", label: "Ratnapura" },
    { value: "Kegalle", label: "Kegalle" },
  ];

  const groupedOptionsProvince = [
    { value: "Central-Province", label: "Central-Province" },
    { value: "Eastern-Province ", label: "Eastern-Province" },
    { value: "Northern-Province ", label: "Northern-Province" },
    { value: "Southern-Province ", label: "Southern-Province" },
    { value: "Western-Province ", label: "Western-Province" },
    { value: "North-Western-Province ", label: "North-Western-Province" },
    { value: "North-Central-Province ", label: "North-Central-Province" },
    { value: "Uva-Province", label: "Uva-Province" },
    { value: "Sabaragamuwa-Province ", label: "Sabaragamuwa-Province" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Divisional Secretaries In Sri Lanka</CardTitle>
      </CardHeader>
      <Container>
        <CardBody>
          <CardText>Form</CardText>

          <Label htmlFor="my-input">Divisional Secetriate Name</Label>
          <Input
            type="text"
            placeholder="Divisional Secetraite Name"
            value={divsect_name}
            onChange={(e) => onValueChange(e)}
            name="divsect_name"
            id="my-input"
          />
          <Label htmlFor="my-input">email</Label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onValueChange(e)}
            name="email"
            id="my-input"
          />
          <Label htmlFor="my-input">District</Label>
          <Select
            options={groupedOptionsDistrict}
            formatGroupLabel={formatGroupLabel}
            className="react-select"
            classNamePrefix="select"
            isClearable={false}
            defaultValue={groupedOptionsDistrict[1]}
            // value={district}
            name="district"
            id="my-input"
            onChange={(e) => onValueChangeSelect(e, "district")}
          />
          <Label htmlFor="my-input">Province</Label>
          <Select
            defaultValue={groupedOptionsProvince[1]}
            options={groupedOptionsProvince}
            formatGroupLabel={formatGroupLabel}
            className="react-select"
            classNamePrefix="select"
            isClearable={false}
            //value={province}
            name="province"
            id="my-input"
            onChange={(e) => onValueChangeSelect(e, "province")}
          />
          <Label htmlFor="my-input">Phone-No</Label>
          <Input
            type="phoneno"
            value={phoneno}
            onChange={(e) => onValueChange(e)}
            name="phoneno"
            id="my-input"
          />
          <br />
          <Button color="primary" onClick={() => addDivsectDetails()}>
            Add Divsect
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
      </Container>
      <Card>
        <CardHeader>
          <CardTitle>Table of Divisional Secretaries</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>Table</CardText>
          <CardText></CardText>
          <DivsectGrid />
        </CardBody>
      </Card>
    </Card>
  );
};

export default Divsect;
