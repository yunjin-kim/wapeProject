const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

export const _add = (a, b) => a + b;

export const _go = (...args) => _reduce((a, f)=>f(a), args);

export const _pipe = (f,...fs) => (...as) => _go(f(...as), ...fs);

export const _filter = curry((f, iter) => {
  let res = [];
  for(const a of iter){
    if(f(a)) res.push(a);
  }
  return res;
});

export const _map = curry((f, iter) => {
    let res = [];
    for (const a of iter) {
      res.push(f(a));
    }
    return res;
});

export const _reduce = curry((f, acc, iter) => {
  if(!iter){
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for(const a of iter){
    acc = f(acc, a);
  }
  return acc;
})

export const _range = l => {
  let i = -1;
  let res = []
  while(++i < l){
    res.push(i)
  }
  return res;
};

const _L = {};

_L.range = function *(l){
  let i = -1;
  while(++i < l){
    yield i;
  }
};

export const _take = curry((l, iter) => {
  let res = [];
  for(const a of iter){
    res.push(a);
    if(res.length === l) return res;
  }
  return res;
})