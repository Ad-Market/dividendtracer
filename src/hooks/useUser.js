import React from "react";
import axios from "axios";

export const useUser = (account) => {

    const createUser = async() => {
        await axios({
            method: 'post',
            url: 'https://dividendtracer.com:3001/v1/users/createUser',
            data: {
                address: account
            }
        })
        .then(res => {
            console.log('user saved');
        })
        .catch(err => {            
            
        });
    }

    return {
        createUser
    }
}
