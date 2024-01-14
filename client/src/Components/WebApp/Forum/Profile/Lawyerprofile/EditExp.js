import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./ProfileStyles.css";
import axios from "axios";
import AppNavbar from '../../../AppNavbar';
import ExpCard from './ExpCard';


const EditExp = () => {
  const [prevDetail, setPrevDetail] = useState([]);
  const [newDetail, setNewDetail] = useState({
    court: "",
    begin: "",
    end: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewDetail({...newDetail, [name]: value});
  }

  const addExp = (e) => {
    e.preventDefault();
    try{
      axios
        .post("http://localhost:5000/profile/lsp/update-array", newDetail, {withCredentials: true})
        .then(response => {
          if(response.status === 200){
            window.location.href = "/web/app/profile";
          }
        })
        .catch(error => {
          alert("Error uplaoding data, try again later");
          window.location.href = "/web/app/profile";
        })
    }catch(error){
      alert("Error uploading data, try again later");
    }
  };

  useEffect(() => {
    async function fetchData(){
      try{
        const response = await axios.get("http://localhost:5000/forum/getProfile", {withCredentials: true});
        setPrevDetail(response.data.exp);
      }
      catch(error){
        // alert("Error loading previous data");
      }
    }

    fetchData();
  },[setPrevDetail]);

  const showExpDetails = (details) => {
    return(
      <div>
        {details.map((exp, index) => (
          <ExpCard key={index} {...exp} />
        ))}
      </div>
    );
  }

  return(
    <div className='row'>
      <div className='col-lg-3'>
        <AppNavbar/>
      </div>
      <div className='col-lg-9'>
        <div className='editEdu'>
                    <h3>Experience Details</h3>
                    <form onSubmit={addExp} className='eduForm'>
                        <h5>Add New Details</h5>
                        <div>
                        <input
                            name='court'
                            value={newDetail.court}
                            onChange={handleChange}
                            placeholder='Legal Institution Name'
                            required
                        />
                        </div>
                        <div>
                        <input
                            name='begin'
                            value={newDetail.begin}
                            onChange={handleChange}
                            placeholder='Start Date'
                            required
                        />
                        </div>
                        <div>
                            <input
                                name='end'
                                value={newDetail.end}
                                onChange={handleChange}
                                placeholder='End Date'
                            />
                        </div>
                        <div>
                            <button className='btn btn-primary' type='submit'>Add Details</button>
                        </div>
                    </form>
                    <br/>
                    <div>
                        {prevDetail.length !== 0 ? <h5>Past Experience</h5> : ""}
                        <br/>
                        {prevDetail.length !== 0 ? showExpDetails(prevDetail) : ""}
                    </div>
                </div>
      </div>
    </div>
  )
}

export default EditExp
