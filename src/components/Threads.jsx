import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import SVG from 'react-inlinesvg';

import Card from './ui/Card';
import UserActionBar from './ui/UserActionBar';
import Button from './ui/Button';
import chevronLeft from '../assets/chevron_left.svg';

import { getThreadsFromSub, voteThread } from '../api/threads';

import '../styles/components/threads.scss';

// todo tell Pierre to add voted & title on the thread object
// todo add reply feature
export default function Threads({ currentSubId }) {
  const user = useSelector((state) => state.userReducer);
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);
  const voted = { down: 'down', up: 'up' };

  const voteForThread = async (threadId, vote, cancel) => (new Promise((resolve, reject) => {
    voteThread(threadId, { user_id: user.id, vote, cancel })
      .then((res) => resolve(res))
      .catch((err) => { reject(err); toast.error(err.message); });
  }));

  const extractData = (data) => {
    const everyThread = Object.entries(data).map(([key, value]) => ({ ...value, id: key }));
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
                hasDropdown
                alwaysOpen
                title={(
                  <div className="thread-title">
                    <span className="username">{`${child.username || 'unknown_user'}`}</span>
                  </div>
              )}
                dropdownContent={(
                  <div className="thread-comment-content">
                    <div>{child.message}</div>
                    <UserActionBar
                      score={child.score}
                      hasVoteBtn
                      hasReply
                      noCommentsCount
                      onVoteUp={() => voteForThread(child.id, 'up', !!child.voted)}
                      onVoteDown={() => voteForThread(child.id, 'down', !!child.voted)}
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

  useEffect(() => {
    getThreadsFromSub(currentSubId, user.id)
      .then((res) => {
        const extractedData = extractData(res);
        const formattedThreads = formatData(extractedData);
        setThreads(formattedThreads);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  return (
    !currentThread ? (
      <div className="threads-achievements-container">
        {threads.map((thread) => (
          <Card
            key={`thread-${thread.created_at}-${thread.message}`}
            hasDropdown
            alwaysOpen
            customClass="thread-card"
            title={(
              <div className="thread-title">
                <span className="big-title">{thread.message}</span>
                <span className="username">{`${thread.username || 'unknown_user'}`}</span>
              </div>
            )}
            onClick={() => setCurrentThread(thread)}
            dropdownContent={(
              <UserActionBar
                score={thread.score}
                commentsCount={thread.childrenCount}
                hasVoteBtn
                onVoteUp={() => voteForThread(thread.id, 'up', !!thread.voted)}
                onVoteDown={() => voteForThread(thread.id, 'down', !!thread.voted)}
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
              <span className="big-title">{currentThread.message}</span>
              <span className="username">{`${currentThread.username || 'unknown_user'}`}</span>
            </div>
          )}
          dropdownContent={(
            <div className="thread-comment-content">
              <div>{`${currentThread.message}`}</div>
              <UserActionBar
                score={currentThread.score}
                commentsCount={currentThread.childrenCount}
                hasVoteBtn
                hasReply
                onVoteUp={() => voteForThread(currentThread.id, 'up', !!currentThread.voted)}
                onVoteDown={() => voteForThread(currentThread.id, 'down', !!currentThread.voted)}
                votedDown={currentThread.voted === voted.down}
                votedUp={currentThread.voted === voted.up}
              />
            </div>
          )}
        />
        {currentThread.children ? renderChildren(currentThread.children, 0) : null}
      </div>
    )
  );
}
Threads.propTypes = {
  currentSubId: PropTypes.string.isRequired,
};
