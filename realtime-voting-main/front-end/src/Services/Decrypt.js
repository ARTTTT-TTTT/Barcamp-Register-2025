import crypto from 'crypto-js'
import config from './config'

const Decrypt = (text) => {
    let byte = crypto.AES.decrypt(text , config.key).toString(crypto.enc.Utf8)
    return byte.toString()
}

export default Decrypt