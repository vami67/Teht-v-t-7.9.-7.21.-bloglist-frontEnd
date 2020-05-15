import React from 'react'
const Comments = () => {


  const comments = [{id:2,content:"jksdjfdslkfjdslk"}]

  return (<div>
    
    <p>comments</p>
    <ul>
      {comments.map(comment =>
        <li key={comment.id}>
          {comment.content}
        </li>
      )}
    </ul>
  </div>)
}

export default Comments