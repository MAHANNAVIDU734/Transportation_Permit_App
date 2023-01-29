import axios from "axios";

export const saveDivsect = async (values) => {
  //console.log(values);
  try {
    let res = await axios.post(`http://localhost:8000/api/divsect/add`, values);
    console.log(res.data._id);
    //return res.status;
    return res;
  } catch (error) {
    console.log(error);
    // alert(error.response.data.msg);
    // return error.response.data.msg;
  }
};

//Get All divsect
export const getDivsect = async () => {
  try {
    let res = await axios.get(`http://localhost:8000/api/divsect`);
    // console.log(res.data);
    return res;
  } catch (error) {
    alert(error.response.data.msg);
    return error.response.data.msg;
  }
};

//Update Divsect
export const updateDivsect = async (id, data) => {
  try {
    let res = await axios.put(`http://localhost:8000/api/divsect/${id}`, data);
    return "success";
  } catch (error) {
    alert(error.response.data.msg);
    return error.response.data.msg;
  }
};

export const deleteDivsect = async (id) => {
  try {
    let res = await axios.delete(`http://localhost:8000/api/divsect/${id}`);
    // console.log(res);
    return res.data;
  } catch (error) {
    alert(error.response.data.msg);
    return error.response.data.msg;
  }
};
