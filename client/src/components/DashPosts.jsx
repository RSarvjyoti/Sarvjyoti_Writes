import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import {Link} from 'react-router-dom';
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `/api/post/getposts?userId=${currentUser._id}`
        );
        const data = await res.data;
        setUserPost(data.posts);
        if(data.posts.length < 9) {
          setShowMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try{
      const res = await axios.get(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = res.data;
      setUserPost((prev) => [...prev, ...data.posts])
      if(data.posts.length < 9) {
        setShowMore(false);
      }
    }catch(error) {
      console.log(error);
    }
  }

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`);
      if (res.status === 200) {
        setUserPost((prev) =>
          prev.filter(({_id}) => _id !== postIdToDelete)
        );
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {userPosts.map(({ _id, updatedAt, category, title, image, slug, userId}) => (
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' key={_id}>
                  <Table.Cell>
                    {new Date(updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${slug}`}>
                    <img src={image} alt={title} className="w-20 h-10 object-cover bg-gray-500"/>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${slug}`}>{title}</Link>
                  </Table.Cell>
                  <Table.Cell>{category}</Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(_id);
                      }} className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                  </Table.Cell>
                  <Table.Cell >
                    <Link  className='text-teal-500 hover:underline' to={`/update-post/${_id}`}><span>Edit</span></Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">Show more</button>
            )
          }
        </>
      ) : (
        <p>You have no posts yet!</p>
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
              Are you sure you want to delete your this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
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

export default DashPosts;