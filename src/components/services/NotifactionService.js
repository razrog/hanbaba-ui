/* eslint-disable */
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class NotificationService {

    static error(error) {
        toast.error( error, {} );
    }

    static success(success) {
        toast.success( success, {} );
    }

    static info(info) {
        toast.info( info, {} );
    }
}
