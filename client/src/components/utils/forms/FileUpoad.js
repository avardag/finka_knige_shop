import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import axios from "axios";

//FontAwsome icons import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
//Material UI components import
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * @props handleImages -> func, gets image and passes to func in upper compnt
 * @props reset -> bool, empties images from state, after success posting a form
 */
class FileUpoad extends Component {
  constructor() {
    super()
    this.state = {
      uploadedFiles: [],
      uploading: false
    }
  }
  // @params files -> array
  onDrop(files) {
    this.setState({ uploading: true });
    //setup formData with file for request
    let formData = new FormData();
    //request header configs
    let config = {
      header: { "content-type": "multipart/form-data" }
    }
    // add a key/value pair
    formData.append('picfile', files[0]) //pic-file-> keyword to be caught by server
    //post with axios
    axios.post('/api/users/uploadimage', formData, config)
      .then(response => {
        this.setState({
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data]
        }, () => this.props.handleImages(this.state.uploadedFiles)); //func prop from upper compnt
      })
  }

  onCancel() {
    this.setState({
      files: []
    });
  }
  //removes image from cloudinary on image click
  onImageRemove = (imageId)=>{
    axios.get(`/api/users/removeimage?public_id=${imageId}`)
      .then(response=>{
        let filteredImages = this.state.uploadedFiles.filter(item=> item.public_id !== imageId);
        //update state when removed image
        this.setState({uploadedFiles: filteredImages}, ()=>{
          this.props.handleImages(filteredImages)
        })

      })
  }
  //shows uploaded images next to dropzoe icon
  showUploadedImages = () => (
    this.state.uploadedFiles.map(item=>(
      <div 
        className="dropzone_box"
        key={item.public_id}
        onClick={()=>this.onImageRemove(item.public_id)}
      >
        <div 
          className="wrap"
          style={{background: `url(${item.url}) no-repeat`}}
        >

        </div>
      </div>
    ))
    )
  //resets images filed in state when form in upper component submitted
  //based on reset props
  static getDerivedStateFromProps(nextProps, state) {
    if(nextProps.reset){
      return state={
        uploadedFiles: []
      }
    }
    return null;
  }
    
  //RENDER Method
  render() {
    
    return (
      <section>
        <div className="dropzone clear">
          <div className="dropzone_box">
            <Dropzone
              accept="image/jpeg, image/png"
              multiple={false}
              onDrop={this.onDrop.bind(this)}
              onFileDialogCancel={this.onCancel.bind(this)}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="wrap" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FontAwesomeIcon icon={faPlusCircle} />
                </div>
              )}

            </Dropzone>
          </div>


          {this.showUploadedImages()}

          {
            this.state.uploading ?
              <div className="dropzone_box" style={{ textAlign: "center", paddingTop: "60px" }}>
                <CircularProgress
                  style={{ color: "#00bcd4" }}
                  thickness={7}
                />
              </div>
              : null
          }

        </div>
      </section>
    );
  }
}

export default FileUpoad;