var links = {
    general: [
        {
            "url": "/",
            "render": "index",
            "pageName": "AirBnB - Main Page",
            "css": `<link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/resIndex.css">`,
            "script": `<script src="js/MainPage/bookingSearchForm.js"></script>
                    <script src="js/Global/signUpLogInForm.js"></script>
                    <script src="js/client.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>`
        },
        {
            "url": "/searchResult.html",
            "render": "Gen_searchResult",
            "pageName": "Search Result Page",
            "css": `<link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/resIndex.css">
    <link rel="stylesheet" href="/css/searchResult.css">`,
            "script": `<script src="/js/Global/signUpLogInForm.js"></script>
            <script src="js/client.js"></script>`
        },
        {
            "url": "/detailedPlace.html",
            "render": "detailedPlace",
            "pageName": "AirBnB - Main Page",
            "css": `<link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/resIndex.css">
    <link rel="stylesheet" href="/css/searchResult.css">
    <link rel="stylesheet" href="/css/detailedPlace.css">`,
            "script": `
    <script src="/js/DetailedPlacePage/detailedPlace.js"></script>
    <script src="/js/Global/signUpLogInForm.js"></script>
    <script src="js/client.js"></script>
    `
        },
        {
            "url":"",
            "render": "Gen_bookingConfirm",
            "pageName": "Thank You",
            "css": `<link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/resIndex.css">
    <link rel="stylesheet" href="/css/confirmationBooking.css">`
        }
    ],
    admin: [{
            "url": "/add",
            "render": "Admin_addRoom",
            "pageName": "Add new room",
            "css": `<link rel="stylesheet" href="/css/addRoom.css">`
        },
        {
            "url": "/dashboard",
            "render": "Admin_dashboard",
            "pageName": "Admin Dashboard Page",
            "css": `<link rel="stylesheet" href="/css/style.css">
            <link rel="stylesheet" href="/css/resIndex.css">
            <link rel="stylesheet" href="/css/searchResult.css">
            <link rel="stylesheet" href="/css/dashboard.css">`
        },
        {
            "render": "Admin_editRoom",
            "pageName": "Edit room",
            "css": `<link rel="stylesheet" href="/css/addRoom.css">`
        }
    ],
    user:[{
        "url": "/dashboard",
            "render": "User_dashboard",
            "pageName": "User Dashboard Page",
            "css": `<link rel="stylesheet" href="/css/style.css">
            <link rel="stylesheet" href="/css/resIndex.css">
            <link rel="stylesheet" href="/css/searchResult.css">
            <link rel="stylesheet" href="/css/dashboard.css">`
    }]
}
module.exports = links;