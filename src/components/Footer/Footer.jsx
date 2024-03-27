export default function Footer() {
  const footerStyle = {
    backgroundColor: "#262626",
    color: "#fff",
    padding: "10px",
    textAlign: "center",
    width: "100%",
    bottom: "0",
    zIndex: "10",
    position: "fixed",
    left: "0",
    right: "0",
  };

  return (
    <footer style={footerStyle}>
      Copyright@2024 BA Warrior. All rights reserved.
    </footer>
  );
}
