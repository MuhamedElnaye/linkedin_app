import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PostModdle from "./PostModdle";
import ReactPlayer from "react-player";
import { getArticlesAPI } from "../redux/actions";

const Middle = (props) => {
  const [showModel, setShowModel] = useState(false);
  const handelClick = () => {
    setShowModel(!showModel);
  };
  useEffect(() => {
    props.getArticles();
  }, []);
  return (
    <Container>
      <ShareBox>
        <div>
          {props.user && props.user.photoURL ? (
            <img src={props.user.photoURL} alt="" />
          ) : (
            <img src="/images/user.svg" alt="" />
          )}
          <button onClick={handelClick} disabled={props.loading ? true : false}>
            Start A Post
          </button>
        </div>
        <div>
          <button>
            <img src="/images/photo-icon.svg" alt="" />
            <span>Photo</span>
          </button>
          <button>
            <img src="/images/video-icon.svg" alt="" />
            <span>Video</span>
          </button>
          <button>
            <img src="/images/event-icon.svg" alt="" />
            <span>Event</span>
          </button>
          <button>
            <img src="/images/article-icon.svg" alt="" />
            <span>Write Aricle</span>
          </button>
        </div>
      </ShareBox>
      {props.articles.length === 0 ? (
        <p>There Are No Articles</p>
      ) : (
        <Content>
          {props.loading && <img src="images/loader.svg"></img>}
          {props.articles.map((article, index) => (
            <Article key={index}>
              <ShareActor>
                <a>
                  <img src={article.actor.image} alt="" />
                  <div>
                    <span>{article.actor.title}</span>
                    <span>{article.actor.description}</span>
                    <span>
                      {article.actor.date.toDate().toLocaleDateString()}
                    </span>
                  </div>
                </a>
                <button>
                  <img src="/images/ellipsis.svg" alt="" />
                </button>
              </ShareActor>
              <Description>{article.description}</Description>
              <SharedImg>
                <a href="">
                  {!article.shareImage && article.video ? (
                    <ReactPlayer width="100%" url={article.video} />
                  ) : (
                    article.shareImage && <img src={article.shareImage} />
                  )}
                </a>
              </SharedImg>
              <SocialCounts>
                <li>
                  <button>
                    <img
                      src="https://static.licdn.com/sc/h/cpho5fghnpme8epox8rdcds22"
                      alt=""
                    />
                    <img
                      src="https://static.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                      alt=""
                    />
                    <img
                      src="https://static.licdn.com/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
                      alt=""
                    />
                    <span>75</span>
                  </button>
                </li>
                <li>
                  <a href="">
                    {article.comment}{" "}
                    {article.comment > 1 ? "Comments" : "comment"}{" "}
                  </a>
                </li>
                <li>
                  <a href="">2 share</a>
                </li>
              </SocialCounts>
              <SocialActions>
                <button>
                  <img src="/images/like-icon.svg" alt="" />
                  <span>Like</span>
                </button>
                <button>
                  <img src="/images/comment-icon.svg" alt="" />
                  <span>Comment</span>
                </button>
                <button>
                  <img src="/images/share-icon.svg" alt="" />
                  <span>Share</span>
                </button>
                <button>
                  <img src="/images/send-icon.svg" alt="" />
                  <span>Send</span>
                </button>
              </SocialActions>
            </Article>
          ))}
        </Content>
      )}

      <PostModdle showModel={showModel} handelClick={handelClick} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: middle;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 1px rgb(0 0 0 / 20%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s ease;
      border-radius: 5px;
      &:hover {
        background: rgba(0, 0, 0, 0.08);
      }
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 8px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background: white;
        color: rgba(0, 0, 0, 0.7);
        font-weight: 500;
        font-size: 14px;
        &:hover {
          background: rgba(0, 0, 0, 0.08);
        }
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
      button {
        img {
          margin: 0 4px;
        }
        span {
          color: #70b5f9;
          margin-top: 2px;
        }
      }
    }
  }
`;
const Content = styled.div`
  text-align: center;
  & > img {
    width: 70px;
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const ShareActor = styled.div`
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(2),
        &:nth-child(3) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    ouline: none;
  }
`;
const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  diplay: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: center;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      align-items: center;
      border: none;
      background-color: white;
    }
  }
`;
const SocialActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 100%;
  flex-wrap: wrap;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: rgba(0, 0, 0, 0.6);
    border: none;
    background-color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background 0.3s;
    width: calc(100% / 4);
    height: 60px;
    justify-content: center;
    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
        margin-top: 3px;
        font-weight: 600;
      }
    }
  }
`;
const mapStateToProps = (state) => {
  return {
    loading: state.articlesState.loading,
    user: state.userState.user,
    articles: state.articlesState.articles,
  };
};

const mapDispachToProps = (dispatch) => {
  return {
    getArticles: () => dispatch(getArticlesAPI()),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(Middle);
