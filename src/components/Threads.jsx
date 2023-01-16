import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

import { getThreadsFromSub } from '../api/threads';

import '../styles/components/threads.scss';
import Card from './ui/Card';
import UserActionBar from './ui/UserActionBar';

// todo add real score & comments count
export default function Threads({ currentSubId }) {
  const [threads, setThreads] = useState([]);
  const [currentThread, setCurrentThread] = useState(null);

  const renderChildren = (children, nestingLevel) => {
    if (!children || children?.length === 0) {
      return null;
    }
    return (
      <div className="children-container">
        {nestingLevel ? <div className="nesting-line" /> : null}
        <div className="children-cards">
          {children.map((child) => (
            <>
              <Card
                key={`child-thread-${child.created_at}-${child.message}`}
                hasDropdown
                alwaysOpen
                title={(
                  <div className="thread-title">
                    unknown_user
                  </div>
              )}
                dropdownContent={(
                  <div className="thread-comment-content">
                    <div>{child.message}</div>
                    <UserActionBar
                      score={10}
                      commentsCount={200}
                      hasVoteBtn
                      hasReply
                    />
                  </div>
              )}
              />
              {renderChildren(child.children, nestingLevel + 1)}
            </>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getThreadsFromSub(currentSubId)
      .then((res) => {
        // todo format data on receive to get nested comments
        console.log(res, typeof res);
        const mockData = [
          {
            created_at: '2023-01-13T08:39:34.796Z',
            message: 'I found a weird rock in my yard',
            subcat_id: 'random_subcat_id',
            children: [
              {
                created_at: '2023-01-13T08:39:34.796Z',
                message: 'I found a weird rock in my cat',
                subcat_id: 'random_subcat_id',
              },
              {
                created_at: '2023-01-13T08:39:34.796Z',
                message: 'I found a weird rock in my dog',
                subcat_id: 'random_subcat_id',
                children: [
                  {
                    created_at: '2023-01-13T08:39:34.796Z',
                    message: 'I found a weird rock in my car',
                    subcat_id: 'random_subcat_id',
                  },
                  {
                    created_at: '2023-01-13T08:39:34.796Z',
                    message: 'I found a weird rock in my space car',
                    subcat_id: 'random_subcat_id',
                    children: [
                      {
                        created_at: '2023-01-13T08:39:34.796Z',
                        message: 'I found a weird rock in my dad',
                        subcat_id: 'random_subcat_id',
                      },
                      {
                        created_at: '2023-01-13T08:39:34.796Z',
                        message: 'I found a weird rock in my dad',
                        subcat_id: 'random_subcat_id',
                        children: [
                          {
                            created_at: '2023-01-13T08:39:34.796Z',
                            message: 'I found a weird rock in my chocolate',
                            subcat_id: 'random_subcat_id',
                            children: [
                              {
                                created_at: '2023-01-13T08:39:34.796Z',
                                message: 'I found a weird rock in my brownie',
                                subcat_id: 'random_subcat_id',
                              },
                              {
                                created_at: '2023-01-13T08:39:34.796Z',
                                message: 'I found a weird rock in my garage',
                                subcat_id: 'random_subcat_id',
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    created_at: '2023-01-13T08:39:34.796Z',
                    message: 'I found a weird rock in my plane',
                    subcat_id: 'random_subcat_id',
                  },
                ],
              },
              {
                created_at: '2023-01-13T08:39:34.796Z',
                message: 'I found a weird rock in my closet',
                subcat_id: 'random_subcat_id',
              },
              {
                created_at: '2023-01-13T08:39:34.796Z',
                message: 'I found a weird rock in my brain',
                subcat_id: 'random_subcat_id',
                children: [
                  {
                    created_at: '2023-01-13T08:39:34.796Z',
                    message: 'I found a weird rock in my rock',
                    subcat_id: 'random_subcat_id',
                  },
                ],
              },
            ],
          },
        ];
        setThreads(mockData);
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
                score={10}
                commentsCount={200}
                hasVoteBtn
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
              unknown_user
            </div>
          )}
          dropdownContent={(
            <div className="thread-comment-content">
              <div>{`${currentThread.message}super mot hyper loooong avec qqwes phrease dajsidao jajajo jaoisjd`}</div>
              <UserActionBar
                score={10}
                commentsCount={200}
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
