import { getDroppedOrSelectedFiles } from "html5-file-selector";
import Dropzone from "react-dropzone-uploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const DzUploadBtn = ( props ) => {
  // console.log('props', props);
  const fontSize = props.size === 'sm' ? '14px' : '20px';
  const maxNumFile = parseInt(props.maxNumFile|0) > 0 ? props.maxNumFile : '1';
  const allowMultiple = parseInt(maxNumFile) > 1 ? 'multiple' : '';
  
  const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const text = files.length > 0 ? "Add more files" : "Choose file";

    return (
      <label
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
          padding: "5px 15px",
          fontSize: {fontSize},
          borderRadius: 3
        }}
      >
        <span className="pe-2"><FontAwesomeIcon icon={faCamera} /></span>
        {text}
        <input
          style={{ display: "none" }}
          type="file"
          accept={accept}
          onChange={(e) => {
            getFilesFromEvent(e).then((chosenFiles) => {
              onFiles(chosenFiles);
            });
          }}
        />
      </label>
    );
  };
  // end const Input 

  const CustomInput = () => {
    const handleSubmit = (files, allFiles) => {
      console.log(
        "handlesubmit",
        files.map((f) => f.meta)
      );
      allFiles.forEach((f) => f.remove());
    };

    const getFilesFromEvent = (e) => {
      console.log("getfilesfromevent");
      return new Promise((resolve) => {
        getDroppedOrSelectedFiles(e).then((chosenFiles) => {
          resolve(chosenFiles.map((f) => f.fileObject));
        });
      });
    };

    return (
      <Dropzone
        accept="image/jpeg,image/png"
        getUploadParams={() => ({ url: "https://httpbin.org/post" })}
        onSubmit={handleSubmit}
        InputComponent={Input}
        getFilesFromEvent={getFilesFromEvent}
      />
    );
  };
  // end const CustomInput 

  return <CustomInput />;
};

export default DzUploadBtn;
