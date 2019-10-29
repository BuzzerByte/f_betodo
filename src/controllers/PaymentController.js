import httpClient from './HttpClient';
import axios from 'axios';
import QueryString from 'query-string';
import Alipay from '@0x5e/react-native-alipay';

class PaymentController {
    constructor() {
        this.basePath = 'http://178.128.125.2/api';
    }

    auth = async () => {
        try {
            let infoStr = 'apiname=com.alipay.account.auth&method=alipay.open.auth.sdk.code.get&app_id=xxxx&app_name=mc&biz_type=openservice&pid=xxxx&product_id=APP_FAST_LOGIN&scope=kuaijie&target_id=xxxx&auth_type=AUTHACCOUNT&sign_type=RSA2&sign=xxxx'; // get from server, signed
            let response = await Alipay.authWithInfo(infoStr);
            console.info(response);
            
            let { resultStatus, result, memo } = response;
            let { success, result_code, auth_code, user_id } = QueryString.parse(result);
            
            // TODO: ...
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    
    pay = async() =>{
        // APP支付
        //2088631337189155
        try {
            console.log("call pay api");
            let orderStr = 'app_id=2019092667818985&method=alipay.trade.app.pay&charset=utf-8&timestamp=2014-07-24 03:07:50&version=1.0&notify_url=https%3A%2F%2Fapi.xxx.com%2Fnotify&biz_content=%7B%22subject%22%3A%22%E5%A4%A7%E4%B9%90%E9%80%8F%22%2C%22out_trade_no%22%3A%22xxxx%22%2C%22total_amount%22%3A%229.00%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&sign_type=RSA2&sign=xxxx'; // get from server, signed
            let response = await Alipay.pay(orderStr);
            console.info(response);
            
            let { resultStatus, result, memo } = response;
            let { code, msg, app_id, out_trade_no, trade_no, total_amount, seller_id, charset, timestamp } = JSON.parse(result);
            
            // TODO: ...
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default new PaymentController();