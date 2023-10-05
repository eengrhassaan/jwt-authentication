// All response messages will be setup here
const respone_messages = {
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

    INTERNAL_SERVER_ERROR: 'Internal Server Error',


    REFRESH_TOKEN_UTILIZED: 'Refresh token already utilized once, please login again'
}

module.exports = {
    respone_messages
}