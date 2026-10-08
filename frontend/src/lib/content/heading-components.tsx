import type { Components } from "react-markdown";

export const headingComponents: Components = {
  h1: ({ children, ...props }) => {
    const id = typeof children === "string"
      ? children.replace(/\s+/g, "-").toLowerCase()
      : "";
    return <h1 id={id} {...props}>{children}</h1>;
  },
  h2: ({ children, ...props }) => {
    const id = typeof children === "string"
      ? children.replace(/\s+/g, "-").toLowerCase()
      : "";
    return <h2 id={id} {...props}>{children}</h2>;
  },
  h3: ({ children, ...props }) => {
    const id = typeof children === "string"
      ? children.replace(/\s+/g, "-").toLowerCase()
      : "";
    return <h3 id={id} {...props}>{children}</h3>;
  },
  h4: ({ children, ...props }) => {
    const id = typeof children === "string"
      ? children.replace(/\s+/g, "-").toLowerCase()
      : "";
    return <h4 id={id} {...props}>{children}</h4>;
  },
  h5: ({ children, ...props }) => {
    const id = typeof children === "string"
      ? children.replace(/\s+/g, "-").toLowerCase()
      : "";
    return <h5 id={id} {...props}>{children}</h5>;
  },
  h6: ({ children, ...props }) => {
    const id = typeof children === "string"
      ? children.replace(/\s+/g, "-").toLowerCase()
      : "";
    return <h6 id={id} {...props}>{children}</h6>;
  },
};
