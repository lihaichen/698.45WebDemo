import EventEmitter from 'eventemitter3';

class AppDispatcher extends EventEmitter{

  bindState(name, self,check = null) {
    const refName = name.replace('.', '_');
    const nameSplit = name.split('.');
    let subName = '';
    let ref = self.state;
    for (let i = 0; i < nameSplit.length - 1; i++) {
      subName = subName + nameSplit[i] + '.';
      ref = ref[nameSplit[i]];
    }
    subName = subName.substr(0, subName.length - 1);
    let value = self.state;
    for (let i = 0; i < nameSplit.length; i++) {
      value = value[nameSplit[i]];
    }
    return {
      ref: refName,
      value: value,
      onBlur:()=>{if(check != null && check != undefined)
        check(self.refs[refName].getValue());},
      onChange: ()=> {
        let obj = self.state[nameSplit[0]];
        ref[nameSplit[nameSplit.length - 1]] = self.refs[refName].getValue();
        self.setState(obj);
        if(check != null && check != undefined)
          check(self.refs[refName].getValue());
      }
    };
  }
}

export default AppDispatcher;
