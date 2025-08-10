import './Button.css';

function Button(props) {
  return (
    <div className='button' onClick={ props.onClick }>
      { props.actionName }
    </div>
  );
}

export default Button;