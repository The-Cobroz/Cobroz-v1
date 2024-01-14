import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import AppNavbar from '../AppNavbar';
// import image from "../../../Images/image.png";
// import fileIcon from "../../../Images/file-attach.png";
import pic from "../../../Images/profile-image.png";
import "./ForumStyles.css";
import "../Styles.css";
import axios from 'axios';

const NewPost = () => {

    const [user, setUser] = useState("");
    const [post, setPost] = useState({
        content: "",
        tags: []
    }); 

    const [newTag, setNewTag] = useState([]);

    // const [file, setFile] = useState({
    //     images: [],
    //     other: []
    // })

    const setContent = (e) => {
        setPost({...post, content: e.target.value});
    };

    const addTags = (newTag) => {
        setPost({...post, tags : newTag});
    };

    function toggleArray(element){
        let index = newTag.indexOf(element);
        if(index === -1){
            newTag.push(element);
        }
        else{
            newTag.splice(index, 1);
        }
    }

    const handleTags = (event) => {
        var compo = event.currentTarget; //selecting the tag which was clicked
        let select = compo.getAttribute('select');
        let tagName = compo.getAttribute('id');
        if(select === 'true'){
            compo.classList.toggle("tag");
            compo.classList.toggle("tag-select");
            compo.setAttribute("select", "false");
            toggleArray(tagName);
            setNewTag(newTag);
        }
        else{
            compo.classList.toggle("tag");
            compo.classList.toggle("tag-select");
            compo.setAttribute("select", "true");
            toggleArray(tagName);
            setNewTag(newTag);
        }
        addTags(newTag);
    };

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get("http://localhost:5000/profile/getProfile", {withCredentials: true});
                if(response.status === 200){
                    setUser(response.data.name);
                }
                else{
                    alert("Error connecting with server");
                }
            }   
            catch(error){
                alert("try again later");
            }
        };

        
        fetchData();
    },[setUser]);

    const postQuery = (e) => {
        e.preventDefault();
        try{
            axios
                .post("http://localhost:5000/forum/newpost", post, {withCredentials: true})
                .then(response => {
                    if(response.status === 200){
                        window.location.href = "/web/app";
                        alert("Post Added to Forum Successfully");
                    }
                    else{
                        alert("Unable to post, try again later");
                    }
                })
                .catch(error => {
                    console.log(error);
                    alert("Error posting, try again later");
                })
        }catch(error){
            console.error();
            alert("Error connecting to the server");
        }
    };

    // const handleFile = (e) => {

    // }

    return (
        <div className='row'>
            <div className='col-sm-3'>
                <AppNavbar/>
            </div>
            <div className='col-sm-9 client-area'>
                <div>
                    <div className='user select-view'>
                        <div className='profilepic'>
                            <img src={pic} alt='profile' />
                        </div>
                        <div className='userdetails'>
                            <h4>{user}</h4>
                            <select name='visibility' >
                                <option>Everyone can see this post</option>
                                <option>Only Lawyers</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className='postArea'>
                            <textarea
                                name='content'
                                value={post.content}
                                placeholder="What's your problem?!"
                                onChange={setContent}
                                required
                                rows={8}
                                cols={70}
                                maxLength={500}
                            />
                        </div>
                        {/* <div className='toolbox'>
                            <>
                                <input
                                    type='file'
                                    name='images'
                                    value={file.images}
                                    onChange={handleFile}
                                    multiple
                                    className='toolip'
                                    id='imageip'
                                />
                                <label htmlFor='imageip' className='tool'>
                                    <img src={image} alt='images' onClick={() => document.getElementById('imageip').click()}/   >
                                </label>
                                <input
                                    type='file'
                                    name='images'
                                    value={file.images}
                                    onChange={handleFile}
                                    multiple
                                    className='toolip'
                                    id='fileip'
                                />
                                <label htmlFor='fileip' className='tool'>
                                    <img src={fileIcon} alt='files' onClick={() => document.getElementById('fileip').click()}/   >
                                </label>
                                
                            </>
                        </div> */}
                    </div>
                    <br/>
                    <div>
                        <h5>Add Tags (Click to Choose)</h5>
                        <div className='tags'>
                            <div className='tag' id='Corporate' select='false' onClick={handleTags}><h6>Corporate</h6></div>
                            <div className='tag' id='Criminal' select='false'  onClick={handleTags}><h6>Criminal</h6></div>
                            <div className='tag' id='Civil' select='false' onClick={handleTags}><h6>Civil</h6></div>
                            <div className='tag' id='Property' select='false'onClick={handleTags} ><h6>Property</h6></div>
                            <div className='tag' id='Divorce' select='false'  onClick={handleTags}><h6>Divorce</h6></div>
                        </div>
                    </div>
                    <br/>
                    <button className='btn btn-outline-primary' onClick={postQuery}>Post</button>
                    <button className='btn btn-outline-secondary' onClick={postQuery}>Post it anonymously</button>
                </div>
            </div>
        </div>
    )
}

export default NewPost;
