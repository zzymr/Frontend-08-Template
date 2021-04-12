
function getStyle(element) {
    if(!element.style) {
       element.style = {};
    }
    for (let prop in element.computedStyle) {
        var p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value;
        
        // px 变成数字
        if(element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
        // 字符串转数字
        if(element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }   
    }
    return element.style;
}

function layout(element) {
  if(!element.computedStyle) {
    return;
  }
  // 对style进行预处理
  let elementStyle = getStyle(element);

  if(elementStyle.display !== 'flex') {
    return;
  }
  // 过滤文本节点
  let items = element.children.filter(e => e.type === 'element');
  // 支持order属性   
  items.sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
  })

  let style =  elementStyle;

  // 主轴交叉轴处理
  ['width', 'height'].forEach(size => {
    if(style[size] === 'auto' || style[size] === '') {
        style[size] = null;
    }
  })

  if(!style.flexDirection || style.flexDirection === 'auto') {
      style.flexDirection = 'row';
  }
  if(!style.alighItems || style.alighItems === 'auto') {
      style.alighItems = 'stretch';
  }
  if(!style.justifyContent || style.justifyContent === 'auto') {
    style.justifyContent = 'flex-start';
  }
  if(!style.flexWrap || style.flexWrap === 'auto') {
    style.flexWrap = 'nowrap';
  } 
  if(!style.alignContent || style.alignContent === 'auto') {
    style.alignContent = 'stretch';
  }   

  // 属性抽象
  let mainSize, mainStart, mainEnd, mainSign, mainBase, 
  crossSize, crossStart, crossEnd, crossSign, crossBase;
  if(style.flexDirection === 'row') {
      mainSize = 'width'; // 主轴尺寸
      mainStart = 'left';
      mainEnd = 'right';
      mainSign = +1; // 左开始加 
      mainBase = 0; // 从左开始或者从右开始的值
      // mainSize， mainSign， mainBase可以构成计算时一组数据的基础
      crossSize = 'height';
      crossStart = 'top';
      crossEnd = 'bottom';
  }
  if(style.flexDirection === 'row-reverse') {
    mainSize = 'width';
    mainStart = 'right';
    mainEnd = 'left';
    mainSign = -1;
    mainBase = style.width;

    crossSize = 'height';
    crossStart = 'top';
    crossEnd = 'bottom';
  }
  if(style.flexDirection === 'column') {
    mainSize = 'height';
    mainStart = 'top';
    mainEnd = 'bottom';
    crossSign = +1;
    crossBase = 0;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }   
  if(style.flexDirection === 'column-reverse') {
    mainSize = 'height';
    mainStart = 'bottom';
    mainEnd = 'top';
    crossSign = -1;
    crossBase = style.height;

    crossSize = 'width';
    crossStart = 'left';
    crossEnd = 'right';
  }          
  if(style.flexWrap === 'wrap-reverse') {
    // [crossStart, crossEnd] = [crossEnd, crossStart];
    var tmp = crossStart;
    crossStart = crossEnd;
    crossEnd = tmp;
    crossSign = -1;
  }else {
    crossBase = 0; 
    crossSign = 1;
  }  

  // 父元素没设置主轴尺寸情况处理
  let isAutoMainSize = false;
  if(!style[mainSize]) { // auto sizing
     elementStyle[mainSize] = 0;
     for (let i = 0; i < items.length; i++) {
         let item = items[i];
         if(itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
             elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize]
         }
         
     }
     isAutoMainSize = true;
  }

  let flexLine = [];
  let flexLines = [flexLine];
  let mainSpace = elementStyle[mainSize]; // 剩余空间， elementStyle[mainSize]父元素主轴尺寸
  var crossSpace = 0;

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let itemStyle = getStyle(item);
    if(itemStyle[mainSize] === null) { // 没设主轴尺寸
        itemStyle[mainSize] = 0;
    }

    if(itemStyle.flex) { // 认为有flex属性就是可伸缩的
        flexLine.push(item);
    }else if(style.flexWrap === 'nowrap' && isAutoMainSize) {
        mainSpace -= itemStyle[mainSize];
        if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
            crossSpace = Math.max(crossSpace, itemStyle[crossSize]); // 行高,最好的元素
        }
        flexLine.push(item);
    }else {
        // 换行逻辑
        // 比父元素尺寸大的，压到和父元素尺寸一样大
        if(itemStyle[mainSize] > style[mainSize]) {
            itemStyle[mainSize] = style[mainSize];
        }
        // 剩下的空间不足以容纳元素
        if(mainSpace < itemStyle[mainSize]) {
            // 处理旧的flexLine
           flexLine.mainSpace = mainSpace;
           flexLine.crossSpace = crossSpace;
           // 创建新行
           flexLine = [item];
           flexLines.push(flexLine);
           // 重置属性
           mainSpace = style[mainSize];
           crossSpace = 0;
        } else {
            flexLine.push(item);
        }
        
        // 计算交叉轴的尺寸
        if(itemStyle[crossSize] !== null || itemStyle[crossSize] !== (void 0)) {
            crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
        }
        mainSpace -= itemStyle[mainSize];
    }
  }
  // 元素没了，最后一行flexLine加上mainSpace。写循环的技巧
  flexLine.mainSpace = mainSpace;


  // 主轴
  if(style.flexWrap === 'nowrap' || isAutoMainSize) {
      flexLine.crossSpace = (style[crossSize] !== undefined)? style[crossSize] : crossSpace;
  } else {
      flexLine.crossSpace = crossSpace;
  }

  if(mainSpace< 0 ) {
      // 等比压缩 单行情况
      // overflow (happens only if container is single line),scale every item
      var scale = style[mainSize] / (style[mainSize] - mainSpace); 
      //(style[mainSize] - mainSpace)期望尺寸 (style[mainSize] 容器的组件尺寸， scale<1
      let currentMain = mainBase; 

      for (let i = 0; i < items.length; i++) {
          let item = items[i];
          let itemStyle = getStyle(item);

          if(itemStyle.flex) {
              itemStyle[mainSize] = 0;
          }
          itemStyle[mainSize] = itemStyle[mainSize] * scale;

          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
        }
    } else {
        // process each flex line
        flexLines.forEach(function(items) {
            let mainSpace = items.mainSpace;
            let flexTotal = 0;
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let itemStyle = getStyle(item);
      
                if(itemStyle.flex !== null && itemStyle.flex !== (void 0)) {
                    flexTotal += itemStyle.flex;
                    continue;
                }
                
            }      
            
            if(flexTotal > 0) {
                // There is flexable flex items
                let currentMain = mainBase;

                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    let itemStyle = getStyle(item);
          
                    if(itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }
                    itemStyle[mainSize] = itemStyle[mainSize] * scale;
          
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd];
                  }
            } else {
                // There  is *NO* flexable flex items, which means , justifyContent should work
                if(style.justifyContent === 'flex-start') {
                    var currentMain = mainBase;
                    var step = 0; // 每个元素没有间隔
                } 
                if(style,justifyContent === 'flex-end') {
                    var currentMain = mainSpace * mainSign + mainBase;
                    var step = 0;
                } 
                if(style,justifyContent === 'center') {
                    var currentMain = mainSpace / 2 * mainSign + mainBase;
                    var step = 0;
                }  
                if(style,justifyContent === 'space-between') {
                    var step = mainSpace / (items.length - 1) + mainBase;
                    var currentMain = mainBase;
                } 
                if(style,justifyContent === 'space-around') {
                    
                    var step = mainSpace / items.length + mainSign;
                    var currentMain = step/2 + mainBase;
                }      
                
                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + step;
                    
                }
            }
        }) 
    }
    
    // 计算交叉轴
    // align-items， align-self
    // let crossSpace;
    var crossSpace;
    if(!style[crossSize]) { // auto sizing
     crossSpace = 0;
     elementStyle[crossSize] = 0;
     for (let i = 0; i < items.length; i++) {
         elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
     } 
    } else {
        crossSpace = style[crossSize];
        for (let i = 0; i < flexLines.length; i++) {
            crossSpace -=  flexLines[i].crossSpace;
        }         
    }

    if(style.flexWrap === 'wrap-reverse') {
        crossBase = style[crossBase];
    } else {
        crossBase = 0;
    }
    lineSize = style[crossSize] / flexLines.length; 

    var step;
    if(style.alignContent === 'flex-start') {
        crossBase += 0;
        step = 0;
    }
    if(style.alignContent === 'flex-end') {
        crossBase += crossSize * crossSign;
        step = 0;
    }
    if(style.alignContent === 'center') {
        crossBase += crossSize * crossSign / 2;
        step = 0;
    }
    if(style.alignContent === 'space-between') {
        crossBase += 0;
        step = crossSpace / (flexLines.length -1);
    }
    if(style.alignContent === 'space-around') {
        step = crossSpace / flexLines.length;
        crossBase += crossSign * step / 2;
    }
    if(style.alignContent === 'stretch') {
        crossBase += 0;
        step = 0;
    }
    
    flexLines.forEach(function(items) {
        let lineCrossSize = style.alignContent === 'stretch' ? 
            items.crossSpace + crossSpace / flexLines.length : 
            items.crossSpace;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemStyle = getStyle(item);
  
            let align = itemStyle.alignSelf || style.alighItems; // itemStyle.alignSelf优先级高

            if(itemStyle[crossSize] === null) {
               itemStyle[crossSize] = (align === 'stretch') ? lineCrossSize : 0; 
            }
            
            if(align === 'flex-start') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if(align === 'flex-end') {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }
            if(align === 'center') {
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }

            if(align === 'stretch') {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))) ?  itemStyle[crossSize] : lineCrossSize;
                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
            }
        }  
        crossBase += crossSign * (lineCrossSize + step);
    });
    console.log('items:', items);
}    

module.exports = layout;