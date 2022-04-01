// styles
import Button from '../Button/Button';
import './modal.scss';

const Modal = ({ children, open, setOpen, controls = false, controlBtnText = 'Close' }) => {
  return (
    <div
      className={open ? 'modal open' : 'modal'}
      onClick={() => setOpen(false)}
    >
      <div
        className={open ? 'modal__content open' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {controls ? (
          <div className="modal__controls">
            <Button title={controlBtnText} action={() => setOpen(false)} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Modal;