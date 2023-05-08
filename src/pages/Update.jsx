import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/");

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("datablog")
      .update({ title, method, rating })
      .eq("id", id);

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields correctly");
    }
    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      const { data, error } = await supabase
        .from("datablog")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        console.log(data);
      }
    };
    fetchBlog();
  }, [id, navigate]);
  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Description:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Update Blog</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Update;
