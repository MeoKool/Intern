import "./AttendingStatus.css";

export default function AttendingStatus({ status }) {
  const styleMap = {
    InClass: { backgroundColor: "#2F903F" },
    DropOut: { backgroundColor: "#E74A3B" },
    Reserve: { backgroundColor: "#A32cc4" },
    Finish: { backgroundColor: "#8B93FF" },
  };
  return (
    <div style={styleMap[status]} className="chip">
      {status}
    </div>
  );
}
