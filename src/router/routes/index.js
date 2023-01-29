import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Transport Permits Identification System'

// ** Default Route
const DefaultRoute = '/login'

// ** Merge Routes
const Routes = [{
        path: '/dashboard',
        component: lazy(() =>
            import ('../../views/Dashboard'))
    },
    {
        path: '/second-page',
        component: lazy(() =>
            import ('../../views/SecondPage'))
    },
    {
        path: '/account-settings',
        component: lazy(() =>
            import ('../../views/account-settings'))
    },
    {
        path: '/sgsoil',
        component: lazy(() =>
            import ('../../views/Sgsoil'))
    },
    {
        path: '/users',
        component: lazy(() =>
            import ('../../views/Users'))
    },
    {
        path: '/vehicle',
        component: lazy(() =>
            import ('../../views/Vehicle'))
    },
    {
        path: '/divsect',
        component: lazy(() =>
            import ('../../views/Divsect'))
    },
    {
        path: '/timwood',
        component: lazy(() =>
            import ('../../views/Timwood'))
    },
    {
        path: '/login',
        component: lazy(() =>
            import ('../../views/Login')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/register',
        component: lazy(() =>
            import ('../../views/Register')),
        layout: 'BlankLayout',
        meta: {
            authRoute: true
        }
    },
    {
        path: '/error',
        component: lazy(() =>
            import ('../../views/Error')),
        layout: 'BlankLayout'
    },
    {
        path: '/forgot-password',
        component: lazy(() =>
            import ('../../views/ForgotPassword')),
        layout: 'BlankLayout'
    },
    {
        path: '/reset-password',
        component: lazy(() =>
            import ('../../views/ResetPassword')),
        layout: 'BlankLayout'
    },
    {
        path: '/two-steps',
        component: lazy(() =>
            import ('../../views/TwoSteps')),
        layout: 'BlankLayout'
    },
    {
        path: '/verify-email',
        component: lazy(() =>
            import ('../../views/VerifyEmail')),
        layout: 'BlankLayout'
    }
]

export { DefaultRoute, TemplateTitle, Routes }