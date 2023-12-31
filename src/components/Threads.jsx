/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import Modal from '@mui/material/Modal';
import SVG from 'react-inlinesvg';
import _ from 'lodash';

import Card from './ui/Card';
import UserActionBar from './ui/UserActionBar';
import Button from './ui/Button';
import TextInput from './ui/TextInput';
import chevronLeft from '../assets/chevron_left.svg';
import crossIcon from '../assets/cross.svg';

import { createThread, getThreadsFromSub, voteThread } from '../api/threads';

import '../styles/components/threads.scss';

export default function Threads({ currentSub }) {
  const user = useSelector((state) => state.userReducer);
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const [textInputs, setTextInputs] = useState({ textarea: '', classicText: '' });
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const voted = { down: 'down', up: 'up', no: 'no' };

  function replaceObject(id, newObject, list) {
    function findAndReplace(obj) {
      if (obj.id === id) {
        return newObject;
      }
      if (obj.children) {
        // eslint-disable-next-line no-param-reassign
        obj.children = obj.children.map(findAndReplace);
      }
      return obj;
    }
    return list.map(findAndReplace);
  }

  const voteForThread = async (thread, vote, cancel) => (new Promise((resolve, reject) => {
    voteThread(thread.id, { user_id: user.id, vote, cancel })
      .then((res) => {
        let newScore;
        if ((cancel && vote === voted.up) || (!cancel && vote === voted.down)) {
          newScore = thread.score - 1;
        } else {
          newScore = thread.score + 1;
        }
        const newThread = { ...thread, voted: cancel ? voted.no : vote, score: newScore };
        const trueThreadsCopy = _.cloneDeep(threads);
        const newThreadList = replaceObject(thread.id, newThread, trueThreadsCopy);

        if (currentThread) {
          const updatedCurrentThread = newThreadList.find((th) => th.id === currentThread.id);
          setCurrentThread(updatedCurrentThread);
        }
        setThreads(newThreadList);
        resolve(res);
      })
      .catch((err) => { reject(err); toast.error(err.message); });
  }));

  const replytToThread = async (thread, payload) => (new Promise((resolve, reject) => {
    createThread(payload)
      .then((resId) => {
        const newThread = { ...thread };
        const newThreadsList = threads;

        if (newThread.children && newThread.children.length >= 0) {
          newThread.children.push({
            ...payload, id: resId, score: 0, voted: 'no',
          });
        } else {
          newThread.children = [{
            ...payload, id: resId, score: 0, voted: 'no',
          }];
        }
        replaceObject(thread.id, newThread, newThreadsList);
        setCurrentThread({ ...currentThread, childrenCount: currentThread.childrenCount + 1 });
        threads.find((th) => th.id === currentThread.id).childrenCount += 1;
        resolve();
      })
      .catch((err) => { reject(err); toast.error(err.message); });
  }));

  const createNewThread = (payload) => (new Promise((resolve, reject) => {
    createThread(payload)
      .then((resId) => {
        const newThread = {
          ...payload, id: resId, score: 0, voted: 'no', children: [],
        };
        setThreads([...threads, newThread]);
        resolve();
      })
      .catch((err) => { reject(err); toast.error(err.message); });
  }));

  const extractData = (data) => {
    const everyThread = Object.entries(data).map(([key, value]) => {
      if (!value.children && !value.voted) {
        return ({
          ...value, children: [], voted: null, id: key,
        });
      }
      if (!value.children) {
        return ({ ...value, children: [], id: key });
      }
      if (!value.voted) {
        return ({ ...value, voted: null, id: key });
      }
      return ({ ...value, id: key });
    });
    return everyThread;
  };

  // todo sort data by date
  function formatData(data) {
    function findChildren(d) {
      return data.filter((x) => x.parent_id === d.id);
    }

    function assignChildren(node) {
      const children = findChildren(node);
      if (children.length) {
        // eslint-disable-next-line no-param-reassign
        node.children = children;
        children.forEach((child) => assignChildren(child));
      }
    }

    function countChildren(node) {
      if (!node.children) return 0;
      return node.children.reduce((acc, child) => acc + countChildren(child) + 1, 0);
    }

    const roots = data.filter((d) => !d.parent_id);
    roots.forEach((root) => {
      assignChildren(root);
      // eslint-disable-next-line no-param-reassign
      root.childrenCount = countChildren(root);
    });
    return roots;
  }

  const renderChildren = (children, nestingLevel) => {
    if (!children || children?.length === 0) {
      return null;
    }
    return (
      <div className="children-container">
        {nestingLevel ? <div className="nesting-line" /> : null}
        <div className="children-cards">
          {children.map((child) => (
            <div key={`child-thread-${child.created_at}-${child.message}`}>
              <Card
                // width={`calc(100% - ${nestingLevel * 17}px)`}
                hasDropdown
                alwaysOpen
                title={(
                  <div className="thread-title">
                    <span className="username">{`${child.username || 'unknown_user'}`}</span>
                  </div>
                )}
                dropdownContent={(
                  <div className="thread-comment-content">
                    <div className="message">{child.message}</div>
                    <UserActionBar
                      score={child.score}
                      hasVoteBtn
                      hasReply
                      replyAction={() => {
                        setReplyingTo(child);
                        setIsReplyModalOpen(true);
                      }}
                      noCommentsCount
                      onVoteUp={() => voteForThread(child, voted.up, child.voted !== voted.no)}
                      onVoteDown={() => voteForThread(child, voted.down, child.voted !== voted.no)}
                      votedDown={child.voted === voted.down}
                      votedUp={child.voted === voted.up}
                    />
                  </div>
                )}
              />
              {renderChildren(child.children, nestingLevel + 1)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const replyModal = () => (
    <Modal
      className="thread-reply-modal"
      open={isReplyModalOpen}
      onClose={() => setIsReplyModalOpen(false)}
    >
      <div className="thread-reply-modal-container">
        <div className="thread-reply-modal-header">
          {
          !replyingTo?.create
            ? `${t('subsAchievements.threadReplyModal.replyTo')} ${replyingTo?.username}`
            : `${t('subsAchievements.createThread')}`
          }
        </div>
        <div className={`thread-reply-modal-content${replyingTo?.create ? ' create-thread' : ''}`}>
          {
          replyingTo?.create
            ? (
              <TextInput
                customClass="classic-text"
                placeholder={t('subsAchievements.threadReplyModal.title')}
                value={textInputs.classicText}
                onChange={(e) => setTextInputs({ ...textInputs, classicText: e.target.value })}
              />
            )
            : null
          }
          <TextInput
            type="textarea"
            customClass="message-textarea"
            placeholder={t('subsAchievements.threadReplyModal.message')}
            value={textInputs.textarea}
            onChange={(e) => setTextInputs({ ...textInputs, textarea: e.target.value })}
          />
        </div>
        <div className="thread-reply-modal-footer">
          <Button
            primary
            empty
            content={!replyingTo?.create ? t('subsAchievements.threadReplyModal.send') : t('subsAchievements.threadReplyModal.create')}
            clickAction={() => {
              if (!replyingTo?.create) {
                replytToThread(replyingTo, {
                  parent_id: replyingTo.id,
                  subcat_id: replyingTo.subcat_id,
                  username: user.username,
                  user_id: user.id,
                  message: textInputs.textarea,
                  children: [],
                  voted: null,
                }).then(() => {
                  setIsReplyModalOpen(false);
                  setTextInputs({ ...textInputs, textarea: '' });
                });
              } else {
                createNewThread({
                  subcat_id: replyingTo.subcat_id,
                  username: user.username,
                  user_id: user.id,
                  message: textInputs.textarea,
                  title: textInputs.classicText,
                  children: [],
                  voted: null,
                }).then(() => {
                  setIsReplyModalOpen(false);
                  setTextInputs({ classicText: '', textarea: '' });
                });
              }
            }}
          />
        </div>
      </div>
    </Modal>
  );

  useEffect(() => {
    getThreadsFromSub(currentSub.id, user.id)
      .then((res) => {
        const extractedData = extractData(res);
        const formattedThreads = formatData(extractedData);
        setThreads(formattedThreads);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  return (
    <>
      {replyModal()}
      {
    !currentThread ? (
      <div className="threads-achievements-container">
        <Button
          customClass="all-threads-btn create-thread-btn"
          primary
          empty
          content={(
            <div className="all-threads-btn-content">
              <SVG src={crossIcon} />
              {t('subsAchievements.createThread')}
            </div>
          )}
          clickAction={() => {
            setReplyingTo({
              subcat_id: currentSub.id,
              create: true,
            });
            setIsReplyModalOpen(true);
          }}
        />
        {threads.map((thread) => (
          <Card
            key={`thread-${thread.created_at}-${thread.message}`}
            hasDropdown
            alwaysOpen
            customClass="thread-card"
            title={(
              <div className="thread-title">
                <span className="big-title">{thread.title}</span>
                <span className="username">{`${thread.username || 'unknown_user'}`}</span>
              </div>
            )}
            onClick={() => setCurrentThread(thread)}
            dropdownContent={(
              <UserActionBar
                score={thread.score}
                commentsCount={thread.childrenCount}
                hasVoteBtn
                onVoteUp={() => voteForThread(thread, voted.up, thread.voted !== voted.no)}
                onVoteDown={() => voteForThread(thread, voted.down, thread.voted !== voted.no)}
                votedDown={thread.voted === voted.down}
                votedUp={thread.voted === voted.up}
              />
            )}
          />
        ))}
      </div>
    ) : (
      <div className="threads-details-container">
        <Button
          customClass="all-threads-btn"
          primary
          empty
          content={(
            <div className="all-threads-btn-content">
              <SVG src={chevronLeft} />
              {t('subsAchievements.allThreads')}
            </div>
          )}
          clickAction={() => setCurrentThread(null)}
        />
        <Card
          hasDropdown
          alwaysOpen
          customClass="thread-card"
          title={(
            <div className="thread-title">
              <span className="big-title">{currentThread.title}</span>
              <span className="username">{`${currentThread.username || 'unknown_user'}`}</span>
            </div>
          )}
          dropdownContent={(
            <div className="thread-comment-content">
              <div className="message">{`${currentThread.message}`}</div>
              <UserActionBar
                score={currentThread.score}
                commentsCount={currentThread.childrenCount}
                hasVoteBtn
                hasReply
                replyAction={() => {
                  setReplyingTo(currentThread);
                  setIsReplyModalOpen(true);
                }}
                onVoteUp={
                  () => voteForThread(currentThread, voted.up, currentThread.voted !== voted.no)
                }
                onVoteDown={
                  () => voteForThread(currentThread, voted.down, currentThread.voted !== voted.no)
                }
                votedDown={currentThread.voted === voted.down}
                votedUp={currentThread.voted === voted.up}
              />
            </div>
          )}
        />
        {currentThread.children ? renderChildren(currentThread.children, 0) : null}
      </div>
    )
    }
    </>
  );
}
Threads.propTypes = {
  currentSub: PropTypes.shape({}).isRequired,
};
