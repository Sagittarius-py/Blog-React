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
    <div className="mx-auto h-fit my-2  overflow-hidden rounded-lg bg-white shadow">
      <img
        src={`http://localhost:3002/images/${props.imageLink}`}
        class="aspect-video w-full object-cover cursor-pointer"
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
        <div className="mt-4 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            Likes: {props.postLikes}
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 cursor-pointer"
            onClick={() => LikePost(props.id)}
          >
            Like this post!
          </span>
        </div>
      </div>
    </div>
  );
}
