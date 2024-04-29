import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending, BASE_URL } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get(`${BASE_URL}/api/blogs`);
    const result = await response.data;

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }

  async function handleDeleteBlog(getCurrentId) {
    const response = await axios.delete(
      `${BASE_URL}/api/blogs/delete/${getCurrentId}`
    );
    const result = await response.data;

    if (result?.message) {
      fetchListOfBlogs();
    }
  }

  function handleEditBlog(getCurrentBlogItem) {
    navigate("/add-blog", { state: { getCurrentBlogItem } });
  }

  useEffect(() => {
    fetchListOfBlogs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1>blog list</h1>
      {pending ? (
        <h1>Loading Blogs...</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div key={blogItem._id}>
                <p>Title:{blogItem.title}</p>
                <p>Description:{blogItem.description}</p>
                <FaEdit size={30} onClick={() => handleEditBlog(blogItem)} />
                <FaTrash
                  onClick={() => handleDeleteBlog(blogItem._id)}
                  size={30}
                />
              </div>
            ))
          ) : (
            <h1>No Blogs Added</h1>
          )}
        </div>
      )}
    </div>
  );
}
