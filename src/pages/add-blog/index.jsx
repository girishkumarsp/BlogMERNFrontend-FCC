import { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddNewBlog() {
  const { formData, setFormData, isEdit, setIsEdit, BASE_URL } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSaveBlogToDatabase() {
    const response = isEdit
      ? await axios.put(
          `${BASE_URL}/api/blogs/update/${location.state.getCurrentBlogItem._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post(`${BASE_URL}/api/blogs/add`, {
          title: formData.title,
          description: formData.description,
        });

    const result = await response.data;

    if (result) {
      setIsEdit(false);
      setFormData({
        title: "",
        description: "",
      });

      navigate("/");
    }
  }

  useEffect(() => {
    if (location.state) {
      setIsEdit(true);
      const { getCurrentBlogItem } = location.state;
      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description,
      });
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit Blog" : "Add Blog"}</h1>
      <div className={classes.formWrapper}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter Blog title"
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
          }}
        />
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Enter Blog descriptions"
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
        />
        <button onClick={handleSaveBlogToDatabase}>
          {isEdit ? "Edit Blog" : "Add Blog"}
        </button>
      </div>
    </div>
  );
}
