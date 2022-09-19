import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import PaginationNum from "./PaginationNum";
import PaginationButtons from "./PaginationButtons";
import axios from "axios";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // pagination using a numbered list
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // pagination using navigation buttons
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <div class="container max-w-screen-lg mx-auto px-4 my-4">
      <Posts posts={currentPosts} />
      <PaginationNum
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <PaginationButtons
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
