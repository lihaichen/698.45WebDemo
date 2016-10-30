import React from 'react';
import {  Button } from 'antd';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {TestRedux} from '../../controllers/home/actions';
import "./index.less";

const prefixCls='Home';

 class Home extends React.Component{


    onJumpButtonClick(){
        browserHistory.push('/Page1');
    }

     componentDidMount(){
         this.timer = setInterval(()=>{
             TestRedux();
         },1000);
     }

     componentWillUnmount(){
         if(this.timer)
             clearInterval(this.timer);
         console.log('componentWillUnmount');
     }
    render(){
        return(
            <div className={`${prefixCls}`}>
                <h1 className={`${prefixCls}-head`}>Home</h1>
                <Button type="primary"
                        onClick={this.onJumpButtonClick.bind(this)}
                >跳转</Button>

                <div>
                    <p>redux值：</p>
                    <p>{this.props.showValue}</p>
                </div>

            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        showValue:state.TestRedux.local.value,
    };
}


export default connect(mapStateToProps)(Home);
