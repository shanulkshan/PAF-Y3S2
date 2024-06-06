import React, { useEffect, useState } from "react";
import { API_URL } from "../../../lib/consts";
import ImageCarousel from "./ImageCarousel";
import CommentSection from "./CommentSection";

const SocialMediaLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [commentValue, setCommentValue] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    const response = await fetch(`${API_URL}/posts`);
    const data = await response.json();
    setPosts(data);
    setIsLoading(false);

    console.log(data);
  };

  const handleDeleteComment = async (commentId, postId) => {
    console.log("Delete Comment: ", `comments/${postId}/${commentId}`)

    const response = await fetch(`${API_URL}/comments/${postId}/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => {
            // console.log(res);
            fetchJobs();
            return res.json();
      });

      console.log(response)
}

const handleDeletePost = async (postId) => {
  console.log("Delete Comment: ", `posts/${postId}`)

  const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
          // console.log(res);
          fetchJobs();
          return res.json();
    });

    console.log(response)
}

const handleSubmitComment = async (postId) => {
  console.log("Comment: ", `comments/${postId}`)
  console.log(commentValue)

  const response = await fetch(`${API_URL}/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: commentValue,
        userId: "6638ce8932ee4f2fc0a34b2d",
      }),
    }).then((res) => {
          // console.log(res);
          fetchJobs();
          return res.json();
    });

    console.log(response)
}


  return (
    <>
      <div className=" text-gray-700 pt-20 max-w-xl ">
        <section>
        
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg p-5 mb-5">
              <div className="mb-4">
                <div className="flex flex-row items-center text-center gap-2">
                  <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500">
                    <div className="h-10 w-10 rounded-full bg-white wrapper overflow-hidden border-2 border-black">
                      <img
                        className="w-full h-full object-contain"
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  
                  <p className=" text-sm font-semibold pb-2 pt-1">
                    {post.username}
                  </p>
                  <div className="flex-grow flex justify-end">
                  <button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4"
                                className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                                type="button"
                                onClick={()=>handleDeletePost(post.id)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                                  <defs><linearGradient x1="18.405" y1="10.91" x2="33.814" y2="43.484" gradientUnits="userSpaceOnUse" id="color-1_pre7LivdxKxJ_gr1"><stop offset="0" stopColor="#f98686"></stop><stop offset="1" stopColor="#d41d1d"></stop></linearGradient></defs><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal"}}><g transform="scale(5.33333,5.33333)"><path d="M39,10l-2.835,31.181c-0.093,1.03 -0.957,1.819 -1.991,1.819h-20.348c-1.034,0 -1.898,-0.789 -1.992,-1.819l-2.834,-31.181z" fill="url(#color-1_pre7LivdxKxJ_gr1)"></path><path d="M32,7c0,-1.105 -0.895,-2 -2,-2h-12c-1.105,0 -2,0.895 -2,2c0,0 0,0.634 0,1h16c0,-0.366 0,-1 0,-1z" fill="#d00101"></path><path d="M7,9.886v0c0,-0.523 0.358,-0.974 0.868,-1.086c2.305,-0.507 8.895,-1.8 16.132,-1.8c7.237,0 13.827,1.293 16.132,1.8c0.51,0.112 0.868,0.563 0.868,1.086v0c0,0.615 -0.499,1.114 -1.114,1.114h-31.772c-0.615,0 -1.114,-0.499 -1.114,-1.114z" fill="#de0000"></path></g></g>
                                  </svg>
                            </button>
                  </div>
                </div>
                <div></div>
              </div>
              <div>
                <div>
                  {/* <img
                    className="w-[100%] rounded"
                    // src="https://picsum.photos/600/400/?random"
                    src="/images/tom-clancy-ghost-recon.jpeg"
                    alt=""
                  /> */}
                <ImageCarousel data={post.postImages}/>
                </div>
              </div>
              <div>
                <div className="pt-3 pb-2">
                  <ul className=" text-2xl flex space-x-8">
                    <li>
                      <i className="fa-regular fa-heart cursor-pointer hover:text-gray-300"></i>
                    </li>
                    <li>
                      <i className="fa-regular fa-comments cursor-pointer hover:text-gray-300"></i>
                    </li>
                    <li>
                      <i className="fa-regular fa-paper-plane cursor-pointer hover:text-gray-300"></i>
                    </li>
                    <li>
                      <i className="fa-regular fa-bookmark  cursor-pointer hover:text-gray-300"></i>
                    </li>
                  </ul>
                </div>
              </div>
              <div className=" pb-2 space-y-1 text-sm">
                <div>
                  <div className="flex font-semibold  cursor-pointer gap-3">
                    {/* Like icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>

                    {/* Comment icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                      />
                    </svg>

                    {/* Share icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-semibold  cursor-pointer">37 likes</p>
                </div>
                <div>
                  <div className=" cursor-pointer">
                    {" "}
                    <span className=" font-bold">Shan Jathurshan</span> &nbsp;
                    {post.content}
                  </div>
                </div>
                <div>
                {
                  post.comments.map((comments, index) => (
                    <span key={index} className="text-blue-500 cursor-pointer">
                      {/* <CommentSection data={comment} postId={post.id}/> */}

                      <article className="p-1 text-normal bg-white border-t border-gray-200 hover:bg-blue-50 ">
                        <footer className="flex justify-between items-center mb-1">
                            <div className="flex items-center">
                                <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                {comments.userId}
                                </p>
                                <p className=" text-xs text-gray-600 ">
                                        {/* {new Date(comments.createdAt).toLocaleDateString("en-GB")} */}
                                        {`${comments.createdAt[2]}/${comments.createdAt[1]}/${comments.createdAt[0]}`}
                                </p>
                                
                            </div>
                            <button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4"
                                className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                                type="button"
                                onClick={()=>handleDeleteComment(comments.commentId, post.id)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                                  <defs><linearGradient x1="18.405" y1="10.91" x2="33.814" y2="43.484" gradientUnits="userSpaceOnUse" id="color-1_pre7LivdxKxJ_gr1"><stop offset="0" stopColor="#f98686"></stop><stop offset="1" stopColor="#d41d1d"></stop></linearGradient></defs><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal"}}><g transform="scale(5.33333,5.33333)"><path d="M39,10l-2.835,31.181c-0.093,1.03 -0.957,1.819 -1.991,1.819h-20.348c-1.034,0 -1.898,-0.789 -1.992,-1.819l-2.834,-31.181z" fill="url(#color-1_pre7LivdxKxJ_gr1)"></path><path d="M32,7c0,-1.105 -0.895,-2 -2,-2h-12c-1.105,0 -2,0.895 -2,2c0,0 0,0.634 0,1h16c0,-0.366 0,-1 0,-1z" fill="#d00101"></path><path d="M7,9.886v0c0,-0.523 0.358,-0.974 0.868,-1.086c2.305,-0.507 8.895,-1.8 16.132,-1.8c7.237,0 13.827,1.293 16.132,1.8c0.51,0.112 0.868,0.563 0.868,1.086v0c0,0.615 -0.499,1.114 -1.114,1.114h-31.772c-0.615,0 -1.114,-0.499 -1.114,-1.114z" fill="#de0000"></path></g></g>
                                  </svg>
                            </button>
                        </footer>
                        <p className="text-gray-500">
                        {comments.comment}
                        </p>

                    </article>


                    </span>
                  ))
                }
           
                  {/* {
                    post.comments.length > 0 && (
                      <p className="text-gray-500 cursor-pointer">
                        View more {post.comments.length} comments
                      </p>
                    )
                  } */}
                  {/* <CommentSection data={post.comments}/> */}
                </div>
              </div>
              <div className="flex flex-row justify-between py-3 space-x-3">
                <div className=" w-full">
                  <input type="search" 
                  onChange={(e) => setCommentValue(e.target.value)}
                  className="block w-full p-1 ps-3 text-sm text-gray-900 border-gray-300 rounded border-[0px] focus:border-[0px] bg-gray-50 0" 
                  placeholder="write a comment..."
                  required />
                </div>
                <button className="text-blue-400 ml-[264px] font-semibold cursor-pointer"
                onClick={()=>handleSubmitComment(post.id)}
                >
                  Post
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default SocialMediaLayout;
