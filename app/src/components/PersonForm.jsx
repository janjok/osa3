const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>name: <input value={props.name} onChange={props.onName}/></div>
            <div>number: <input value={props.number} onChange={props.onNumber}/></div>
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm