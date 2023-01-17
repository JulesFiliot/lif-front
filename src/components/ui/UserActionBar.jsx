import React from 'react';
import PropTypes from 'prop-types';
import { t } from 'i18next';
import SVG from 'react-inlinesvg';
import SvgBtn from './SvgBtn';
import Button from './Button';

import commentIcon from '../../assets/comment_icon.svg';
import arrowUp from '../../assets/arrow_up.svg';

import '../../styles/components/ui/userActionBar.scss';

export default function UserActionBar({
  score, onVoteDown, onVoteUp,
  commentsCount, hasReply, hasVoteBtn,
  noCommentsCount, votedDown, votedUp,
  replyAction,
}) {
  return (
    <div className="user-action-bar-container">
      <div className="score-container">
        {hasVoteBtn && (
          <SvgBtn
            disabled={votedDown}
            svgSource={arrowUp}
            onClick={onVoteUp}
            customClass={`arrow-up${votedUp ? ' voted' : ''}`}
          />
        )}
        <span className="score">{score}</span>
        {hasVoteBtn && (
          <SvgBtn
            disabled={votedUp}
            svgSource={arrowUp}
            onClick={onVoteDown}
            customClass={`arrow-down${votedDown ? ' voted' : ''}`}
          />
        )}
      </div>
      {!noCommentsCount && (
        <div className="comments-container">
          <SVG src={commentIcon} className="comment-icon" />
          <span className="comments-count">{commentsCount}</span>
        </div>
      )}
      {hasReply && (
        <div className="reply-container">
          <Button clickAction={replyAction} content={t('userActionBar.reply')} />
        </div>
      )}
    </div>
  );
}
UserActionBar.propTypes = {
  score: PropTypes.number.isRequired,
  onVoteDown: PropTypes.func,
  onVoteUp: PropTypes.func,
  commentsCount: PropTypes.number,
  hasReply: PropTypes.bool,
  hasVoteBtn: PropTypes.bool,
  noCommentsCount: PropTypes.bool,
  votedDown: PropTypes.bool,
  votedUp: PropTypes.bool,
  replyAction: PropTypes.func,
};
UserActionBar.defaultProps = {
  onVoteDown: () => {},
  onVoteUp: () => {},
  replyAction: () => {},
  hasReply: false,
  hasVoteBtn: false,
  noCommentsCount: false,
  commentsCount: 0,
  votedDown: false,
  votedUp: false,
};
