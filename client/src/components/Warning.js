import "./Warning.css";

export default function Warning(props) {
    return (
        <div className = "warning">
            {props.message}
        </div>
    );
}