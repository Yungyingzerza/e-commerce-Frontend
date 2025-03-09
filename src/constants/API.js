export const API = {
    "login": `${import.meta.env.VITE_BASE_API}/login`,
    "csrf": `${import.meta.env.VITE_BASE_API}/sanctum/csrf-cookie`,
    "user": `${import.meta.env.VITE_BASE_API}/api/user`,
    "logout": `${import.meta.env.VITE_BASE_API}/logout`,
    "register": `${import.meta.env.VITE_BASE_API}/register`,
    "addresses": `${import.meta.env.VITE_BASE_API}/api/user/addresses`,
    "product": `${import.meta.env.VITE_BASE_API}/api/product`,
    "recent": `${import.meta.env.VITE_BASE_API}/api/product/recent`,
    "category": `${import.meta.env.VITE_BASE_API}/api/product/category`,
    "wishlist": `${import.meta.env.VITE_BASE_API}/api/wishlist`,
    "wishlistByProduct": `${import.meta.env.VITE_BASE_API}/api/wishlist/product`,
}