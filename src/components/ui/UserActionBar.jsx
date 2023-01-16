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
  score, onVoteDown, onVoteUp, commentsCount, hasReply, hasVoteBtn, noCommentsCount,
}) {
  return (
    <div className="user-action-bar-container">
      <div className="score-container">
        {hasVoteBtn && (
          <SvgBtn
            svgSource={arrowUp}
            onClick={onVoteUp}
            customClass="arrow-up"
          />
        )}
        <span className="score">{score}</span>
        {hasVoteBtn && (
          <SvgBtn
            svgSource={arrowUp}
            onClick={onVoteDown}
            customClass="arrow-down"
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
          <Button content={t('userActionBar.reply')} />
        </div>
      )}
    </div>
  );
}
UserActionBar.propTypes = {
  score: PropTypes.number.isRequired,
  onVoteDown: PropTypes.func,
  onVoteUp: PropTypes.func,
  commentsCount: PropTypes.number.isRequired,
  hasReply: PropTypes.bool,
  hasVoteBtn: PropTypes.bool,
  noCommentsCount: PropTypes.bool,
};
UserActionBar.defaultProps = {
  onVoteDown: () => {},
  onVoteUp: () => {},
  hasReply: false,
  hasVoteBtn: false,
  noCommentsCount: false,
};
