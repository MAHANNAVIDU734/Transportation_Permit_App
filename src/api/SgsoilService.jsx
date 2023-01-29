import axios from "axios";

export const saveSgsoil = async (values) => {
  try {
    let res = await axios.post(`http://localhost:8000/api/sgsoil/add`, values);
    //console.log(res.status);
    //return res.status;
    return res;
  } catch (error) {
    console.log(error);
    // alert(error.response.data.msg);
    // return error.response.data.msg;
  }
};

//Get All Sand, Gravel, Soil
export const getSgsoil = async () => {
  try {
    let res = await axios.get(`http://localhost:8000/api/sgsoil`);
    // console.log(res.data);
    return res;
  } catch (error) {
    alert(error.response.data.msg);
    return error.response.data.msg;
  }
};

//Update Sand, Gravel, Soil
export const updateSgsoil = async (id, data) => {
  try {
    let res = await axios.put(`http://localhost:8000/api/sgsoil/${id}`, data);
    return "success";
  } catch (error) {
    alert(error.response.data.msg);
    return error.response.data.msg;
  }
};

//Delete Sand, Gravel, Soil
export const deleteSgsoil = async (id) => {
  try {
    let res = await axios.delete(`http://localhost:8000/api/sgsoil/${id}`);
    // console.log(res);
    return res.data;
  } catch (error) {
    alert(error.response.data.msg);
    return error.response.data.msg;
  }
};
