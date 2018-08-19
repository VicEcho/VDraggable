import React, { Component } from 'react';
import * as styles from './draggable.less'

export default class VDraggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        if (ee.target.className.indexOf('droppedcontent') !== -1) {
            ee.target.className = styles.droppingContent;
        }
    }
    // a拖到b，离开b的时候触发
    dragleave(ee) {
        if (ee.target.className.indexOf('droppingContent') !== -1) {
            ee.target.className = styles.droppedcontent;
        }
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
    drop(dropedSort, data, sortKey, dropedUid, codeKey, ee) {
        // console.log('释放的时候ee', ee)
        ee.preventDefault();
        const code = ee.dataTransfer.getData("code");
        const uId = ee.dataTransfer.getData("uId");
        const dragedItem = ee.dataTransfer.getData("item");
        const sort = ee.dataTransfer.getData("sort");
        if (uId === dropedUid) {
            if (sort < dropedSort) {
                data.map(item => {
                    if (item[codeKey] === code) {
                        item[sortKey] = dropedSort;
                    } else if (item[sortKey] > sort && item[sortKey] < dropedSort + 1) {
                        item[sortKey]--;
                    }
                    return item;
                });
                // ee.target.before(document.getElementById(code))
            } else {
                data.map(item => {
                    if (item[codeKey] === code) {
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
            if (data.filter(item => item[codeKey] === objDragedItem[codeKey]).length === 0) {
                const maxSort = Math.max.apply(Math, data.map(citem => citem[sortKey]));
                data.map(item => {
                    if (dropedSort === maxSort) {
                        objDragedItem[sortKey] = dropedSort + 1;
                    } else {
                        if (item.sort > dropedSort) {
                            objDragedItem[sortKey] = dropedSort + 1;
                            item[sortKey]++
                        }
                    }
                    return item
                });
                data.push(objDragedItem)
            }
        }
        this.props.onChange(data)
        if (ee.target.className.indexOf('droppingContent') !== -1) {
            ee.target.className = styles.droppedcontent;
        }

    }
    allowDrop(ee) {
        ee.preventDefault();
    }
    // 生成拖拽组件
    createDraggleComponent(data, sortKey, style, uId, render, codeKey) {
        return data.sort(this.compare(sortKey)).map((item) => {
            return (
                <div
                    className={styles.droppedcontent}
                    key={item[codeKey]}
                    draggable={true}
                    onDragEnter={this.dragenter.bind(this)}
                    onDragLeave={this.dragleave.bind(this)}
                    onDragStart={this.domdrugstart.bind(this, item[sortKey], item[codeKey], uId, item)}
                    onDrop={this.drop.bind(this, item[sortKey], data, sortKey, uId,codeKey)}
                    onDragOver={this.allowDrop.bind(this)}
                    style={{ ...style }}>{render(item)}</div>
            )
        })
    }
    render() {
        const { value, sortKey, codeKey, style, render } = this.props;
        const { uId } = this.state;
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {this.createDraggleComponent(value, sortKey, style, uId, render, codeKey)}
                </div>
            </div>
        )
    }
}

