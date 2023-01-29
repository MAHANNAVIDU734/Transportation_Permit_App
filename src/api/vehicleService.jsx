import axios from "axios";

export const SaveVehicle = async (values) => {
  //console.log(values);
  try {
    let res = await axios.post(`http://localhost:8000/api/vehicle`, values);
    //console.log(res.status);
    return res.status;
  } catch (error) {
    console.log(error);
    // alert(error.response.data.msg);
    // return error.response.data.msg;
  }
};

export const getVehicles = async () => {
  try {
    let res = await axios.get(`http://localhost:8000/api/vehicle`);
    // console.log(res.data);
    return res;
  } catch (error) {
    alert(error.response.data.msg);
    return error.response.data.msg;
  }
};

export const updateVehicles = async (id, data) => {
  try {
    let res = await axios.put(`http://localhost:8000/api/vehicle/${id}`, data);
    return "success";
  } catch (error) {
    alert(error.response.data.msg);
    return error.response.data.msg;
  }
};

export const deleteVehicle = async (id) => {
  try {
    let res = await axios.delete(`http://localhost:8000/api/vehicle/${id}`);
    //console.log(res);
    return res.data;
  } catch (error) {
    alert(error.response.data.msg);
    return error.response.data.msg;
  }
};
