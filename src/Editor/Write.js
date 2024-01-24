import ReactQuill from "react-quill";
import { useState, useMemo, useRef } from "react";
import 'react-quill/dist/quill.snow.css';
import { storage } from "./Firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

export function Write() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const quillRef = useRef();

    const handleSubmit = () => {
        console.log("제목 : ", title);
        console.log("내용 : ", content);
    }

    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.addEventListener("change", async () => {
            const file = input.files[0];
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection(true);

            if (file) {
                try {
                    const storageRef = ref(storage, `images/${Date.now()}`);
                    const snapshot = await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(snapshot.ref);

                    quill.insertEmbed(range.index, 'image', url);
                    quill.setSelection(range.index + 1);
                } catch (error) {
                    console.error("Image upload failed: ", error);
                }
            }
        });
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] },
                        "bold", "italic", "underline", "strike", "blockquote",
                        { list: "ordered" }, { list: "bullet" },
                        "link", "image", "color", "background",
                        { align: ["right", "center", "justify"] },
                        { size: [] }, { font: [] }],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        };
    }, []);

    return (
        <div className="Editor-write">
            <div className="write-input">
                <input
                    className="write-input-title"
                    type="text"
                    placeholder="제목"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="write-editor">
                <ReactQuill
                    ref={quillRef}
                    style={{ width: '50%', height: '600px', borderRadius: '5px' }}
                    theme="snow"
                    value={content}
                    modules={modules}
                    onChange={setContent}
                />
            </div>
            <div className="write-submit">
                <button className="submit-button" onClick={handleSubmit}>
                    제 출
                </button>
            </div>
        </div>
    );
}
