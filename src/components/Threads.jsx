import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

import { getThreadsFromSub } from '../api/threads';

import '../styles/components/threads.scss';
import Card from './ui/Card';

export default function Threads({ currentSubId }) {
  const [threads, setThreads] = useState([]);

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
                    ],
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
    <div className="threads-achievements-container">
      {threads.map((t) => (
        <Card
          hasDropdown
          alwaysOpen
          title={(
            <div>
              {t.message}
            </div>
          )}
          dropdownContent={t.message}
        />
      ))}
    </div>
  );
}
Threads.propTypes = {
  currentSubId: PropTypes.string.isRequired,
};
