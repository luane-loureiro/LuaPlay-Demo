import { Link } from "react-router-dom";

export default function MenuLink({ children, to, className = "", ...props }) {
  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
}