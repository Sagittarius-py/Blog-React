import Axios from "axios";
import { useHistory } from "react-router-dom";
import getCookieObject from "../getCookieObject";
const cookies = getCookieObject();

const LikePost = (id) => {
  let username = { username: cookies.username };
  Axios.post(`http://localhost:3002/api/like/${id}`, username).then(
    (response) => {
      console.log(response);
    }
  );
};

export default function PostCard(props) {
  let history = useHistory();
  return (
    <div className="mx-auto w-2/4 my-8 overflow-hidden bg-white rounded-lg drop-shadow-2xl h-fit">
      <img
        src={`http://localhost:3002/images/${props.imageLink}`}
        className="object-cover w-full cursor-pointer aspect-video"
        alt=""
        onClick={() => history.push(`/post/${props.id}`)}
      />
      <div className="p-4">
        <p className="mb-1 text-sm text-primary-500">
          <a href={`http://localhost:3000/profile/${props.postCreator}`}>
            {props.postCreator}
          </a>{" "}
          | <time>18 Nov 2022</time>
        </p>
        <h3 className="text-xl font-medium text-gray-900">{props.postTitle}</h3>
        <p className="mt-1 text-gray-500">
          {props.postText.substring(0, 300) + " ..."}
        </p>
        <div className="flex gap-2 mt-4">
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-blue-600 rounded-full bg-blue-50">
            Likes: {props.postLikes}
          </span>
          {cookies.loggedIn ? (
            <span
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-indigo-600 rounded-full cursor-pointer bg-indigo-50"
              onClick={() => LikePost(props.id)}
            >
              Like this post!
            </span>
          ) : null}
        </div>
        <div className="flex gap-2 mt-4"></div>
      </div>
    </div>
  );
}
