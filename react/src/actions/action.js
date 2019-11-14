import axios from 'axios';


const fetchAppointments = () => {
    return (dispatch) => {
        axios.get("http://localhost:5000/getAppointments")
        .then(res => {
            dispatch({type: 'GET_ONLINE', payload: res.data.data})
         })
         .catch(err => err)
    }
}

export default fetchAppointments;