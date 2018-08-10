import React, { Component } from 'react';
import { Row } from 'antd';
import * as styles from './draggable.less' 

export default class VDraggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            border: "1px solid black"
        }
    }
    // 拖动事件
    domdrugstart(sort, code, ee) {
        ee.dataTransfer.setData("code", code);
        ee.dataTransfer.setData("sort", sort);
    }
    // 拖动后鼠标进入另一个可接受区域
    dragenter(ee) {
        ee.target.classList.remove(styles.content);
        ee.target.classList.add(styles.droppingContent);
        // ee.target.style.border = '2px dashed #008dff';
        // ee.target.style.boxShadow = '0 0 8px rgba(30, 144, 255, 0.8)';
    }
    // a拖到b，离开b的时候触发
    dragleave(ee) {
        ee.target.classList.remove(styles.droppingContent);
        ee.target.classList.add(styles.content);
        // ee.target.style.border = '1px solid grey';
        // ee.target.style.boxShadow = '';
    }
    // 对象排序
    compare(key) {
        return (obj1, obj2) => {
            if (obj1[key] < obj2[key]) {
                return -1;
            } else if (obj1[key] > obj2[key]) {
                return 1;
            }
            return 0
        }
    }
    // 当一个元素或是选中的文字被拖拽释放到一个有效的释放目标位置时
    drop(dropedSort, data, sortKey, ee) {
        ee.preventDefault();
        const code = ee.dataTransfer.getData("code");
        const sort = ee.dataTransfer.getData("sort");
        if (sort < dropedSort) {
            data.map(item => {
                if (item.code === code) {
                    item[sortKey] = dropedSort;
                } else if (item[sortKey] > sort && item[sortKey] < dropedSort + 1) {
                    item[sortKey]--;
                }
                return item;
            });
            // ee.target.before(document.getElementById(code))
        } else {
            data.map(item => {
                if (item.code === code) {
                    item[sortKey] = dropedSort;
                } else if (item[sortKey] > dropedSort - 1 && item[sortKey] < sort) {
                    item[sortKey]++;
                }
                return item;
            });
            // ee.target.after(document.getElementById(code))
        }
        this.props.onChange(data)
        ee.target.classList.remove(styles.droppingContent);
        ee.target.classList.add(styles.content);

    }
    allowDrop(ee) {
        ee.preventDefault();
    }
    // 生成拖拽组件
    createDraggleComponent(data, sortKey, style) {
        return data.sort(this.compare("sort")).map((item) => {
            return (
                <div
                    id={'draggle_div_' + item.code}
                    className={styles.content}
                    key={item.code}
                    draggable={true}
                    onDragEnter={this.dragenter.bind(this)}
                    onDragLeave={this.dragleave.bind(this)}
                    onDragStart={this.domdrugstart.bind(this, item[sortKey], item.code)}
                    onDrop={this.drop.bind(this, item[sortKey], data, sortKey)}
                    onDragOver={this.allowDrop.bind(this)}
                    style={{ ...style }}>{item.content}</div>
            )
        })
    }
    render() {
        const { value, sortKey, style } = this.props;
        return (
            <Row>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.createDraggleComponent(value, sortKey, style)}
                </div>
            </Row>
        )
    }
}