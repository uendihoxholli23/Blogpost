import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import supabase from "../config/supabaseClient";

const Blogs = ({ dt, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("datablog")
      .delete()
      .eq("id", dt.id);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      onDelete(dt.id);
    }
  };
  return (
    <>
      <div className="blog-card">
        <h3>{dt.title}</h3>
        <p>{dt.method}</p>
        <div className="rating">{dt.rating}</div>
        <div className="buttons">
          <Link to={"/" + dt.id}>
            <span>
              <MdEdit />
            </span>
          </Link>
          <span onClick={handleDelete}>
            <MdDelete />
          </span>
        </div>
      </div>
    </>
  );
};
export default Blogs;
