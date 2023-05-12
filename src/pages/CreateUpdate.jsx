import { useLocation, useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBlogValidationSchema } from "./utils";

const CreateUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const { state } = location;
  const createMode = !id; // when we dont have id we are in create mode otherwise edit mode
  console.log({ state });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: state?.title || "",
      description: state?.method || "",
      rating: state?.rating || 3,
    },
    resolver: yupResolver(createBlogValidationSchema),
  });

  const onSubmit = async (values) => {
    console.log("validation passed, so submit the values.");
    const { title, description, rating } = values; // get values from the form

    if (createMode) {
      // add the values to supabase
      const { error } = await supabase
        .from("datablog")
        .insert([{ title, method: description, rating }]);

      // error from supabase
      if (error) {
        console.log(error);
        return;
      }
    } else {
      // edit the blog
      const { error } = await supabase
        .from("datablog")
        .update({ title, method: description, rating })
        .eq("id", id);

      if (error) {
        console.log(error);
        return;
      }
    }

    // success from supabase
    navigate("/");
  };

  console.log({ errors });
  return (
    <div className="page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title:</label>
        <input type="text" {...register("title")} />
        <p>{errors.title?.message}</p>

        <label>Description:</label>
        <textarea {...register("description")} />
        <p>{errors.description?.message}</p>

        <label>Rating:</label>
        <input type="number" {...register("rating")} />
        <p>{errors.rating?.message}</p>

        <button>{createMode ? "Create blog" : "Update blog"}</button>
      </form>
    </div>
  );
};

export default CreateUpdate;
