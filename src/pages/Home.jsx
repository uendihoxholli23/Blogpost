import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import Blogs from "../components/Blogs";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [dataBlog, setDataBlog] = useState(null);

  useEffect(() => {
    const fetchDataBlog = async () => {
      const { data, error } = await supabase.from("datablog").select();

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
  }, []);
  return (
    <div className="page">
      {fetchError && <p>{fetchError}</p>}
      {dataBlog && (
        <div className="blogs">
          <div className="blog-grid">
            {dataBlog.map((dt) => (
              <Blogs key={dt.id} dt={dt} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
