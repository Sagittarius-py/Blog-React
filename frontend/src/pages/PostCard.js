import Axios from "axios";
import { useHistory } from "react-router-dom";

let refreshPage = () => {
  window.location.reload(false);
};
const LikePost = (id) => {
  Axios.post(`http://localhost:3002/api/like/${id}`).then((response) => {
    alert("you liked a post");
  });
  refreshPage();
};

export default function PostCard(props) {
  let history = useHistory();
  return (
    <div className="mx-auto my-2 overflow-hidden bg-white rounded-lg shadow h-fit">
      <img
        src={`http://localhost:3002/images/${props.imageLink}`}
        className="aspect-video w-full object-cover cursor-pointer"
        alt=""
        onClick={() => history.push(`/post/${props.id}`)}
      />
      <div className="p-4">
        <p className="mb-1 text-sm text-primary-500">
          {props.postCreator} | <time>18 Nov 2022</time>
        </p>
        <h3 className="text-xl font-medium text-gray-900">{props.postTitle}</h3>
        <p className="mt-1 text-gray-500">
          {props.postText.substring(0, 300) + " ..."}
        </p>
        <div className="flex gap-2 mt-4">
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-blue-600 rounded-full bg-blue-50">
            Likes: {props.postLikes}
          </span>
          <span
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-indigo-600 rounded-full cursor-pointer bg-indigo-50"
            onClick={() => LikePost(props.id)}
          >
            Like this post!
          </span>
        </div>
        <div className="flex gap-2 mt-4"></div>
      </div>
    </div>
  );
}
