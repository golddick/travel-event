


interface ButtonProps {
  title: string;
  text?: string; // optional text size
  href?: string;
}

export default function Button({ title, text = "0.8rem", href }: ButtonProps) {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#026EFF",
    color: "#fff",
    fontFamily: "var(--font-dm-sans)",
    fontWeight: 500,
    padding: "0.75rem 1.25rem",
    fontSize: text,
    borderRadius: "0.75rem",
    cursor: "pointer",
    display: "block",
    margin: "0 auto",
    whiteSpace: "nowrap",
    transition: "background-color 0.3s, color 0.3s",
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: "#0270ffcc",
    color: "rgba(255,255,255,0.74)",
  };

  return href ? (
    <a
      href={href}
      style={buttonStyle}
      onMouseEnter={e => Object.assign((e.target as HTMLAnchorElement).style, hoverStyle)}
      onMouseLeave={e => Object.assign((e.target as HTMLAnchorElement).style, buttonStyle)}
    >
      {title}
    </a>
  ) : (
    <button
      style={buttonStyle}
      onMouseEnter={e => Object.assign((e.target as HTMLButtonElement).style, hoverStyle)}
      onMouseLeave={e => Object.assign((e.target as HTMLButtonElement).style, buttonStyle)}
    >
      {title}
    </button>
  );
}

