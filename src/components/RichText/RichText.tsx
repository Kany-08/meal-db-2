import { Fragment } from "react";

export function RichText({ text }: { text: string }) {
  const lines = text.split("\r\n");
  return (
    <>
      {lines.map((line, index, { length }) => (
        <Fragment key={index}>
          {line}
          {index !== length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}
