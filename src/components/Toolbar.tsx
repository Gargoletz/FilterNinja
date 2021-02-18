import * as React from "react";
import App from "../App";
import AppContext from "../logic/AppContext";

function loadRequest(callback: (data: any) => any) {
  fetch("http://localhost:3001", {
    method: "POST",
    body: JSON.stringify({ action: "load" }),
  })
    .then((res) => res.json())
    .then((res) => {
      callback(res.data);
    });
}

function saveRequest(data: any) {
  fetch("http://localhost:3001", {
    method: "POST",
    body: JSON.stringify({ action: "save", data }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}

function Button(props: { title: string; onClick?: () => any }) {
  const { title, onClick } = props;
  return (
    <button className="button" style={{ marginBottom: 8 }} onClick={onClick}>
      {title}
    </button>
  );
}

export default function Toolbar() {
  const {
    addBegin,
    addAfter,
    addEnd,
    deleteSelected,
    moveSelectedToTop,
    moveSelectedToBottom,
    load,
    print,
    createNew,
    selected,
  } = React.useContext(AppContext);

  return (
    <div
      style={{
        position: "fixed",
        paddingTop: 20,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button title="New" onClick={createNew} />
      <Button title="Load" onClick={() => loadRequest(load)} />
      <Button title="Save" onClick={() => saveRequest(print())} />
      <Button title="Add Begin" onClick={() => addBegin()} />
      <>
        {selected.length > 0 ? (
          <Button title="Add After" onClick={() => addAfter()} />
        ) : null}
      </>
      <Button title="Add End" onClick={() => addEnd()} />
      <Button title="Delete" onClick={() => deleteSelected()} />
      <Button title="Move Top" onClick={() => moveSelectedToTop()} />
      <Button title="Move Bottom" onClick={() => moveSelectedToBottom()} />
    </div>
  );
}
