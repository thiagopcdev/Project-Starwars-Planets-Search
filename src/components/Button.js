import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  const { label, onClick, disabled, testId, value } = props;
  return (
    <button
      type="button"
      onClick={ onClick }
      disabled={ disabled }
      data-testid={ testId }
      value={ value }
      title="husahuas"
    >
      { label }
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  testId: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  testId: '',
  value: '',
};
