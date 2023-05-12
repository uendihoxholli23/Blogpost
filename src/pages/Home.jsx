import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import Blogs from "../components/Blogs";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [dataBlog, setDataBlog] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setDataBlog((prevBlog) => {
      //console
      return prevBlog.filter((blog) => blog.id !== id);
    });
  };

  useEffect(() => {
    const fetchDataBlog = async () => {
      const { data, error } = await supabase
        .from("datablog")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setFetchError("Could not fetch the data blog");
        setDataBlog(null);
        console.log(error);
      }
      if (data) {
        setDataBlog(data);
        setFetchError(null);
      }
    };
    fetchDataBlog();
  }, [orderBy]);

  return (
    <div className="page">
      {fetchError && <p>{fetchError}</p>}
      {dataBlog && (
        <div className="blogs">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("rating")}>Rating</button>
          </div>
          <div className="blog-grid">
            {dataBlog.map((dt) => (
              <Blogs key={dt.id} dt={dt} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
