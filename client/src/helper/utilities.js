class utilities {

    getToken(){
        return localStorage.getItem("token");
    };





}

export const {
    getToken,
} = new utilities;