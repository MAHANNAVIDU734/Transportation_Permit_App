import axios from "axios";

export const saveTimwood = async (values) => {
  try {
    let res = await axios.post(`http://localhost:8000/api/timwood/add`, values);
    //console.log(res.status);
    //return res.status;
    return res;
  } catch (error) {
    console.log(error);
    // alert(error.response.data.msg);
    // return error.response.data.msg;
  }
};

//Get All Timber & Woods
export const getTimwood = async () => {
  try {
    let res = await axios.get(`http://localhost:8000/api/timwood`);
    // console.log(res.data);
    return res;
  } catch (error) {
    alert(error.response.data.msg);
    return error.response.data.msg;
  }
};

//Update Timwood
export const updateTimwood = async (id, data) => {
  try {
    let res = await axios.put(`http://localhost:8000/api/timwood/${id}`, data);
    return "success";
  } catch (error) {
    alert(error.response.data.msg);
    return error.response.data.msg;
  }
};

//Delete Timwood
export const deleteTimwood = async (id) => {
  try {
    let res = await axios.delete(`http://localhost:8000/api/timwood/${id}`);
    // console.log(res);
    return res.data;
  } catch (error) {
    alert(error.response.data.msg);
    return error.response.data.msg;
  }
};
