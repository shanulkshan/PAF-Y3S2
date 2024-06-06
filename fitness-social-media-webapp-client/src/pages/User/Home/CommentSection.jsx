import React, {useState} from 'react'
import { API_URL, IMAGE_BUCKET_URL } from "../../../lib/consts";

const CommentSection = ({data, postId}) => {
    const [comments, setComments] = useState(data);

    // console.log(postId)

    const handleDeleteComment = async () => {
        console.log("Delete Comment: ", `comments/${postId}/${comments.commentId}`)

        const response = await fetch(`${API_URL}/comments/${postId}/${comments.commentId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            }
          }).then((res) => {
                console.log(res);
                res.json();
          });
    }
    
  return (
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
                onClick={handleDeleteComment}
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
  )
}

export default CommentSection