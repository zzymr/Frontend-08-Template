// match函数 abcabx
function match(str) {
  let state = start;
  for (let c of str) {
    state = state(c)  
  }
  return state === end;
}

function start(c) {
   if( c === 'a') {
       return foundA;
   } else {
       return start;
   }
}

function end(c) {
    return end;
}

function foundA(c) {
    if( c === 'b') {
        return foundB;
    } else {
        return start(c);
    }
}
function foundB(c) {
    if( c === 'c') {
        return foundC;
    } else {
        return start(c);
    }
}
function foundC(c) {
    if( c === 'a') {
        return foundA2;
    } else {
        return start(c);
    }
}
function foundA2(c) {
    if( c === 'b') {
        return foundX;
    } else {
        return start(c);
    }
}
function foundX(c) {
    if( c === 'x') {
        return end;
    } else {
        return foundB(c);
    }
}
let flag = match('abcabcabcabx');
console.log('flag:', flag);