import ReactQuill from "react-quill";
import { useState, useMemo, useRef } from "react";
import 'react-quill/dist/quill.snow.css';
import { storage } from "./Firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

...
...
const quillRef = useRef();

// 이미지 핸들러
const imageHandler = () => {
    // 이미지 업로드 아이콘을 input으로 동적으로 생성
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    // 이미지 파일 클릭시 업로드 수행
    input.addEventListener("change", async () => {
        const file = input.files[0];
        // 이미지 파일을 얻음
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);

        // 파일이 선택되었는지를 확인
        if (file) {
            try {
                // Firebase Storage에 저장될 이미지의 경로를 생성
                const storageRef = ref(storage, `images/${Date.now()}`);
                // uploadBytes 함수를 사용하여 생성된 storageRef에 파일을 업로드
                const snapshot = await uploadBytes(storageRef, file);
                // getDownloadURL 함수를 사용하여 업로드한 파일의 다운로드 URL을 가져오기
                const url = await getDownloadURL(snapshot.ref);
                // ReactQuill 에디터의 현재 선택된 위치에 이미지 삽입
                quill.insertEmbed(range.index, 'image', url);
                // 이미지가 삽입된 다음에 커서의 위치를 조정
                quill.setSelection(range.index + 1);
            } catch (error) {
                console.error("Image upload failed: ", error);
            }
        }
    });
};

// useMemo 를 이용하여 이미지 업로드 전 후에 결과를 기억
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

...
...