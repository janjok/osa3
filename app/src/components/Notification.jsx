import "./Notification.css"

const Notification = ({ message }) => {
    if(message === null){
        return null
    }

    const m = message[0]

    return (
        <div className={m === "D" || m === "I" ? "errorRed" : "notification"}>
            {message}
        </div>
    )
}

export default Notification