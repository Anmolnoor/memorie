import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyle from "./paginationStyles";

import { getPosts } from "../Redux/actions/posts";

const Paginate = ({ page }) => {
  const { numberofPages } = useSelector((state) => state.posts);
  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberofPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />}
    />
  );
};

export default Paginate;
