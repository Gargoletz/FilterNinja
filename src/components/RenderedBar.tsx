import * as React from "react";

class RenderedBar extends React.Component<{ parent: any }> {
  handle: React.RefObject<any>;
  state = {
    active: false,
    delta: 0,
    top: 0,
  };

  constructor(props) {
    super(props);

    this.handle = React.createRef();
  }

  componentDidMount() {
    this.handle.current.addEventListener("mousedown", (e) => {
      this.setState(
        {
          active: true,
          // delta: e.clientY - this.handle.current.getBoundingClientRect().y,
          delta: 0,
        },
        () => {
          this.move(e.clientY);
        }
      );
    });
    document.addEventListener("mouseup", (e) => {
      this.setState({ active: false }, () => {
        this.setState({
          top: this.correctOffset(this.state.top),
        });
      });
    });
    document.addEventListener("mousemove", (e) => {
      if (this.state.active) this.move(e.clientY);
    });
  }

  correctOffset(offset: number) {
    return Math.min(
      offset,
      this.props.parent.ref.current?.clientHeight -
        this.handle?.current?.clientHeight
    );
  }

  move(y) {
    const { parent } = this.props;
    console.log(y);

    if (parent.ref.current != undefined) {
      this.setState(
        {
          top: Math.max(
            Math.min(
              y - this.state.delta,
              parent.ref.current.clientHeight -
                this.handle.current.getBoundingClientRect().height
            ),
            0
          ),
        },
        () => {
          let index = Math.floor(
            Math.max(Math.min(y / parent.ref.current.clientHeight, 1), 0) *
              (parent.props.children.length - 1)
          );

          if (index < parent.props.children.length - parent.state.size) {
            // if (parent.state.from != index) {
            parent.setState({ from: index }, () => {
              parent.setOffset(0);
            });
            // }
          } else {
            parent.setState(
              { from: Math.max(index - parent.state.size, 0) },
              () => {
                if (
                  parent.ref2.current.clientHeight >
                  parent.ref.current.clientHeight
                ) {
                  index -= parent.state.from;
                  let query = document.querySelectorAll(".list-element");
                  let sum = 0;
                  for (let i = 0; i < index; i++) {
                    if (query[i] != undefined)
                      sum += query[i].getBoundingClientRect().height;
                  }
                  if (
                    parent.ref2.current.clientHeight - sum >=
                    parent.ref.current.clientHeight
                  )
                    parent.setOffset(-sum);
                  else
                    parent.setOffset(
                      Math.floor(
                        parent.ref.current.clientHeight -
                          parent.ref2.current.clientHeight
                      )
                    );
                } else parent.setOffset(0);
              }
            );
          }
        }
      );
    }

    // this.fixBar();
  }

  setBarIndex(index) {
    const { length } = this.props.parent.props.children;
    const { clientHeight } = this.props.parent.ref.current;
    const handleHeight = this.handle.current.clientHeight;
    this.setState({
      top: Math.min(
        (index / length) * clientHeight,
        clientHeight - handleHeight
      ),
    });
  }

  countElements() {
    let n = 0;
    if (this.props.parent.ref.current) {
      const { clientHeight } = this.props.parent.ref.current;
      let query = document.querySelectorAll(".list-element");
      for (let i = 0; i < query.length; i++) {
        const { y, height } = query[i].getBoundingClientRect();
        if (y + height > 0 && y + height <= clientHeight) n++;
      }
    }
    return n;
  }

  fixBar() {
    const { from, size } = this.props.parent.state;
    const { length } = this.props.parent.props.children;

    if (from < length - size) this.setBarIndex(from);
    else {
      let query = document.querySelectorAll(".list-element");
      for (let i = 0; i < query.length; i++) {
        let rect = query[i].getBoundingClientRect();
        if (rect.y > 0) {
          this.setBarIndex(i + from);
          break;
        }
      }
    }
  }

  goToIndex(index) {
    // if (length - e.id > this.props.parent.state.size)
    //     this.props.parent.setState({ from: e.id }, () => {
    //         this.setState({ delta: 0 }, () => {
    //             this.move(e.id / length * height);
    //         });
    //     });
    // else {
    //     this.props.parent.setState({ from: length - this.props.parent.state.size }, () => {
    //         this.setState({ delta: 0 }, () => {
    //             this.move(e.id / length * height);
    //         })
    //     });
    // }
  }

  isLastVisible() {
    const rect = this.props.parent.ref?.current?.getBoundingClientRect();
    const rect2 = this.props.parent.ref2?.current?.getBoundingClientRect();
    if (rect && rect2) return rect.y + rect.height == rect2.y + rect2.height;
    return false;
  }

  render() {
    const { length } = this.props.parent.props.children;
    const { ref, ref2 } = this.props.parent;
    const { from } = this.props.parent.state;
    let height = 1;
    if (ref.current != undefined) {
      height = ref.current.getBoundingClientRect().height;
    }
    return (
      <div
        style={{
          display:
            ref2.current && ref2.current.clientHeight > height
              ? "block"
              : "none",
          userSelect: "none",
        }}
      >
        <div
          id="scroll-bar"
          style={{
            userSelect: "none",
            position: "absolute",
            top: 0,
            right: 10,
            width: 10,
            height: "100%",
          }}
        >
          <div
            ref={this.handle}
            id="scroll-handle"
            style={{
              position: "relative",
              userSelect: "none",
              top: Math.min(
                this.state.top,
                height - this.handle?.current?.clientHeight
              ),
              width: "100%",
              height: `max(${(1 / length) * 100}%, 15px)`,
              // height: `max(${(this.state.active ? 1 : this.countElements()) / length * 100}%, 15px)`,
              backgroundColor: this.state.active ? "gray" : "black",
              cursor: "pointer",
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default RenderedBar;
