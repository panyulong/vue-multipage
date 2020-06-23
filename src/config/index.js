/*
 * dev-开发环境配置 
 * alpha-公司环境配置
 * pro-上线环境配置
 */
const ConfigEnv = {
    title:'pan',
    loginApi:{
        dev:'http://1',
        alpha:'http://2',
        pro:'http://3',
    }
}
const ProxyEnvironment = (variables) =>{
    let config = {};
    let env = process.env.VUE_APP_MODE || process.env.NODE_ENV;
    Object.keys(variables).forEach(k=>{
        if(variables[k] instanceof Object && variables[k].hasOwnProperty(env)){
            config[k] = variables[k][env];
        }else{
            config[k] = variables[k];
        }
    })
    return config
}
let config = ProxyEnvironment(ConfigEnv)
export default config