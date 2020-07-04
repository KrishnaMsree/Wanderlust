let validator = {};

// export function validateEmailId(EmailId) {
validator.validateEmailId = (EmailId) => {
    let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+(.com)$");
    if (pattern.test(EmailId)) {
        return true;
    }
    else{
        return false;
    }
}

validator.validateContactNo = (no) => {
    let pattern = new RegExp("^[6-9][0-9]{9}$");
    if (pattern.test(no)) {
        return true;
    }
    else{
        return false;
    }
}

// export function validatePassword(password) {
validator.validatePassword = (password) => {    
    if (password.length >= 7) {
        return true;
    }
    else{
        return false;
    }
}

module.exports = validator;
