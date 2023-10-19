// All response messages will be setup here
const response_messages = {
    // Book Messages
    BOOK_EXISTED: 'Book already existed',
    TITLE_AND_AUTHOR_REQUIRED: 'Please pass both title and author of Book',
    BOOK_CREATED: 'Book created Successfully;',
    BOOK_NOT_FOUND: 'Book not found',

    // Authentication Messages
    INVALID_TOKEN : 'Invalid Token, please sign-in again or use refresh token call',
    CORRUPTED_TOKEN: 'Courrupted User/Token',
    UNAUTHORIZED: 'Unauthorized',
    
    // Login messages
    INPUT_FIELDS_REQUIRED : 'All inputs are required',
    INVALID_CREDENTIALS: 'Invalid Credentials',
    USER_NOT_FOUND: 'User not found',

    // SignUp messages
    USER_REGISTER_INPUT : 'First Name, Email and Password are required',
    USER_ALREADY_EXISTED: 'User Already Exist. Please Login',
    USER_CREATED: 'User created Successfully',

    // Error Messages
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    TOKEN_UTILIZED: 'Token already utilized once, please login again',
    UNKNOWN_ERROR: 'UNKNOWN SERVER ERROR, Please contact Server Administrator',

    // Token Missing from Cookies or Header
    TOKEN_MISSING: 'Token missing from Authorization header, or cookie, please pass token'
}

const errors_messages = {
    INVALID_CREDS: 'INVALID_CREDENTIALS',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    INPUT_FIELDS_MISSING: 'INPUT_FIELDS_MISSING',
    REFRESH_TOKEN_UTILIZED: 'TOKEN_UTILIZED',
    UNKNOWN_ERROR: 'UNKNOWN_ERROR',
    BOOK_NOT_FOUND: 'BOOK_NOT_FOUND',
    ALREADY_EXISTED: 'ALREADY_EXISTED',
    SET_TOKEN_ERROR: 'SET_TOKEN_ERROR',
    TOKEN_MISSING: 'TOKEN_MISSING'
}

module.exports = {
    response_messages,
    errors_messages    
}