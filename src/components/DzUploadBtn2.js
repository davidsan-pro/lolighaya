import React from "react";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from "react-dropzone-uploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import * as fn from "../MyFunctions";

const DzUploadBtn2 = ( props ) => {
  const loginData = fn.getCurrentLogin();

  // console.log('dzuploadbtn2', props);
  const toast = (innerHTML) => {
    const el = document.getElementById('toast')
    el.innerHTML = innerHTML
    el.className = 'show'
    setTimeout(() => { el.className = el.className.replace('show', '') }, 3000)
  }

  // const getUploadParams = () => {
  //   return { url: 'https://httpbin.org/post' }
  // }
  const getUploadParams = ({ file, meta }) => {
    console.log('getuploadparams', file, meta);
    const body = new FormData();
    body.append('myFile', file);
  
    const myurl = fn.prepURL('/users/upload_file');
    return { url: myurl, body }
  }

  const handleChangeStatus = ({ meta, file}, status) => {
    if (status === 'done'){
      console.log('handlechangestatus', status, meta, file);
    //   console.log('response', xhr);
    //   let response = JSON.parse(xhr.response);

    //   // file.
    }  
  };
  // const handleChangeStatus = ({ meta, remove }, status) => {
  //   console.log('handlechangestatus', status, meta);
  //   if (status === 'headers_received') {
  //     toast(`${meta.name} uploaded!`)
  //     remove()
  //   } else if (status === 'aborted') {
  //     toast(`${meta.name}, upload failed...`)
  //   }
  //   if (status === 'done') {
  //     let fd = new FormData();
  //     fd.append('my_file', meta);
  //     fd.append('field_name', 'user_profile_pic');
  //     fd.append('user_id', loginData.id);
  //     for (var pair of fd.entries()) {
  //       console.log('body', pair[0]+ ', ' + pair[1]); 
  //     }
  
  //     let myurl = fn.prepURL('/users/upload_file');
  //     console.log('done myurl', myurl);
  //     fetch(
  //       myurl, 
  //       {
  //         method: 'POST',
  //         body: JSON.stringify(fd),
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     )
  //       .then(response => response.json())
  //       .then(res => {
  //         console.log('done res', res);
  //       })
  //       .catch(err => console.error('error', err));
  //   }
  // }

  return (
    <React.Fragment>
      <div id="toast">Upload</div>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent="Drop A File"
        styles={{
          dropzone: { height: 200 },
          dropzoneActive: { borderColor: 'green' },
        }}
      />
    </React.Fragment>
  )
}

export default DzUploadBtn2;
