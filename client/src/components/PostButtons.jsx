import React from 'react';
import Button from './Button';

const PostButtons = ({ fetchPosts, setPosts, allPosts, userId }) => {

    const buttons = [
        {
            function: () => setPosts(allPosts.slice().sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))),
            value: 'Alphabetical-title'
        },
        {
          function: () => setPosts(allPosts.slice().sort((itemA, itemB) => itemA.body.localeCompare(itemB.body))),
          value: 'Alphabetical-body'
      },
        {
            function: () => setPosts(allPosts.slice().sort(() => Math.random() - 0.5)),
            value: 'Randomly'
        },
        {
            function: () => fetchPosts(`http://localhost:4000/posts/${userId}`),
            value: 'Show All'
        }
    ]

    return (
        <div>
            {buttons.map((btn, index) => (
                <Button
                    key={index}
                    handler={btn.function}
                    value={btn.value}
                />
            ))}
        </div>
    )
}

export default PostButtons;