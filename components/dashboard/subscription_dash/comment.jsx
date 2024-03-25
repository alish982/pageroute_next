import { instanceOfAxios } from "@/components/others/localstorage";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";

function Comment({ id }) {
  const [comments, setComments] = useState([]);
  const [initialValues, setInitialValues] = useState({
    body: "",
    subscription_id: id,
  });

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: async (values) => {
      let data = await instanceOfAxios.post("subscription_comments", values);
      if (data.status === 200) {
        formik.setFieldValue("body", "");
        getComments();
      }
    },
  });

  const getComments = () => {
    instanceOfAxios.get(`subscription_comments/${id}`).then((response) => {
      setComments(response.data.data);
    });
  };

  useEffect(() => {
    getComments();
  }, [id]);

  const handleDeleteComment = async (commentId) => {
    await instanceOfAxios.delete(`subscription_comments/${commentId}`);
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  return (
    <div className="p-4">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <textarea
            className="border rounded h-[100px] w-[500px] p-4"
            placeholder="write a comment here"
            type="text"
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
          />
        </div>
        <button className="bg-blue-300 py-3 px-6 rounded" type="submit">
          Save
        </button>
      </form>
      {comments.map((val) => (
        <div key={val.id} className="mt-10 mx-4 ">
          <div className="flex ">
            <div>
              <Image
                src="/profileimage.svg"
                alt=""
                height="30"
                width="30"
                className="pt-3"
              />
            </div>
            <div className="px-10 w-[450px]">
              <p className="my-2 font-bold ">{val.user.name}</p>
              <p className="my-2 opacity-[0.7]">{val.body}</p>
              <p className="my-2 text-[11px] opacity-[0.4]">{val.created_at}</p>
            </div>
            <button
              className="text-2xl hover:text-red-500 hover:text-3xl"
              onClick={() => handleDeleteComment(val.id)}
            >
              x
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comment;
