import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import useStyles from "./postDetailsStyles";
import { CircularProgress, Divider, Grid, Paper, Typography } from "@material-ui/core";
import { getPost, getPostBySearch } from "../../../Redux/actions/posts";

const PostDetails = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { post, posts, isloading } = useSelector((state) => state.posts);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostBySearch({ search: "none", tags: post?.tags.join(",") }));
    }
  }, [post]);

  // if (!post) return "No Post";

  // if (isloading)
  //   return (

  //   );

  const recommendedPosts = posts.filter(({ _id }) => _id !== posts._id);

  const openPost = (_id) => {
    history.push(`/posts/${_id}`);
  };

  return isloading || !post ? (
    <Paper className={classes.loadingPaper} elevation={6}>
      <CircularProgress size={"7em"} />
    </Paper>
  ) : (
    <>
      <Paper className={classes.paper} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">
              {post.title}
            </Typography>
            <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
            <Typography variant="h6">Created by: {post.name}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post.message}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="body1">
              <strong>Realtime Chat - coming soon!</strong>
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="body1">
              <strong>Comments - coming soon!</strong>
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className={classes.imageSection}>
            <img
              className={classes.media}
              src={
                post.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post.title}
            />
          </div>
        </div>
        {/* </Paper>
      <Paper className={classes.paper} elevation={6}> */}
        {!!recommendedPosts.length && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">
              You might also like:
            </Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              <Grid container spacing={3}>
                {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                  <div
                    style={{ margin: "20px", cursor: "pointer", width: "210x" }}
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Grid item xs={12}>
                      <Typography className={classes.text} gutterBottom variant="h6">
                        {title}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        {name}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        {message}
                      </Typography>
                      <Typography gutterBottom variant="subtitle1">
                        Likes: {likes.length}
                      </Typography>
                      <img src={selectedFile} height="200px" width="300px" alt={title} />
                    </Grid>
                  </div>
                ))}
              </Grid>
            </div>
          </div>
        )}
      </Paper>
    </>
  );
};

export default PostDetails;
