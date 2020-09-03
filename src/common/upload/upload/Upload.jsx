import React, { Component } from "react";
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import Progress from "../progress/Progress";
import consts from '../../../consts'
const user = JSON.parse(localStorage.getItem(consts.userkey))

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false
    };
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    if (this.state.files.length == 0) {
      this.setState(prevState => ({
        files: prevState.files.concat(files)
      }));
    }
  }

  uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      Promise.all(promises).then(() => this.setState({ successfullUploaded: true, uploading: false }))
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);
      const request = axios.post(`${consts.API_URL}/upload`, formData)
        .then(resp => {
          toastr.success('Sucesso', 'Operação realizada com sucesso.')
          this.props.retorno(resp.data)
        }).catch(e => {
          toastr.error('Erro', e)
        })
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    return (
      <button disabled={this.state.files.length < 0 || this.state.uploading} onClick={this.uploadFiles}>
        Upload
      </button>
    )
  }

  render() {
    return (
      <div className="Upload">
        <div className="Content">
          <div className='col-sm-6'>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded} />
          </div>
          <div className="Actions col-sm-6">{this.renderActions()}
            <div className="Files">
              {this.state.files.map(file => {
                return (
                  <div key={file.name} className="Row">
                    {this.renderProgress(file)}
                    <span className="Filename">{file.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
