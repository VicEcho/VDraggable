import React, { Component } from 'react';
import { Row, Col } from 'antd';
import * as styles from './draggable.less'

export default class VDraggablePro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            border: "1px solid black",
            uId: this.guid()
        }
    }

    S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    guid() {
        return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
    }
    // 拖动事件
    domdrugstart(sort, code, uId, item, ee) {
        ee.dataTransfer.setData("code", code);
        ee.dataTransfer.setData("uId", uId);
        ee.dataTransfer.setData("item", JSON.stringify(item));
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
    drop(dropedSort, data, sortKey, dropedUid, ee) {
        // console.log('释放的时候ee', ee)
        ee.preventDefault();
        const code = ee.dataTransfer.getData("code");
        const uId = ee.dataTransfer.getData("uId");
        const dragedItem = ee.dataTransfer.getData("item");
        const sort = ee.dataTransfer.getData("sort");
        if (uId === dropedUid) {
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
        } else if (this.props.isAcceptAdd) {
            let objDragedItem = JSON.parse(dragedItem);
            if ( data.filter(item => item.code === objDragedItem.code).length === 0 ) {
                // data.push(objDragedItem);
                const maxSort = Math.max.apply(Math, data.map(citem => citem[sortKey]));
                data.map(item => {
                    if ( dropedSort === maxSort) {
                        objDragedItem[sortKey] = dropedSort + 1;
                    } else {
                        objDragedItem[sortKey] = dropedSort;
                        item[sortKey]++
                    }
                    return item
                });
                data.push(objDragedItem)
            } 
        }
        this.props.onChange(data)
        console.log('data', data)
        ee.target.classList.remove(styles.droppingContent);
        ee.target.classList.add(styles.content);

    }
    allowDrop(ee) {
        ee.preventDefault();
    }
    // 生成拖拽组件
    createDraggleComponent(data, sortKey, style, uId) {
        return data.sort(this.compare("sort")).map((item) => {
            return (
                <div
                    className={styles.content}
                    key={item.code}
                    draggable={true}
                    onDragEnter={this.dragenter.bind(this)}
                    onDragLeave={this.dragleave.bind(this)}
                    onDragStart={this.domdrugstart.bind(this, item[sortKey], item.code, uId, item)}
                    onDrop={this.drop.bind(this, item[sortKey], data, sortKey, uId)}
                    onDragOver={this.allowDrop.bind(this)}
                    style={{ ...style }}>{item.content}</div>
            )
        })
    }
    render() {
        const { value, sortKey, style } = this.props;
        const { uId } = this.state;
        return (
            <Row>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {this.createDraggleComponent(value, sortKey, style, uId)}
                </div>
            </Row>
        )
    }
}