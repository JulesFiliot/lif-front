import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

import { getThreadsFromSub, voteThread } from '../api/threads';

import '../styles/components/threads.scss';
import Card from './ui/Card';
import UserActionBar from './ui/UserActionBar';

// todo add real score & comments count
export default function Threads({ currentSubId }) {
  const user = useSelector((state) => state.userReducer);
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);

  const voteForThread = async (threadId, vote, cancel) => (new Promise((resolve, reject) => {
    // {user_id, vote: 'up' ou 'down', 'cancel': true ou false}
    voteThread(threadId, { user_id: user.id, vote, cancel })
      .then((res) => resolve(res))
      .catch((err) => { reject(err); toast.error(err.message); });
  }));

  const extractData = (data) => {
    const everyThread = Object.entries(data).map(([key, value]) => ({ ...value, id: key }));
    return everyThread;
  };

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
                    {`${child.username || 'unknown_user'}`}
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
                      onVoteUp={() => voteForThread(child.id, 'up', child.voted)}
                      onVoteDown={() => voteForThread(child.id, 'down', child.voted)}
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
        {threads.map((t) => (
          <Card
            key={`thread-${t.created_at}-${t.message}`}
            hasDropdown
            alwaysOpen
            title={(
              <div className="thread-title">
                {t.message}
              </div>
          )}
            onClick={() => setCurrentThread(t)}
            dropdownContent={(
              <UserActionBar
                score={t.score}
                commentsCount={t.childrenCount}
                hasVoteBtn
                onVoteUp={() => voteForThread(t.id, 'up', t.voted)}
                onVoteDown={() => voteForThread(t.id, 'down', t.voted)}
              />
)}
          />
        ))}
      </div>
    ) : (
      <div className="threads-details-container">
        <Card
          hasDropdown
          alwaysOpen
          title={(
            <div className="thread-title">
              {`${currentThread.username || 'unknown_user'}`}
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
