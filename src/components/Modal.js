import "./Modal.css";

const Modal =({isOpened, onModalClose, title, onModalOk})=>{
    return(
        <div className={`modal__wrapper ${isOpened ? "open" : "close"}`}>
            <div className="modal__body">
                <div className="modal__close"
                    onClick={onModalClose}>×
                </div>
                <h2>{title}</h2>
                <hr/>
                <button
                    onClick={onModalOk}>OK</button>
            </div>
        </div>
    )
}

export default Modal;



