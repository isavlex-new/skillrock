import { FC, ReactNode } from "react";

type PageStatus = {
    state: boolean;
    component: ReactNode;
}

interface IPageStateProviderProps {
    loading: PageStatus;
    error: PageStatus;
    success: PageStatus;
}

const PageStateProvider : FC<IPageStateProviderProps> = ({loading, error, success}) => {
    return (
        <>
        {
            loading.state ?
            loading.component
            : error.state ?
            error.component
            : success.state && success.component
        }
        </>
    )
}

export default PageStateProvider;