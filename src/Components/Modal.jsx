import React, { useState } from "react";
import "../Styles/Modal.scss";

const Modal = ({ setViewModal }) => {
    const [inputValue, setInputValue] = useState("");
    const [outputValue, setOutputValue] = useState("");
    const [viewCopyIcon, setViewCopyIcon] = useState(true);
    const [generating, setGenerating] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = async () => {
        if (inputValue.trim() === "") {
            return;
        }
        setGenerating(true);
        try {
            const res = await fetch(`http://localhost:8082/blogapi/aiHelper/generate-blog?blogTitle=${inputValue}`);

            const jsonData = await res.json();
            const usefulData = jsonData.blogContent.trim().split("\n");
            // const structuredBlogData = usefulData.replaceAll("\n","<br>");
            setOutputValue(usefulData);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setGenerating(false);
        }
    };

    const handleCopy = () => {
        if (outputValue === "") {
            return;
        }
        navigator.clipboard.writeText(outputValue);
        setViewCopyIcon(false);
        setTimeout(() => {
            setViewCopyIcon(true);
        }, 2000)
    }

    return (
        <>
            <div className="modalCover"></div>
            <div className="modalContainer">
                <i className="fa-solid fa-xmark closeIcon" onClick={() => setViewModal(false)}></i>
                <div className="modalWrapper">
                    <input type="text" placeholder="Topic of blog" value={inputValue} onChange={handleInputChange} />
                    <button onClick={handleSubmit} disabled={generating ? true : false}>{generating ? <i className='fa-solid fa-spinner fa-spin'></i> : "Generate"}</button>
                    {
                        viewCopyIcon ?
                            <i className="fa-solid fa-copy copyIcon" onClick={handleCopy}></i> :
                            <i class="fa-solid fa-check copyIcon"></i>
                    }
                    <div className="output">
                        {
                            outputValue.length > 0 ? outputValue.map(val => {
                                return (
                                    <>
                                        {val}
                                        <br />
                                    </>
                                )
                            }) : ""
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;