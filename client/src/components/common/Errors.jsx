export default function Errors({ showError, setShowError }) {
    if (!showError) return null;

    return (
        <div className="error-message">
            {showError}
            <button className="error-close" onClick={() => setShowError('')}>✕</button>
        </div>
    );
}

