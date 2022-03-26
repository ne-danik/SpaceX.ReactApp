// components
import Spinner from '../Spinner/Spinner';

const Button = ({ title, action, isNone, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={action}
      className="btn btn_blue_color"
      style={{ 'display': isNone ? 'none' : 'block' }}
      disabled={disabled}
    >
      {
        disabled ? <Spinner size='18px' color='#ffffff' /> : title
      }
    </button>
  )
}

export default Button;