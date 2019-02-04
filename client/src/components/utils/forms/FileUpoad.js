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
 * @props reset -> bool
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
      header: {"content-type": "multipart/form-data"}
    }
    // add a key/value pair
    formData.append('pic-file', files[0]) //pic-file-> keyword to be caught by server
    //post with axios
    axios.post('/api/users/uploadimage', formData, config)
      .then(response =>{
        this.setState({ 
          uploading: false,
          uploadedFiles: [...this.state.uploadedFiles, response.data]
        }, ()=> this.props.handleImages(this.state.uploadedFiles));
      })
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  showUploadedImages = ()=>{

  }
  render() {
    // const files = this.state.files.map(file => (
    //   <li key={file.name}>
    //     {file.name} - {file.size} bytes
    //   </li>
    // ))

    return (
      <section>
        <div className="dropzone clear">
          <Dropzone
            className="dropzone_box"
            accept="image/jpeg, image/png"
            multiple={false}
            onDrop={this.onDrop.bind(this)}
            onFileDialogCancel={this.onCancel.bind(this)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop files here, or click to select files</p>
              </div>
            )}
          </Dropzone>

          {this.showUploadedImages()}

          {
            this.state.uploading?
              <div className="dropzone_box"  style={{ textAlign:"center", paddingTop:"60px" }}>
                <CircularProgress
                  style={{color: "#00bcd4"}}
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