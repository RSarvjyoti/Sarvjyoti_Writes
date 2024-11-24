import { Alert, Button, TextInput, Modal } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

// import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
// import {app} from '../firebase';
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  // const [imageUploadingProgrees, setImageUploadingProgrees] = useState(null);
  // const [imageUploadedError, setImageUploadedError] = useState(null);
  // console.log(imageUploadingProgrees, imageUploadedError);

  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  // const uploadImage = async () => {
  //   const storage = getStorage(app);
  //   const fileName = new Date().getTime() + imageFile.name;
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, imageFile);

  //   uploadTask.on(
  //     'state_changed',
  //     (snapshot) => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setImageUploadingProgrees(progress.toFixed(0));
  //     },
  //     (error) => {
  //       setImageUploadedError("Could not upload image (file must be less than 2MB)");
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setImageFileUrl(downloadURL);
  //       });
  //     }
  //   );
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await axios.put(
        `/api/user/update/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(updateSuccess(res.data));
      setUpdateUserSuccess("User's profile updated successfully");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(updateFailure(errorMessage));
      setUpdateUserError(errorMessage);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`);
      dispatch(deleteUserSuccess(res.data));
    } catch (error) {
      dispatch(
        deleteUserFailure(error.response?.data?.message || error.message)
      );
    }
  };

  const handleSignout = async () => {
    try {
      const res = await axios.post("/api/user/signout");
      dispatch(signoutSuccess());
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 object-cover border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading}>
          {loading ? 'Loading...' : 'Update'}
        </Button>
        {currentUser.isAdmin && (
          <Link to="/create-post">
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              outline
              className="w-full"
            >
              Create Post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}

      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}

      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile;
