import React from 'react';
import PropTypes from 'prop-types';
import './input.css';

function Input({
  buttonColor = '#5001d0',
  placeholder = 'Enter your text here',
  size = 'sm',
  buttonText = 'Submit',
}) {
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(false);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    console.log('here');
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className={`input-container ${active ? 'show-floater' : ''}`}>
      <div className='overlay'></div>
      <div
        className='floater content'
        style={{ width: size === 'sm' ? '500px' : '700px' }}
      >
        <form onSubmit={handleSubmit}>
          <div class='floater-top'>
            <input
              type='text'
              class='form-control'
              placeholder={placeholder}
              value={query}
              onChange={handleChange}
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
            />
          </div>

          <div class='floater-bottom'>
            <button type='submit' style={{ backgroundColor: buttonColor }}>
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Input;

Input.propTypes = {
  buttonColor: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['lg', 'sm']),
  buttonText: PropTypes.string,
};
