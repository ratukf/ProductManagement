# Product Management Software

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![MaterialUI](https://img.shields.io/badge/Material%20UI-%23FFFFFF?style=for-the-badge&logo=MUI&logoColor=#007FFF)
![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)
![Zustand](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

A responsive product management web app built with React 19 and Material UI. API consumed are [DummyJSON_Auth](https://dummyjson.com/docs/auth) and [DummyJSON_Product](https://dummyjson.com/docs/products) API.

## Features

- **Authentication** — login with JWT, auto token refresh on 401, persisten session via localStorage
- **Dashboard** — stat overview (total, out of stock, low stock, avg rating) and recent products
- **Product list** — search, sort by field, sort order (asc/desc), pagination
- **Product detail** — image gallery, pricing with discount, logistics info, and customer reviews
- **Add / Edit product** — form validation with Formik + Yup
- **Delete product** — confirmation dialog before deletion
- **Responsive** — mobile-friendly layout, table scrolls horizontally on small screens

## Project Structure

```
src/
├── action/          # Call service & store update
│   ├── authAction.js
│   └── productAction.js
├── components/      # Main layout & reusable coomponent
├── hooks/           # useLoginForm, useProductForm, useLogout
├── pages/           # All pages which has its own route
├── services/        # Communicate directly with API
├── store/           # Zustand stores
├── utils/
│   └── api.js       # Axios instance with auth interceptor
├── theme.ts         # Global MUI theme
└── main.jsx         # App entry
```

## Run the project

**Clone and install**

```bash
git clone https://github.com/ratukf/ProductManagement
cd ProductManagement
npm install
```

**Run in development**

```bash
npm run dev
```

**Build for production**

```bash
npm run build
```

## Demo Credentials

```
Username : emilys
Password : emilyspass
```

## License

MIT
