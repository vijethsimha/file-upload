import React from "react";
import ProgressLine from "./ProgressBar";
import "./App.css";

function App() {
    const [fileNames, setFileNames] = React.useState<File[]>([]);
    const [showProgressBar, setShowProgressBar] =
        React.useState<boolean>(false);

    const handleFileUpload = ({
        currentTarget: { files },
    }: React.FormEvent<HTMLInputElement>) => {
        setShowProgressBar(true);
        setTimeout(() => {
            if (files && files.length) {
                setFileNames((existing) => [...existing, ...files]);
                setShowProgressBar(false);
            }
        }, 3000);
    };

    const removeFile = (fileName: { name: string }) => {
        let updatedFile = [...fileNames];
        updatedFile = updatedFile.filter((file) => file.name !== fileName.name);
        setFileNames(updatedFile);
    };
    return (
        <React.Fragment>
            <div className='d-flex flex-direction-column'>
                <label htmlFor='file-upload' className='upload-label'>
                    Click here to choose file
                </label>
                <input
                    id='file-upload'
                    type='file'
                    multiple
                    onChange={handleFileUpload}
                />
                <div className='filename-container '>
                    {fileNames.map((fileName) => (
                        <div key={fileName.name} className='d-flex mt-1'>
                            <p>{fileName?.name}</p>
                            <p
                                className='close-icon'
                                onClick={() => removeFile(fileName)}
                            >
                                X
                            </p>
                        </div>
                    ))}
                </div>
                {showProgressBar && (
                    <ProgressLine
                        label=''
                        backgroundColor='#ccc'
                        visualParts={[
                            {
                                percentage: "100%",
                                color: "tan",
                            },
                        ]}
                    />
                )}

                <button className='mt-1'>Upload files</button>
            </div>
        </React.Fragment>
    );
}

export default App;
