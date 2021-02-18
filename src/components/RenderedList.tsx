import * as React from 'react';
import RenderedBar from './RenderedBar';

const MOVE_SPEED = 50;

class ScrollableList extends React.Component {

    state = {
        offset: 0,
        from: 0,
        size: 18,
    };

    ref: React.RefObject<HTMLDivElement>;
    ref2: React.RefObject<HTMLDivElement>;
    bar: React.RefObject<RenderedBar>;


    constructor(props) {
        super(props);

        this.ref = React.createRef();
        this.ref2 = React.createRef();
        this.bar = React.createRef();
    }

    getOffset() {
        const { top } = this.ref2.current.style;
        return top ?
            parseFloat(top.split("px")[0]) : 0;
    }

    setOffset(value) {
        if (this.ref2.current) {
            this.setState({
                offset: this.ref2.current.clientHeight
            })
            this.ref2.current.style.top = `${value}px`;
        }
    }

    getSize() {
        return (this.props.children as any[]).length;
    }

    move(step) {
        if (this.ref2.current && this.ref.current) {
            if (this.ref2.current.getBoundingClientRect().height >= this.ref.current.getBoundingClientRect().height) {
                this.setOffset(this.getOffset() + step);
                this.reload();
            }
        }
    }

    reload() {
        let query = document.querySelectorAll(".list-element");

        let last = query[query.length - 1];
        let rect = last.getBoundingClientRect();

        if (rect.y >= this.ref.current.getBoundingClientRect().height + rect.height) {
            this.setState({ to: this.state.from - 1 });
        }
        else {
            if (this.state.from + this.state.size < this.getSize() - 1) {
                if (rect.y + rect.height - MOVE_SPEED <= this.ref.current.getBoundingClientRect().height) {
                    this.setState({ to: this.state.from + 1 });
                }
            }
            else {
                if (rect.y + rect.height <= this.ref.current.getBoundingClientRect().height) {
                    this.setOffset(this.ref.current.getBoundingClientRect().height - this.ref2.current.getBoundingClientRect().height);
                }
            }
        }

        let first = query[0];
        let { y, height } = first.getBoundingClientRect();

        if (y >= 0) {
            if (this.state.from > 0) {
                this.setState({ from: this.state.from - 1 }, () => {
                    let { height } = document.querySelector(".list-element").getBoundingClientRect();
                    this.setOffset(-height);
                    if (document.querySelector(".list-element").getBoundingClientRect().y > 0)
                        this.reload();
                });
            }
            else {
                this.setOffset(0);
            }
        }

        if (y <= -height*2) {
            if (this.getSize() - this.state.from > this.state.size) {
                this.setState({ from: this.state.from + 1 }, () => {
                    this.setOffset(this.getOffset() + height);
                });
            }
        }

        this.bar.current.fixBar();
    }

    componentDidMount() {
        this.setState({ offset: this.ref2.current.clientHeight });

        document.addEventListener("mousewheel", (e: WheelEvent) => {
            let sign = e.deltaY / Math.abs(e.deltaY);
            this.move(MOVE_SPEED * -sign);
        })
    }

    render() {
        return (
            <div ref={this.ref} style={{ height: window.innerHeight, overflow: "hidden" }} >
                <div ref={this.ref2} style={{ position: "relative" }}>
                    {(this.props.children as any[]).map((e, i) => {
                        if (i >= this.state.from && i <= this.state.from + this.state.size)
                            return <div id={`list-element-${i}`} className="list-element">{e}</div>;
                        else
                            return null;
                    })}
                </div>
                <RenderedBar ref={this.bar} parent={this} />
            </div >
        );
    }
}

export default ScrollableList;