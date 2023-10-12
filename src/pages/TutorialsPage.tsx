import React from "react";
import {MainLayout} from "../layouts/MainLayout";
import {Tutorials} from "../components/Tutorials/Tutorials";



export const TutorialsPage = () => {
    return(
        <MainLayout>
            <>
                <Tutorials/>
            </>
        </MainLayout>
    )
}