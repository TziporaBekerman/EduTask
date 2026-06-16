export default function Input(props) {
    const handleChange  = (e) => {
        const { name, value } = e.target
        props.setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <input
            name={props.name}
            type={props.type ? props.type : 'text'}
            placeholder={props.placeholder}
            value={props.data[props.name]||''}
            onChange={handleChange}
        />
    )
}