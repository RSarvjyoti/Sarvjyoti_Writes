import React, { useState, useRef } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

// Register any custom modules/plugins for Quill here if needed
Quill.register("modules/customModule", {});

const CreatePost = () => {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const quillRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = quillRef.current?.getEditor().root.innerHTML;
      const postData = { ...formData, content };

      const res = await axios.post("/api/post/create", postData);

      setPublishError(null);
      navigate(`/post/${res.data.slug}`);
    } catch (error) {
      setPublishError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen ">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="Javascript">Javascript</option>
            <option value="Java">Java</option>
            <option value="DSA">DSA</option>
            <option value="System Design">System Design</option>
            <option value="Experiences">Self-Experiences</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Upload Image
          </Button>
        </div>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
            ],
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink" size="lg">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
