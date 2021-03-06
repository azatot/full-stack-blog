import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useRouter} from "next/router";
import Link from 'next/link';
import {getOnePostTC} from "../../store/reducers/posts-reducer";
import Preloader from "../../components/common/Preloader/Preloader";
import {Button} from "antd";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import {timeStampPrettier} from '../../components/common/helpers/helpers';
import s from "../../components/Posts/FullPost/FullPost.module.scss";


const FullPost = props => {
  const {isFetching, getOnePostTC} = props;
  const router = useRouter();
  const {query: {postName}} = router;

  useEffect(() => {
    postName && getOnePostTC(postName)
  }, [getOnePostTC, postName]);

  return isFetching
      ? <Preloader/>
      : props.post.map(post => <RenderPost postName={postName} {...post} key={post.id}/>)
};
const RenderPost = (post) => {

  timeStampPrettier(post.createdAt)
  return (
      <div className={s.post}>
        <div className={s.post_top}>
          <h2 className={s.post_top_title}>
            {post.title}
          </h2>
        </div>
        <div className={s.post_bottom}>
          <div className={s.post_bottom_author}>

            {post.author
                ? <div>Author: <Link href={`/users/${post.author.login}`}>
                  <a>{post.author.login || 'Hacker'}</a>
                </Link></div>
                : null
            }

          </div>
          <div>
            Created: <Moment date={post.createdAt}/>
          </div>

        </div>
        <div className={s.post_body}>
          <ReactMarkdown source={post.body}/>
        </div>
        <div className={s.post_bottom_comments}>
          <Link href={`/post/${post.postName}/comments`}>
            <Button>Comments</Button>
          </Link>
        </div>
      </div>
  )
}
const mapStateToProps = (state) => ({
  post: state.postsPage.postsStore,
  isFetching: state.common.isFetching
});
const mapDispatchToProps = {
  getOnePostTC
};
export default connect(mapStateToProps, mapDispatchToProps)(FullPost);
